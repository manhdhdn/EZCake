import React from "react";

import { useNavigate } from "react-router-dom";

import { Button, Img, Input, Line, Text } from "components";
import Footer from "components/Footer";

const SignUp = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="bg-orange-50 flex flex-col font-monumentextended items-center justify-start mx-auto w-full">
        <div className="flex md:h-[1349px] sm:h-[664px] h-[785px] justify-end md:px-5 relative w-full">
          <div className="flex flex-col md:gap-10 gap-[60px] h-full items-center justify-start mb-[89px] ml-auto mr-5 mt-auto w-[34%]">
            <Text
              className="sm:text-[27px] md:text-[29px] text-[31px] text-center text-red-500"
              size="txtMonumentExtendedRegular31"
            >
              CREATE ACCOUNT
            </Text>
            <div className="flex flex-col font-sfmono gap-5 items-center justify-start w-full">
              <Input
                name="group39695"
                placeholder="full name"
                className="italic leading-[normal] p-0 placeholder:text-red-500_87 sm:px-5 text-left text-lg text-red-500_87 w-full"
                wrapClassName="bg-orange-50 border border-red-500 border-solid pl-[21px] pr-[35px] py-[13px] rounded-[5px] w-full"
                type="text"
              ></Input>
              <Input
                name="group39696"
                placeholder="email"
                className="italic leading-[normal] p-0 placeholder:text-red-500_87 sm:px-5 text-left text-lg text-red-500_87 w-full"
                wrapClassName="bg-orange-50 border border-red-500 border-solid pb-[15px] pl-[21px] pr-[35px] pt-3 rounded-[5px] w-full"
                type="email"
              ></Input>
              <Input
                name="group39697"
                placeholder="password"
                className="italic leading-[normal] p-0 placeholder:text-red-500_87 sm:pr-5 text-left text-lg text-red-500_87 w-full"
                wrapClassName="bg-orange-50 border border-red-500 border-solid pl-5 pr-[35px] py-[13px] rounded-[5px] w-full"
                type="password"
              ></Input>
              <Input
                name="group39699"
                placeholder="enter the password"
                className="italic leading-[normal] p-0 placeholder:text-red-500_87 sm:pl-5 text-left text-lg text-red-500_87 w-full"
                wrapClassName="bg-orange-50 border border-red-500 border-solid pl-[21px] pr-3 py-[13px] rounded-[5px] w-full"
                type="password"
              ></Input>
              <div className="flex flex-col items-center justify-start w-[58%] md:w-full">
                <div className="flex flex-col gap-[39px] items-center justify-start w-full">
                  <Button className="bg-orange-50 border border-indigo-900 border-solid cursor-pointer leading-[normal] min-w-[193px] py-3.5 rounded-[5px] text-center text-indigo-900 text-lg">
                    create account
                  </Button>
                  <div className="flex flex-row items-start justify-evenly w-full">
                    <Text
                      className="text-center text-red-500 text-sm"
                      size="txtSFMonoRegular14"
                    >
                      Already have an account?{" "}
                    </Text>
                    <a className="text-center text-red-500 text-sm underline">
                      <Text
                        className="common-pointer"
                        size="txtSFMonoRegular14"
                        onClick={() => navigate("/signin")}
                      >
                        SIGN IN
                      </Text>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="absolute flex flex-col inset-[0] justify-center m-auto w-full">
            <div className="flex flex-col items-center justify-start mx-auto w-full">
              <div className="bg-orange-50 flex flex-col items-center justify-start p-[27px] sm:px-5 shadow-bs w-full">
                <div className="flex flex-col items-center justify-start mb-0.5 w-[6%] md:w-full">
                  <Img
                    className="h-[62px] md:h-auto object-cover w-full"
                    src="images/img_logosmall.png"
                    alt="logosmall"
                  />
                </div>
              </div>
              <Line className="bg-red-500 h-px w-full" />
            </div>
            <div className="flex md:flex-col flex-row md:gap-5 items-center justify-evenly mt-[-1px] w-[65%] z-[1]">
              <Img
                className="h-[665px] sm:h-auto object-cover w-full"
                src="images/img_picture1.png"
                alt="pictureOne"
              />
              <Line className="bg-red-500 h-[665px] md:h-px md:w-full w-px" />
            </div>
          </div>
        </div>
        <Footer className="bg-orange-50 flex font-sfmono items-center justify-center md:px-5 w-full" />
      </div>
    </>
  );
};

export default SignUp;
