import React from "react";

import { Line } from "components";
import BestSeller from "components/BestSeller";
import Cakes from "components/Cakes";
import Footer from "components/Footer";
import UserNavbar from "components/Navbar";
import Slo from "components/Slo";
import HomeComment from "components/HomeComment";

const Home = () => {
  return (
    <>
      <div className="bg-orange-50 flex flex-col items-center justify-start mx-auto w-full">
        <div className="flex flex-col items-start justify-start w-full">
          <UserNavbar className="bg-orange-50 flex flex-row font-sfmono items-center justify-start p-[27px] sm:px-5 shadow-bs w-full" />
          <Header className="md:h-[1708px] h-[665px] md:px-5 relative w-full" />
          <Line className="bg-red-500 h-px w-full" />
          <BestSeller className="flex md:flex-col flex-row font-monumentextended md:gap-10 items-center justify-between max-w-[1244px] mt-[123px] mx-auto md:px-5 w-full" />
          <Line className="bg-red-500 h-px mt-[123px] w-full" />
          <HomeComment />
          <Slo className="bg-red-500 flex flex-col items-center justify-start mt-[204px] p-[111px] md:px-10 sm:px-5 w-full" />
          <Cakes className="gap-5 grid sm:grid-cols-1 md:grid-cols-2 grid-cols-4 items-center justify-between max-w-[1400px] mt-5 mx-auto md:px-5 w-full" />
          <Footer className="bg-orange-50 flex font-sfmono items-center justify-center mt-[18px] md:px-5 w-full" />
        </div>
      </div>
    </>
  );
};

export default Home;
