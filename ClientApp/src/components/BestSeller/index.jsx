import React from "react";

import { Button, Img, Text } from "components";

const BestSeller = (props) => {
  return (
    <>
      <div className={props.className}>
        <div className="flex flex-col items-center justify-start w-1/4 md:w-full">
          <Text
            className="sm:text-[21px] md:text-[23px] text-[25px] text-center text-red-500 w-full"
            size="txtMonumentExtendedRegular25"
          >
            BLUEBERRY CUPCAKE
          </Text>
          <Text
            className="italic mt-2 text-center text-lg text-red-500"
            size="txtSFMonoRegularItalic18"
          >
            4 simple ingredients
          </Text>
          <div className="flex flex-col items-start justify-start mt-[46px] w-[88%] md:w-full">
            <div className="flex flex-row gap-5 items-end justify-between w-full">
              <div className="flex flex-col items-center justify-start w-[47%]">
                <Img
                  className="h-[133px] md:h-auto object-cover w-full"
                  src="images/img_picture14.png"
                  alt="pictureFourteen"
                />
                <Text
                  className="text-center text-red-500 text-sm"
                  size="txtSFMonoRegular14"
                >
                  Flour
                </Text>
              </div>
              <div className="flex flex-col gap-[15px] items-center justify-start mt-4 w-[47%]">
                <Img
                  className="h-[101px] md:h-auto object-cover w-full"
                  src="images/img_picture13.png"
                  alt="pictureThirteen"
                />
                <Text
                  className="text-center text-red-500 text-sm"
                  size="txtSFMonoRegular14"
                >
                  Milk
                </Text>
              </div>
            </div>
            <div className="flex flex-row gap-5 items-end justify-between w-full">
              <div className="flex flex-col items-center justify-start w-[47%]">
                <Img
                  className="h-[133px] md:h-auto object-cover w-full"
                  src="images/img_picture11.png"
                  alt="pictureFourteen"
                />
                <Text
                  className="text-center text-red-500 text-sm"
                  size="txtSFMonoRegular14"
                >
                  Egg
                </Text>
              </div>
              <div className="flex flex-col gap-[15px] items-center justify-start mt-4 w-[47%]">
                <Img
                  className="h-[101px] md:h-auto object-cover w-full"
                  src="images/img_picture12.png"
                  alt="pictureThirteen"
                />
                <Text
                  className="text-center text-red-500 text-sm"
                  size="txtSFMonoRegular14"
                >
                  Butter
                </Text>
              </div>
            </div>
            {/* <div className="flex flex-row gap-5 items-center justify-between mt-2.5 w-full">
              <Img
                className="h-[122px] md:h-auto object-cover w-[122px]"
                src="images/img_picture11.png"
                alt="pictureEleven"
              />
              <Img
                className="h-20 md:h-auto object-cover"
                src="images/img_picture12.png"
                alt="pictureTwelve"
              />
            </div>
            <div className="flex flex-row gap-[104px] items-start justify-end ml-12 md:ml-[0] w-[69%] md:w-full">
              <Text
                className="text-center text-red-500 text-sm"
                size="txtSFMonoRegular14"
              >
                Egg
              </Text>
              <Text
                className="text-center text-red-500 text-sm"
                size="txtSFMonoRegular14"
              >
                Butter
              </Text>
            </div> */}
            <Button className="bg-orange-50 border border-red-500 border-solid cursor-pointer font-sfmono leading-[normal] min-w-[193px] md:ml-[0] ml-[45px] mt-[49px] py-3.5 rounded-[5px] text-center text-lg text-red-500">
              shop now
            </Button>
          </div>
        </div>
        <div className="md:h-[675px] h-[754px] relative w-[69%] md:w-full">
          <div className="flex flex-col h-full items-center justify-start m-auto w-full">
            <div className="flex flex-col justify-start w-full">
              <div className="flex flex-col items-center justify-start mr-[17px] w-[98%] md:w-full">
                <div className="md:h-[261px] h-[377px] relative w-full">
                  <div className="absolute flex flex-col inset-x-[0] items-center justify-start mx-auto top-[26px] w-[99%]">
                    <div className="flex flex-col items-center justify-start w-full">
                      <Text
                        className="rotate-[-4deg] md:text-5xl text-8xl text-center text-teal-100 mb-5"
                        size="txtMonumentExtendedUltrabold96"
                      >
                        Blueberry
                      </Text>
                      <Text
                        className="rotate-[-4deg] md:text-5xl text-8xl text-center text-teal-100 mb-5 ml-[19px]"
                        size="txtMonumentExtendedUltrabold96"
                      >
                        Blueberry
                      </Text>
                      <Text
                        className="rotate-[-4deg] md:text-5xl text-8xl text-center text-teal-100 mb-5 ml-[39px]"
                        size="txtMonumentExtendedUltrabold96"
                      >
                        Blueberry
                      </Text>
                      <Text
                        className="rotate-[-4deg] md:text-5xl text-8xl text-center text-teal-100 mb-5 ml-[59px]"
                        size="txtMonumentExtendedUltrabold96"
                      >
                        Blueberry
                      </Text>
                      <Text
                        className="rotate-[-4deg] md:text-5xl text-8xl text-center text-teal-100 mb-5 ml-[79px]"
                        size="txtMonumentExtendedUltrabold96"
                      >
                        Blueberry
                      </Text>
                      <Text
                        className="rotate-[-4deg] md:text-5xl text-8xl text-center text-teal-100 mb-4 ml-[99px]"
                        size="txtMonumentExtendedUltrabold96"
                      >
                        Blueberry
                      </Text>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
          <Img
            className="absolute h-[675px] inset-[0] justify-center m-auto object-cover w-[92%]"
            src="images/img_picture15.png"
            alt="pictureFifteen"
          />
        </div>
      </div>
    </>
  );
};

BestSeller.defaultProps = {};

export default BestSeller;
