import React from "react";

import { handleSectionNavigation } from "utils";

import { Link } from "react-router-dom";
import { Button, Img, Line, Text } from "components";

const Footer = (props) => {
  const handleTiktokClick = () => {
    window.open("https://www.tiktok.com/@cakeez07", "_blank");
  }

  const handleFacebookClick = () => {
    window.open("https://www.facebook.com/EzCakecop", "_blank");
  }

  return (
    <>
      <footer className={props.className}>
        <div className="flex flex-col items-center justify-center mb-[69px] w-full">
          <div className="flex flex-col items-center justify-center w-full">
            <Line className="bg-red-500 h-px w-full" />
            <div className="flex md:flex-col flex-row md:gap-10 items-center justify-between md:ml-[0] ml-[90px] mr-[90px] mt-16 w-[85%] md:w-full">
              <div className="flex flex-col gap-5 items-center justify-start">
                <Img
                  className="h-[205px] md:h-auto sm:h-auto w-auto"
                  src="images/img_logosmall.png"
                  alt="logobig"
                />
                <Text
                  className="text-center text-red-500 text-sm"
                  size="txtSFMonoRegular14"
                >
                  Phone number: 0328328752
                </Text>
              </div>
              <div className="flex flex-col gap-5 ml-[35px] items-center justify-start">
                <ul className="flex flex-col items-start justify-start w-[100%] md:w-full common-column-list">
                  <div className="flex md:flex-col flex-row md:gap-5 items-start justify-start">
                    <Text
                      className="text-lg text-red-500"
                      size="txtSFMonoBold18"
                    >
                      EZ Cupcake
                    </Text>
                    <Text
                      className="md:ml-[0] ml-[258px] text-lg text-red-500"
                      size="txtSFMonoBold18"
                    >
                      About Us
                    </Text>
                    <Text
                      className="md:ml-[0] ml-[253px] text-lg text-red-500"
                      size="txtSFMonoBold18"
                    >
                      Legal
                    </Text>
                  </div>
                  <div className="flex md:flex-col flex-row md:gap-5 items-start justify-start mt-4">
                    <Link to="/cuscake">
                      <Text
                        className="text-base text-red-500"
                        size="txtSFMonoRegular16"
                      >
                        Cuscake
                      </Text>
                    </Link>
                    <Link to="/our-story">
                      <Text
                        className="md:ml-[0] ml-[301px] md:mt-0 mt-0.5 text-base text-red-500"
                        size="txtSFMonoRegular16"
                      >
                        Our Story
                      </Text>
                    </Link>
                    <Link to="/terms-of-service">
                      <Text
                        className="mb-0.5 md:ml-[0] ml-[253px] text-base text-red-500"
                        size="txtSFMonoRegular16"
                      >
                        Terms Of Service
                      </Text>
                    </Link>
                  </div>
                  <div className="flex md:flex-col flex-row md:gap-5 items-center justify-start mt-3">
                    <Link to="/" onClick={() => setTimeout(() => handleSectionNavigation("ezzone", -427), 100)}>
                      <Text
                        className="text-base text-red-500"
                        size="txtSFMonoRegular16"
                      >
                        Ez Zone
                      </Text>
                    </Link>
                    <Link to="/contact">
                      <Text
                        className="md:ml-[0] ml-[301px] text-base text-red-500"
                        size="txtSFMonoRegular16"
                      >
                        Contact
                      </Text>
                    </Link>
                    <Link to="/privacy-policy">
                      <Text
                        className="md:ml-[0] ml-[273px] text-base text-red-500"
                        size="txtSFMonoRegular16"
                      >
                        Privacy Policy
                      </Text>
                    </Link>
                  </div>
                  <div className="flex flex-row gap-[213px] items-start justify-start mt-3">
                    <Text
                      className="text-base text-red-500"
                      size="txtSFMonoRegular16"
                    >
                      What cake today?
                    </Text>
                    <Text
                      className="text-base text-red-500"
                      size="txtSFMonoRegular16"
                    >
                      Social Media
                    </Text>
                  </div>
                  <div className="flex flex-row gap-5 items-center justify-start md:ml-[0] ml-[370px] mt-[13px]">
                    <Button className="flex h-9 items-center justify-center p-[3x] w-9">
                      <Img
                        src="images/img_facebook.svg"
                        alt="facebook"
                        onClick={handleFacebookClick}
                      />
                    </Button>
                    <Button className="bg-gray-900 flex h-9 items-center justify-center p-[7px] rounded-lg w-9">
                      <Img
                        src="images/img_tiktok.svg"
                        alt="tiktok"
                        onClick={handleTiktokClick}
                      />
                    </Button>
                  </div>
                </ul>
                <Line className="bg-red-500 h-px w-full" />
                <Text className="text-red-500 text-sm" size="txtSFMonoRegular14">
                  Copyright © 2023 Ez Cupcake | All Rights Reserved
                </Text>
              </div>
            </div>

          </div>
        </div>
      </footer>
    </>
  );
};

Footer.defaultProps = {};

export default Footer;
