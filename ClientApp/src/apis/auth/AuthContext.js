import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onIdTokenChanged,
  signOut,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { createContext, useContext, useEffect } from "react";
import { auth } from "./firebase";

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

  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const loginWithGoogle = () => {
    googleProvider.addScope("email");
    return signInWithPopup(auth, googleProvider);
  };

  const logout = () => {
    return signOut(auth);
  };

  useEffect(() => {
    onIdTokenChanged(auth, (currentUser) => {
      if (!currentUser) {
        localStorage.removeItem("user");
        localStorage.removeItem("userInfo");
      } else {
        localStorage.setItem("user", JSON.stringify(currentUser));
      }
    });
  }, []);

  return (
    <UserContext.Provider
      value={{
        createUser,
        sendEmail,
        login,
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
