import React, { useEffect, useState } from "react";

import CakeApi from "apis/services/Cake";

import { Backdrop, CircularProgress } from "@mui/material";
import { Button, Img, Text } from "components";
import { element } from "prop-types";

const BestSeller = (props) => {
  const [cakeInfo, setCakeInfo] = useState(null);

  useEffect(() => {
    let cakeInfos = [];
    let count = 0;

    const loadCake = async () => {
      let cakes = await CakeApi.getCakes({ bestSeller: true });

      cakes.forEach(async element => {
        let cakeInfo = await CakeApi.getCake(element.id);

        cakeInfos.push(cakeInfo);
      });
    };

    loadCake();

    const interalId = setInterval(() => {
      if (count == 3) {
        count = 0;
      }

      setCakeInfo(cakeInfos[count]);
      count++;
    }, 3000);

    return () => {
      clearInterval(interalId);
    };
  }, []);

  return (
    <div className={props.className}>
      {cakeInfo && (
        <>
          <div className="flex flex-col items-center justify-start w-1/4 md:w-full">
            <Text
              className="sm:text-[21px] md:text-[23px] text-[25px] text-center text-red-500 w-full"
              size="txtMonumentExtendedRegular25"
            >
              {cakeInfo.name.toUpperCase()} CUPCAKE
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
              <Button className="bg-orange-50 border border-red-500 border-solid cursor-pointer font-sfmono leading-[normal] min-w-[193px] md:ml-[0] ml-[45px] mt-[49px] py-3.5 rounded-[5px] text-center text-lg text-red-500">
                shop now
              </Button>
            </div>
          </div>
          <div className="md:h-[675px] h-[754px] relative w-[69%] md:w-full">
            <Img
              className="absolute h-[675px] inset-[0] justify-center m-auto object-cover w-[92%]"
              src={cakeInfo.image}
              alt="bestSeller"
            />
          </div>
        </>
      )}

      {!cakeInfo && (
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={true}
        >
          <CircularProgress color="success" />
        </Backdrop>
      )}
    </div>
  );
};

BestSeller.defaultProps = {};

export default BestSeller;
