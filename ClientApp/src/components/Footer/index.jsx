import React from "react";

import { Button, Img, Input, Line, Text } from "components";

const Footer = (props) => {
  return (
    <>
      <footer className={props.className}>
        <div className="flex flex-col items-center justify-center mb-[69px] w-full">
          <div className="flex flex-col items-center justify-center w-full">
            <Line className="bg-red-500 h-px w-full" />
            <div className="flex md:flex-col flex-row md:gap-10 items-center justify-between md:ml-[0] ml-[90px] mr-[71px] mt-16 w-[89%] md:w-full">
              <Img
                className="h-[204px] md:h-auto object-cover"
                src="images/img_logosmall.png"
                alt="logobig"
              />
              <div className="flex flex-col gap-5 items-center justify-start">
                <ul className="flex flex-col items-start justify-start w-[93%] md:w-full common-column-list">
                  <li>
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
                  </li>
                  <li>
                    <div className="flex md:flex-col flex-row md:gap-5 items-start justify-start mt-4">
                      <Text
                        className="text-base text-red-500"
                        size="txtSFMonoRegular16"
                      >
                        Cuscake
                      </Text>
                      <Text
                        className="md:ml-[0] ml-[301px] md:mt-0 mt-0.5 text-base text-red-500"
                        size="txtSFMonoRegular16"
                      >
                        Our Story
                      </Text>
                      <Text
                        className="mb-0.5 md:ml-[0] ml-[253px] text-base text-red-500"
                        size="txtSFMonoRegular16"
                      >
                        Terms Of Service
                      </Text>
                    </div>
                  </li>
                  <li>
                    <div className="flex md:flex-col flex-row md:gap-5 items-center justify-start mt-3">
                      <Text
                        className="text-base text-red-500"
                        size="txtSFMonoRegular16"
                      >
                        Ez Zone
                      </Text>
                      <Text
                        className="md:ml-[0] ml-[301px] text-base text-red-500"
                        size="txtSFMonoRegular16"
                      >
                        Contact
                      </Text>
                      <Text
                        className="md:ml-[0] ml-[273px] text-base text-red-500"
                        size="txtSFMonoRegular16"
                      >
                        Privacy Policy
                      </Text>
                    </div>
                  </li>
                  <li>
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
                  </li>
                  <li>
                    <div className="flex flex-row gap-5 items-center justify-start md:ml-[0] ml-[370px] mt-[13px]">
                      <Button className="flex h-9 items-center justify-center p-[3x] w-9">
                        <Img src="images/img_facebook.svg" alt="facebook" />
                      </Button>
                      <Button className="bg-gray-900 flex h-9 items-center justify-center p-[7px] rounded-lg w-9">
                        <Img src="images/img_music.svg" alt="tiktok" />
                      </Button>
                    </div>
                  </li>
                </ul>
                <Line className="bg-red-500 h-px w-full" />
              </div>
            </div>
            <div className="flex md:flex-col flex-row md:gap-10 gap-[369px] items-start justify-start md:ml-[0] ml-[109px] mr-[331px] mt-2 w-[70%] md:w-full">
              <Text
                className="text-center text-red-500 text-sm"
                size="txtSFMonoRegular14"
              >
                Phone number: 0328328752
              </Text>
              <Text className="text-red-500 text-sm" size="txtSFMonoRegular14">
                Copyright © 2023 Ez Cupcake | All Rights Reserved
              </Text>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

Footer.defaultProps = {};

export default Footer;
