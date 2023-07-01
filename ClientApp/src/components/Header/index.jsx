import React from "react";

import { useNavigate } from "react-router-dom";

import { Button, Img, Line, Text } from "components";

const Header = (props) => {
  const navigate = useNavigate();

  return (
    <div className={props.className}>
      <div className="absolute flex flex-col h-full inset-y-[0] items-center justify-start left-[0] my-auto w-[96%]">
        <div className="flex md:flex-col flex-row md:gap-5 items-center justify-start w-full">
          <Img
            className="md:flex-1 h-[665px] sm:h-auto object-cover w-[68%] md:w-full"
            src="images/img_header.png"
            alt="pictureOne"
          />
          <Line className="bg-red-500 h-[665px] md:h-px md:w-full w-px" />
          <div className="flex md:flex-1 flex-col items-center justify-start md:ml-[0] ml-[70px] w-[28%] md:w-full">
            <Text
              className="sm:text-[39px] md:text-[45px] text-[53px] text-center text-red-500"
              size="txtMonumentExtendedUltrabold53"
            >
              CUSCAKE
            </Text>
            <Text
              className="italic mt-[38px] text-center text-lg text-red-500 w-full"
              size="txtSFMonoRegularItalic18"
            >
              Hello devotees of sweet taste and warm heart! Come to us, which
              offers the best CUPCAKE cakes and the most unique CUSCAKE cakes,
              so that you can satisfy your passion for creativity and love.
            </Text>
            <Button
              className="bg-orange-50 hover:bg-indigo-900 border border-indigo-900 hover:border-teal-100 border-solid cursor-pointer font-sfmono leading-[normal] min-w-[193px] mt-[60px] py-3.5 rounded-[5px] text-center text-indigo-900 hover:text-orange-50 text-lg"
              onClick={() => navigate("/cuscake")}
            >
              CUSCAKE now!
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

Header.defaultProps = {};

export default Header;
