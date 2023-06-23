import React, { useEffect, useState } from "react";

import { enqueueSnackbar } from "notistack";
import CakeApi from "apis/services/Cake";

import { Img, Text } from "components";

const Cakes = (props) => {
  const [load, setLoad] = useState(true);
  const [stop, setStop] = useState(false);
  const [cakes, setCakes] = useState(null);
  const [hover, setHover] = useState(-1);
  const [cartIcon, setCartIcon] = useState("images/img_cart_orange_50.svg");

  const animationHide = "opacity-0";
  const animationShow = "opacity-1";

  useEffect(() => {
    let pageNumber = 1;

    const loadCakes = async () => {
      try {
        let cakes = await CakeApi.getCakes({ pageNumber, status: "Available" });

        setCakes(cakes.data);
        setTimeout(() => {
          setLoad(false);
        }, 300);

        if (cakes.hasNext) {
          pageNumber++;
        } else {
          pageNumber = 1;
        }
      } catch (error) {
        enqueueSnackbar("Load cakes failed", { variant: "error" });
      }
    }

    const intervalId = !stop && setInterval(() => {
      setLoad(true);
      setTimeout(() => {
        loadCakes();
      }, 200);
    }, 3000);

    return () => {
      clearInterval(intervalId);
    }

    // eslint-disable-next-line
  }, [stop]);

  const handleCakeEnter = (id) => {
    setHover(id);
    setStop(true);
  }

  const handleCakeLeave = () => {
    setHover(-1);
    setStop(false);
  }

  const handleCartIconEnter = () => {
    setCartIcon("images/img_cart_orange_50_hover.svg");
  }

  const handleCartIconLeave = () => {
    setCartIcon("images/img_cart_orange_50.svg");
  }

  const contents = () => {
    let element = [];

    cakes.forEach((cake, index) => {
      element.push(
        <div
          key={index}
          className={`relative transition-all duration-300 ${load ? animationHide : animationShow} w-full`}
          onMouseEnter={() => handleCakeEnter(index)}
          onMouseLeave={() => handleCakeLeave()}
        >
          <Img
            className="h-[500px] md:h-auto object-cover w-[335px]"
            src={hover === index ? "images/img_cake_hover.png" : cake.image}
            alt="cake"
          />
          <div className={`absolute transition-all duration-300 ${hover === index ? animationShow : animationHide} flex flex-col h-max inset-[0] items-center justify-center m-auto w-[100%]`}>
            <Text className="font-monumentextended sm:text-[21px] md:text-[23px] text-[25px] text-center text-white-A700">
              {cake.name} Cupcake
            </Text>
            <Text className="font-bold font-sfmono mt-2 text-center text-lg text-white-A700">{cake.price.toLocaleString("vi-VN")} VNĐ</Text>
            <Img
              className="h-[30px] mt-[49px] w-[30px] cursor-pointer" src={cartIcon} alt="cart"
              onMouseEnter={handleCartIconEnter}
              onMouseLeave={handleCartIconLeave}
            />
          </div>
        </div>
      );
    });

    return element;
  }

  return (
    <div className={props.className}>
      {cakes && contents()}
      {!cakes && (
        <div className="relative h-[500px] w-full" />
      )}
    </div>
  );
};

Cakes.defaultProps = {};

export default Cakes;
