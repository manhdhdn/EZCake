import React from "react";

import { Button, Img } from "components";

import { handleSectionNavigation } from "utils";

const Navbar = (props) => {
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
            <Button
              className="common-pointer bg-orange-50 border border-red-500 border-solid cursor-pointer font-sfmono leading-[normal] min-w-[193px] py-3.5 rounded-[5px] text-center text-lg text-red-500"
              id="block3"
              onClick={() => {
                handleSectionNavigation("block3");
              }}
            >
              sign in
            </Button>
            <Button
              className="common-pointer bg-orange-50 border border-indigo-900 border-solid cursor-pointer font-sfmono leading-[normal] min-w-[193px] py-3.5 rounded-[5px] text-center text-indigo-900 text-lg"
              id="block2"
              onClick={() => {
                handleSectionNavigation("block2");
              }}
            >
              sign up
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

Navbar.defaultProps = {};

export default Navbar;
