import React, { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";

import { Button, Img } from "components";

const Navbar = (props) => {
  const [userLoggedIn, setUserLoggedIn] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    var user = localStorage.getItem("user");

    if (user) {
      setUserLoggedIn(true);
    }
  }, []);

  const handleSignInBtxClick = () => {
    navigate("/signin");
  }

  const handleSignUpBtxClick = () => {
    navigate("/signup");
  }

  return (
    <>
      <div className={props.className}>
        <div className="flex sm:flex-col flex-row md:gap-10 items-center justify-between mb-0.5 ml-[43px] w-[94%]">
          <Img
            className="h-[62px] md:h-auto object-cover"
            src="images/img_logosmall.png"
            alt="logosmall"
          />
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
                <Img className="h-[51px] md:ml-[0] ml-[1101px] w-[51px]" src="images/img_user.svg" alt="user" />
                <Img className="h-[51px] ml-5 md:ml-[0] w-[51px]" src="images/img_cart.svg" alt="cart" />
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

Navbar.defaultProps = {};

export default Navbar;
