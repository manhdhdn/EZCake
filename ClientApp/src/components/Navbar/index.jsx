import React, { useState, useEffect, useRef } from "react";

import { useNavigate } from "react-router-dom";
import { UserAuth } from "apis/auth/AuthContext";

import { Link } from "react-router-dom";
import { Button, Img, Line, Text } from "components";

const Navbar = (props) => {
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef();

  const navigate = useNavigate();
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
                className="common-pointer bg-orange-50 border border-red-500 border-solid cursor-pointer font-sfmono leading-[normal] min-w-[193px] py-3.5 rounded-[5px] text-center text-lg text-red-500"
                id="block3"
                onClick={handleSignUpBtxClick}
              >
                sign up
              </Button>
              <Button
                className="common-pointer bg-orange-50 border border-indigo-900 border-solid cursor-pointer font-sfmono leading-[normal] min-w-[193px] py-3.5 rounded-[5px] text-center text-indigo-900 text-lg"
                id="block2"
                onClick={handleSignInBtxClick}
              >
                sign in
              </Button>
            </>
          ) : (
            <>
              <div className="relative" ref={dropdownRef}>
                <Img
                  id="user"
                  className="h-[51px] ml-5 md:ml-[0] ml-[1101px] w-[51px]"
                  src="images/img_user.svg"
                  alt="user"
                  onClick={toggleDropdown}
                />

                {isOpen && (
                  <div
                    id="dropdown"
                    className="absolute right-0 z-10 bg-orange-50 font-monumentextended items-center justify-start w-auto"
                  >
                    <ul>
                      <li
                        className="bg-red-500 border border-orange-50 border-solid flex flex-col items-center justify-start p-4 px-8 md:px-4 sm:px-2 w-full"
                        onClick={() => navigate("/profile")}
                      >
                        <div className="flex flex-col items-center justify-start">
                          <Text className="font-extrabold text-[12px] sm:text-sm md:text-sm text-center text-orange-50">
                            YOUR PROFILE
                          </Text>
                        </div>
                      </li>
                      <li
                        className="bg-red-500 border border-orange-50 border-solid flex flex-col items-center justify-start p-4 px-8 md:px-8 sm:px-4 w-full"
                      >
                        <div className="flex flex-col items-center justify-start">
                          <Text className="font-extrabold text-[12px] sm:text-sm md:text-sm text-center text-orange-50">
                            YOUR ORDER
                          </Text>
                        </div>
                      </li>
                      <li
                        className="bg-red-500 border border-orange-50 border-solid flex flex-col items-center justify-start p-4 px-8 md:px-8 sm:px-4 w-full"
                        onClick={handleLogout}
                      >
                        <div className="flex flex-col items-center justify-start">
                          <Text className="font-extrabold text-[12px] sm:text-sm md:text-sm text-center text-orange-50">
                            SIGNOUT
                          </Text>
                        </div>
                      </li>
                      <li
                        className="bg-red-500 border border-orange-50 border-solid flex flex-col items-center justify-start p-4 px-8 md:px-8 sm:px-4 w-full"
                        onClick={toggleDropdown}
                      >
                        <div className="flex flex-col items-center justify-start">
                          <Text className="font-extrabold text-[12px] sm:text-sm md:text-sm text-center text-orange-50">
                            x CANCEL x
                          </Text>
                        </div>
                      </li>
                    </ul>
                  </div>
                )}
              </div>

              <div className="relative">
                <Img
                  className="h-[51px] ml-0 md:ml-[0] w-[51px]"
                  src="images/img_cart.svg"
                  alt="cart"
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
