import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import CakeApi from "apis/services/Cake";

import { Skeleton } from "@mui/material";
import { Button, Img, Text } from "components";

const BestSeller = (props) => {
  const [cakeInfo, setCakeInfo] = useState(null);
  const [cakeImages, setCakeImages] = useState(null);
  const [count, setCount] = useState(0);
  const [textAnimaion, setTextAnimation] = useState("");
  const [imageAnimation, setImageAnimation] = useState("");

  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    let cakeInfos = [];
    let cakeImages = [];
    let count = 0;

    const loadCake = async () => {
      try {
        let cakes = await CakeApi.getCakes({ bestSeller: true });

        cakes.forEach(async element => {
          try {
            let cakeInfo = await CakeApi.getCake(element.id);

            cakeInfos.push(cakeInfo);
            cakeImages.push(cakeInfo.image);
          } catch (error) {
            enqueueSnackbar("Cake could not be loaded", { variant: "error" });
          }
        });

        setCakeImages(cakeImages);
      } catch (error) {
        enqueueSnackbar("Cake could not be loaded", { variant: "error" });
      }
    };

    loadCake();

    const interalId = setInterval(() => {
      setCount(count);
      setCakeInfo(cakeInfos[count]);

      if (count === 2) {
        count = 0;
      } else {
        count++;
      }

      setTextAnimation("opacity-1");
      setImageAnimation(`h-[675px] -rotate-6`);
      setTimeout(() => {
        setImageAnimation(`h-[675px] rotate-6`);
      }, 450);
      setTimeout(() => {
        setImageAnimation("h-[675px]");
      }, 900);

      setTimeout(() => {
        setTextAnimation("mr-[500px] opacity-0");
        setImageAnimation("opacity-0 h-0");
      }, 2600);
    }, 3500);

    return () => {
      clearInterval(interalId);
    };

    // eslint-disable-next-line
  }, []);

  return (
    <div className={props.className}>
      <div className="flex flex-col items-center justify-start w-1/4 md:w-full">
        <Text
          className={`flex flex-row items-center justify-center sm:text-[21px] md:text-[23px] text-[25px] text-center text-red-500 w-full transition-all duration-300 ease-in ${textAnimaion}`}
          size="txtMonumentExtendedRegular25"
        >
          {cakeInfo ? (
            <>
              {cakeInfo.name.toUpperCase()}
            </>
          ) : (
            <Skeleton variant="text" width={200} height={45} />
          )}
        </Text>
        <Text
          className="sm:text-[21px] md:text-[23px] text-[25px] text-center text-red-500 w-full"
          size="txtMonumentExtendedRegular25"
        >
          CUPCAKE
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
          <Button
            className="bg-orange-50 hover:bg-red-500 border border-red-500 hover:border-teal-100 border-solid cursor-pointer font-sfmono leading-[normal] min-w-[193px] md:ml-[0] ml-[45px] mt-[49px] py-3.5 rounded-[5px] text-center text-lg text-red-500 hover:text-orange-50"
            onClick={() => navigate("/shop")}
          >
            shop now
          </Button>
        </div>
      </div>
      <div className="md:h-[675px] h-[754px] relative w-[69%] md:w-full">
        <div className="absolute h-[675px] inset-[0] justify-center m-auto object-cover w-[92%] ease-in" />
        {cakeInfo ? (
          <>
            {cakeImages.map((image, index) => (
              <Img
                key={index}
                className={`absolute inset-[0] justify-center m-auto object-cover w-[92%] transition-all duration-500 ease-in ${count === index ? `opacity-1 ${imageAnimation}` : "opacity-0 h-0"}`}
                src={image}
                alt="bestSeller"
              />
            ))}
          </>
        ) : (
          <div className="absolute inset-[0] justify-center m-auto object-cover w-[92%]">
            <Skeleton variant="rounded" width={783} height={677} />
          </div>
        )}
      </div>
    </div>
  );
};

BestSeller.defaultProps = {};

export default BestSeller;
