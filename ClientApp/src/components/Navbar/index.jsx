import React, { useState, useEffect, useRef } from "react";

import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import { UserAuth } from "apis/auth/AuthContext";

import { Link } from "react-router-dom";
import { Button, Img, Line } from "components";

const Navbar = (props) => {
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [userIcon, setUserIcon] = useState("images/img_user.svg");
  const [cartIcon, setCartIcon] = useState("images/img_cart.svg");

  const dropdownRef = useRef();

  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const { logout } = UserAuth();

  useEffect(() => {
    var user = localStorage.getItem("user");

    if (user) {
      setUserLoggedIn(true);
    }
  }, []);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

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
  };

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
            <>
              <div className="relative" ref={dropdownRef}>
                <Img
                  id="user"
                  className="ml-5 md:ml-[0] ml-[1101px] rounded-full cursor-pointer"
                  src={userIcon}
                  alt="user"
                  onClick={toggleDropdown}
                  onMouseEnter={handleUserIconEnter}
                  onMouseLeave={handleUserIconLeave}
                />

                {isOpen && (
                  <div
                    id="dropdown"
                    className="absolute right-0 z-10 bg-orange-50 font-monumentextended items-center justify-start w-auto"
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
                  className="h-[35px] ml-0 md:ml-[0] w-[35px] rounded-full cursor-pointer"
                  src={cartIcon}
                  alt="cart"
                  onMouseEnter={handleCartIconEnter}
                  onMouseLeave={handleCartIconLeave}
                />
              </div>
            </>
          )}
        </div>
      </div>
      <Line className="absolute bg-red-500 h-px inset-x-[0] mx-auto bottom-[0] w-full" />
    </div>
  );
};

Navbar.defaultProps = {};

export default Navbar;
