import React, { useState, useEffect, useRef } from "react";

import { Link, useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import { UserAuth } from "apis/auth/AuthContext";
import { v4 } from "uuid";
import moment from "moment";
import OrderApi from "apis/services/Order";
import OrderDetailApi from "apis/services/OrderDetail";

import { DeleteForever } from "@mui/icons-material";
import { Button, Img, Line, Text } from "components";

const Navbar = (props) => {
  const [userLoggedIn, setUserLoggedIn] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenCart, setIsOpenCart] = useState(false);
  const [cart, setCart] = useState(null);
  const [userIcon, setUserIcon] = useState("images/img_user.svg");
  const [cartIcon, setCartIcon] = useState("images/img_cart.svg");
  const [hoverEdit, setHoverEdit] = useState(-1);

  const dropdownRef = useRef();

  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const { logout } = UserAuth();

  useEffect(() => {
    var user = localStorage.getItem("token");

    if (!user) {
      setUserLoggedIn(false);
    }
  }, []);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
        setIsOpenCart(false);
      }
    };

    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  useEffect(() => {
    const loadCart = async () => {
      try {
        setCart(JSON.parse(localStorage.getItem("cart")));
      } catch (error) {
        enqueueSnackbar("Load cart failed", { variant: "error" });
      }
    }

    if (isOpenCart) {
      loadCart();
    }

    // eslint-disable-next-line
  }, [isOpenCart])

  const handleUserIconEnter = () => {
    setUserIcon("images/img_user_hover.svg");
  };

  const handleUserIconLeave = () => {
    setUserIcon("images/img_user.svg");
  };

  const handleCartIconEnter = () => {
    setCartIcon("images/img_cart_hover.svg");
  };

  const handleCartIconLeave = () => {
    setCartIcon("images/img_cart.svg");
  }

  const handleSignInBtxClick = () => {
    navigate("/signin");
  };

  const handleSignUpBtxClick = () => {
    navigate("/signup");
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
    setIsOpenCart(false);
  };

  const toggleDropdownCart = () => {
    setIsOpen(false);
    setIsOpenCart(!isOpenCart);
  }

  const handleIconEditEnter = (id) => {
    setHoverEdit(id);
  }

  const handleIconEditLeave = () => {
    setHoverEdit(-1);
  }

  const handleDelete = async (id) => {
    try {
      let status = await OrderDetailApi.deleteOrderDetail(id);

      if (status === 204) {
        let removedItemCart = { ...cart, orderDetails: cart.orderDetails.filter((order) => order.id !== id) };

        setCart(removedItemCart);
        localStorage.setItem("cart", JSON.stringify(removedItemCart));
      }
    } catch (error) {
      enqueueSnackbar("Delete failed", { variant: "error" });
    }
  }

  const handlePayNowClick = async () => {
    let orderId = v4();

    try {
      let status = await OrderApi.createOrder({
        id: orderId,
        orderDate: moment().format("YYYY-MM-DDTHH:mm:ss"),
        shippingInformationId: JSON.parse(localStorage.getItem("userInfo")).shippingInformations[0].id,
        status: "Cart"
      })

      if (status === 201) {
        const cart = await OrderApi.getOrder(orderId);

        localStorage.setItem("cart", JSON.stringify(cart));
      }
    } catch (error) {
      enqueueSnackbar("Cart could not be created", { variant: "error" });
    }

    navigate(`/payment/${cart.id}`);
  }

  const cakes = () => {
    const element = [];

    if (cart.orderDetails.length === 0) {
      element.push(
        <Text key="cart" className="font-sfmono text-center text-lg text-red-500 w-full">• Nothing in cart yet •</Text>
      );
    } else {
      cart.orderDetails.forEach((orderDetail, index) => {
        element.push(
          <div key={orderDetail.id} className="h-[125px] flex flex-row gap-5 items-start justify-start w-full">
            <Img className="h-[125px] border border-1 border-red-500 px-1 py-3 w-[122px]" style={{ objectFit: 'cover', width: '80%', height: '100%' }} src={orderDetail.cake.image} alt="cake" />
            <div className="flex flex-col gap-max-5 items-start justify-between w-full h-full">
              <div className="flex flex-col items-start">
                <Text className="font-bold text-deep_orange-500 text-lg">{orderDetail.cake.name}</Text>
                <Text className="font-bold text-deep_orange-500 text-lg">Cupcake</Text>
                <Text className="text-deep_orange-500 text-sm">{orderDetail.price.toLocaleString("vi-VN")} VNĐ</Text>
              </div>
              <div className="flex flex-row gap-3 items-end">
                <div className="flex items-center bg-orange-50 border border-red-500 border-solid h-[30px] rounded-[3px] w-12">
                  <Text className="text-deep_orange-500 text-center text-lg w-full">{orderDetail.quantity}</Text>
                </div>
                <Img
                  className="cursor-pointer"
                  src={hoverEdit === index ? "images/icon_edit_hover.svg" : "images/icon_edit.svg"}
                  alt="edit"
                  onMouseEnter={() => handleIconEditEnter(index)}
                  onMouseLeave={() => handleIconEditLeave()}
                />
                <DeleteForever
                  className="cursor-pointer"
                  sx={{ color: "#ee4e34" }}
                  onClick={() => handleDelete(orderDetail.id)}
                />
              </div>
            </div>
          </div>
        );
      })
    }

    return element;
  }

  const editCake = () => {
      
  }

  const handleLogout = async () => {
    try {
      await logout();
      setUserLoggedIn(false);

      navigate("/");
    } catch (error) {
      enqueueSnackbar("Logout failed", { variant: "error" });
    }
  };

  return (
    <div style={{ position: "fixed", zIndex: 100 }} className={props.className}>
      <div className="flex sm:flex-col flex-row md:gap-10 items-center justify-between mb-0.5 ml-[43px] w-[94%]">
        <Link to="/">
          <Img
            className="h-[62px]"
            src="images/img_logosmall.png"
            alt="logosmall"
          />
        </Link>
        <div className="flex sm:flex-col flex-row gap-5 items-center justify-between">
          {!userLoggedIn ? (
            <>
              <Button
                className="common-pointer bg-orange-50 hover:bg-red-500 border border-red-500 hover:border-teal-100 border-solid cursor-pointer font-sfmono leading-[normal] min-w-[193px] py-3.5 rounded-[5px] text-center text-lg text-red-500 hover:text-orange-50"
                id="block3"
                onClick={handleSignInBtxClick}
              >
                sign in
              </Button>
              <Button
                className="common-pointer bg-orange-50 hover:bg-indigo-900 border border-indigo-900 hover:border-teal-100 border-solid cursor-pointer font-sfmono leading-[normal] min-w-[193px] py-3.5 rounded-[5px] text-center text-indigo-900 text-lg hover:text-orange-50"
                id="block2"
                onClick={handleSignUpBtxClick}
              >
                sign up
              </Button>
            </>
          ) : (
            <div className="flex flex-row items-center justify-center gap-10" ref={dropdownRef}>
              <div className="relative">
                <Img
                  id="user"
                  className="ml-5 md:ml-[0] rounded-full cursor-pointer"
                  src={userIcon}
                  alt="user"
                  onClick={toggleDropdown}
                  onMouseEnter={handleUserIconEnter}
                  onMouseLeave={handleUserIconLeave}
                />

                {isOpen && (
                  <div
                    id="user"
                    className="absolute right-0 z-10 bg-orange-50 font-monumentextended items-center justify-start w-[180px]"
                  >
                    <ul>
                      <Button
                        className="bg-red-500 hover:bg-orange-50 border border-orange-50 hover:border-teal-100 border-solid font-extrabold text-[12px] sm:text-sm md:text-sm text-center text-orange-50 hover:text-red-500 flex flex-col items-center justify-start p-4 px-8 md:px-4 sm:px-2 w-full"
                        onClick={() => navigate("/profile")}
                      >
                        YOUR PROFILE
                      </Button>
                      <Button
                        className="bg-red-500 hover:bg-orange-50 border border-orange-50 hover:border-teal-100 border-solid font-extrabold text-[12px] sm:text-sm md:text-sm text-center text-orange-50 hover:text-red-500 flex flex-col items-center justify-start p-4 px-8 md:px-4 sm:px-2 w-full"
                        onClick={() => navigate("/order")}
                      >
                        YOUR ORDER
                      </Button>
                      <Button
                        className="bg-red-500 hover:bg-orange-50 border border-orange-50 hover:border-teal-100 border-solid font-extrabold text-[12px] sm:text-sm md:text-sm text-center text-orange-50 hover:text-red-500 flex flex-col items-center justify-start p-4 px-8 md:px-4 sm:px-2 w-full"
                        onClick={handleLogout}
                      >
                        SIGNOUT
                      </Button>
                      <Button
                        className="bg-red-500 hover:bg-orange-50 border border-orange-50 hover:border-teal-100 border-solid font-extrabold text-[12px] sm:text-sm md:text-sm text-center text-orange-50 hover:text-red-500 flex flex-col items-center justify-start p-4 px-8 md:px-4 sm:px-2 w-full"
                        onClick={toggleDropdown}
                      >
                        x CANCEL x
                      </Button>
                    </ul>
                  </div>
                )}
              </div>
              <div className="relative">
                <Img
                  className="h-[36px] ml-0 md:ml-[0] w-[38px] cursor-pointer"
                  src={cartIcon}
                  alt="cart"
                  onClick={toggleDropdownCart}
                  onMouseEnter={handleCartIconEnter}
                  onMouseLeave={handleCartIconLeave}
                />

                {isOpenCart && (
                  <div
                    id="cart"
                    className="absolute right-0 z-10 bg-orange-50 max-h-[700px] h-auto font-monumentextended border border-red-500 flex flex-col items-center justify-center px-5 py-10 w-[422px]"
                  >
                    <div className="flex flex-col gap-10 items-start justify-start overflow-y-scroll w-[320px]">
                      <Text className="font-extrabold sm:text-[35px] md:text-[37px] text-[39px] text-left text-deep_orange-500 w-full">Your Cart</Text>
                      <div className="font-sfmono flex flex-col gap-5 items-start justify-start w-full">
                        {/* Place cakes here */}
                        {cart && cakes()}
                        <Line className="h-[3px] w-full bg-deep_orange-500" />
                        <div className="flex flex-row items-start justify-between w-full">
                          <Text className="font-bold text-left text-deep_orange-500 text-[20px]">Total:</Text>
                          <Text className="text-right text-deep_orange-500 text-[20px]">{cart && cart.orderDetails.reduce((total, order) => total + order.price * order.quantity, 0).toLocaleString("vi-VN")} VNĐ</Text>
                        </div>
                        <div className="flex flex-row items-center justify-center w-full">
                          <Button
                            className="bg-orange-50 hover:bg-indigo-900 border border-indigo-900 hover:border-teal-100 border-solid cursor-pointer leading-[normal] min-w-[193px] py-3.5 rounded-[5px] text-center text-indigo-900 hover:text-orange-50 text-lg"
                            hidden={cart && cart.orderDetails.length === 0}
                            onClick={() => handlePayNowClick()}
                          >
                            pay now
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
      <Line className="absolute bg-red-500 h-px inset-x-[0] mx-auto bottom-[0] w-full" />
    </div>
  );
};

Navbar.defaultProps = {};

export default Navbar;
