import React from "react";

import { Img } from "../../components";

const UserNavbar = (props) => {
  return (
    <>
      <div className={props.className}>
        <Img
          className="h-[62px] sm:h-auto object-cover w-[6%] md:w-full"
          src="images/img_logosmall.png"
          alt="logosmall"
        />
        <Img className="h-[51px] md:ml-[0] ml-[1101px] w-[51px]" src="images/img_user.svg" alt="user" />
        <Img className="h-[51px] ml-5 md:ml-[0] w-[51px]" src="images/img_cart.svg" alt="cart" />
      </div>
    </>
  );
};

UserNavbar.defaultProps = {};

export default UserHeader;
