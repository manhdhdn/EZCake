import React, { useState, useEffect, useRef } from "react";

import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import { UserAuth } from "apis/auth/AuthContext";

import { Link } from "react-router-dom";
import { Button, Img, Input, Line, Text } from "components";

const Navbar = (props) => {
  const [userLoggedIn, setUserLoggedIn] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenCart, setIsOpenCart] = useState(false);
  const [cart, setCart] = useState(null);
  const [price, setPrice] = useState(0);
  const [userIcon, setUserIcon] = useState("images/img_user.svg");
  const [cartIcon, setCartIcon] = useState("images/img_cart.svg");

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

  const handleLogout = async () => {
    try {
      await logout();
      setUserLoggedIn(false);

      navigate("/");
    } catch (error) {
      enqueueSnackbar("Logout failed", { variant: "error" });
    }
  };

  const cakes = () => {
    let element = [];

    cart.orderDetails.forEach((orderDetail) => {
      element.push(
        <div key={orderDetail.id} className="h-[125px] flex flex-row gap-5 items-start justify-start w-full">
          <Img className="h-[125px] border border-1 border-red-500 px-1 py-3 w-[125px]" src={orderDetail.cake.image} alt="cake" />
          <div className="flex flex-col gap-4 items-start justify-between w-full">
            <div className="flex flex-col items-start h-full w-full">
              <Text className="font-bold text-deep_orange-500 text-lg">{orderDetail.cake.name} Cupcake</Text>
              <Text className="text-deep_orange-500 text-sm">{orderDetail.price.toLocaleString("vi-VN")} VNĐ</Text>
            </div>
            <Input
              className="leading-[normal] text-center text-lg text-red-500 h-full w-full"
              wrapClassName="bg-orange-50 border border-red-500 border-solid h-[30px] rounded-[3px] pl-[10px] w-[76px]"
              value={orderDetail.quantity}
              type="number"
              onChange={(value) => { }}
            />
          </div>
        </div>
      );
    });

    return element;
  }

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
                    className="absolute right-0 z-10 bg-orange-50 max-h-[710px] h-auto font-monumentextended border border-red-500 flex flex-col items-center justify-center w-[422px]"
                  >
                    <div className="flex flex-col gap-10 items-start justify-start overflow-y-scroll mx-5 my-10 w-[320px]">
                      <Text className="font-extrabold sm:text-[35px] md:text-[37px] text-[39px] text-left text-deep_orange-500 w-full">Your Cart</Text>
                      <div className="font-sfmono flex flex-col gap-5 items-start justify-start w-full">
                        {/* Place cakes here */}
                        {cart && cakes()}
                        <Line className="h-[3px] w-full bg-deep_orange-500" />
                        <div className="flex flex-row items-start justify-between w-full">
                          <Text className="font-bold text-left text-deep_orange-500 text-[20px]">Total:</Text>
                          {/* <Text className="text-right text-deep_orange-500 text-[20px]">{cart && price.toLocaleString("vi-VN")} VNĐ</Text> */}
                        </div>
                        <div className="flex flex-row items-center justify-center w-full">
                          <Button
                            className="bg-orange-50 hover:bg-indigo-900 border border-indigo-900 hover:border-teal-100 border-solid cursor-pointer leading-[normal] min-w-[193px] py-3.5 rounded-[5px] text-center text-indigo-900 hover:text-orange-50 text-lg"
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
