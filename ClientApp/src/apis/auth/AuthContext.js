import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onIdTokenChanged,
  signOut,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signInWithCustomToken,
} from "firebase/auth";
import { createContext, useContext, useEffect } from "react";
import { auth } from "./firebase";

import moment from "moment";
import { v4 } from "uuid";

import AccountApi from "apis/services/Account";
import OrderApi from "apis/services/Order";

const UserContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const googleProvider = new GoogleAuthProvider();

  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const sendEmail = () => {
    return sendEmailVerification(auth.currentUser);
  };

  const resetPassword = (email) => {
    return sendPasswordResetEmail(auth, email);
  };

  const login = async (email, password) => {
    return await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        return userCredential.user.uid;
      });
  };

  const loginWithCustomToken = (token) => {
    return signInWithCustomToken(auth, token);
  }

  const loginWithGoogle = () => {
    googleProvider.addScope("email");

    return signInWithPopup(auth, googleProvider);
  };

  const logout = () => {
    return signOut(auth);
  };

  useEffect(() => {
    onIdTokenChanged(auth, async (currentUser) => {
      if (!currentUser) {
        localStorage.removeItem("token");
        localStorage.removeItem("userInfo");
        localStorage.removeItem("cart");
      } else {
        localStorage.setItem("token", await currentUser.getIdToken());

        let account = await AccountApi.getAccount({ email: currentUser.email });
        localStorage.setItem('userInfo', JSON.stringify(account));

        const orders = await OrderApi.getOrders({
          accountId: account.id,
          status: "Cart",
        });

        if (orders.data.length > 0) {
          const cart = await OrderApi.getOrder(orders.data[0].id);

          localStorage.setItem("cart", JSON.stringify(cart));
        } else {
          let orderId = v4();

          try {
            let status = await OrderApi.createOrder({
              id: orderId,
              orderDate: moment().format("YYYY-MM-DDTHH:mm:ss"),
              shippingInformationId: account.shippingInformations[0].id,
              status: "Cart"
            })

            if (status === 201) {
              const cart = await OrderApi.getOrder(orderId);

              localStorage.setItem("cart", JSON.stringify(cart));
            }
          } catch (error) {
            console.log(error);
          }
        }
      }
    });
  }, []);

  return (
    <UserContext.Provider
      value={{
        createUser,
        sendEmail,
        login,
        loginWithCustomToken,
        loginWithGoogle,
        resetPassword,
        logout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(UserContext);
};
