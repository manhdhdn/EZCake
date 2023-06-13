import React from "react";

import { Line } from "components";
import SignHeader from "components/SignHeader";
import Animation from "components/Animation";
import SignInForm from "components/SignInForm";
import Chat from "components/Chat";
import Footer from "components/Footer";

const SignIn = () => {
  return (
    <>
      <div className="bg-orange-50 flex flex-col font-monumentextended items-center justify-start mx-auto w-full">
        <div className="md:h-[1729px] sm:h-[665px] h-[785px] md:px-5 relative w-full">
          <div className="absolute bottom-[0] flex flex-col inset-x-[0] items-center justify-start mx-auto w-full">
            <div className="flex md:flex-col flex-row gap-[19px] items-center justify-between w-full">
              <Animation className="flex md:flex-1 md:flex-col flex-row md:gap-5 items-center justify-evenly w-[66%] md:w-full" />
              <SignInForm className="flex md:flex-1 flex-col items-center justify-start mr-3 w-[34%] md:w-full" />
            </div>
          </div>
          <div className="absolute flex flex-col inset-x-[0] items-center justify-start mx-auto top-[0] w-full">
            <div className="bg-orange-50 flex flex-col items-center justify-start p-[27px] sm:px-5 shadow-bs w-full">
              <SignHeader className="flex flex-col items-center justify-start mb-0.5 w-[6%] md:w-full" />
            </div>
            <Line className="bg-red-500 h-px w-full" />
          </div>
          <Chat />
        </div>
        <Footer className="bg-orange-50 flex font-sfmono items-center justify-center mt-[3px] md:px-5 w-full" />
      </div>
    </>
  );
};

export default SignIn;
