import React from "react";

import { useNavigate } from "react-router-dom";

import { Button, Img, Input, Line, Text } from "components";
import Footer from "components/Footer";

const SignIn = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="bg-orange-50 flex flex-col font-monumentextended items-center justify-start mx-auto w-full">
        <div className="md:h-[1729px] sm:h-[665px] h-[785px] md:px-5 relative w-full">
          <div className="absolute bottom-[0] flex flex-col inset-x-[0] items-center justify-start mx-auto w-[99%]">
            <div className="flex md:flex-col flex-row gap-[19px] items-center justify-between w-full">
              <div className="flex md:flex-1 md:flex-col flex-row md:gap-5 items-center justify-evenly w-[66%] md:w-full">
                <Img
                  className="h-[665px] sm:h-auto object-cover w-full"
                  src="images/img_picture1.png"
                  alt="pictureOne"
                />
                <Line className="bg-red-500 h-[665px] md:h-px md:w-full w-px" />
              </div>
              <div className="flex md:flex-1 flex-col items-center justify-start w-[34%] md:w-full">
                <div className="flex flex-col md:gap-10 gap-[60px] items-center justify-start w-full">
                  <div className="flex flex-col items-center justify-start">
                    <Text
                      className="sm:text-[27px] md:text-[29px] text-[31px] text-center text-red-500"
                      size="txtMonumentExtendedRegular31"
                    >
                      SIGN IN
                    </Text>
                  </div>
                  <div className="flex flex-col font-sfmono items-center justify-start w-full">
                    <Input
                      name="group39694"
                      placeholder="email"
                      className="italic leading-[normal] p-0 placeholder:text-red-500_87 sm:px-5 text-left text-lg text-red-500_87 w-full"
                      wrapClassName="bg-orange-50 border border-red-500 border-solid pb-[15px] pl-[21px] pr-[35px] pt-3 rounded-[5px] w-full"
                      type="email"
                    ></Input>
                    <Input
                      name="group39702"
                      placeholder="password"
                      className="italic leading-[normal] p-0 placeholder:text-red-500_87 sm:pr-5 text-left text-lg text-red-500_87 w-full"
                      wrapClassName="bg-orange-50 border border-red-500 border-solid mt-5 pl-5 pr-[35px] py-[13px] rounded-[5px] w-full"
                      type="password"
                    ></Input>
                    <Button className="bg-orange-50 border border-indigo-900 border-solid cursor-pointer leading-[normal] min-w-[193px] mt-5 py-3.5 rounded-[5px] text-center text-indigo-900 text-lg">
                      sign in
                    </Button>
                    <div className="flex flex-row items-center justify-center mt-[39px] w-[54%] md:w-full">
                      <Text
                        className="text-center text-red-500 text-sm"
                        size="txtSFMonoRegular14"
                      >
                        Don’t have an account?{" "}
                      </Text>
                      <a className="ml-[5px] text-center text-red-500 text-sm underline">
                        <Text
                          className="common-pointer"
                          size="txtSFMonoRegular14"
                          onClick={() => navigate("/signup")}
                        >
                          SIGN UP
                        </Text>
                      </a>
                    </div>
                    <a
                      href="javascript:"
                      className="mt-[19px] text-center text-red-500 text-sm"
                    >
                      <Text size="txtSFMonoRegular14">Reset Password</Text>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="absolute flex flex-col inset-x-[0] items-center justify-start mx-auto top-[0] w-full">
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
          <Button className="absolute bg-orange-50 border-2 border-red-500 border-solid bottom-[14%] flex h-[51px] items-center justify-center p-2 right-[1%] rounded-[18px] w-[51px]">
            <Img src="images/img_vector.svg" alt="vector" />
          </Button>
        </div>
        <Footer className="bg-orange-50 flex font-sfmono items-center justify-center mt-[3px] md:px-5 w-full" />
      </div>
    </>
  );
};

export default SignIn;
