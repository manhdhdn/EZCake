import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import { enqueueSnackbar } from "notistack";
import { handleSectionNavigation } from "utils";
import CakeApi from "apis/services/Cake";

import { CircularProgress } from "@mui/material";
import { Img, Line, Text } from "components";
import Navbar from "components/Navbar";
import Footer from "components/Footer";

const Shop = () => {
    const [cakes, setCakes] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        handleSectionNavigation("shop", -1);
    }, []);

    useEffect(() => {
        const loadCakes = async () => {
            try {
                let cakes = await CakeApi.getCakes({ status: "Available" });

                setCakes(cakes.data);
            } catch (error) {
                enqueueSnackbar("Could not load cakes", { variant: "error" });
            }
        }

        loadCakes();
    }, []);

    const handleCakeClick = (id) => {
        navigate(`/cake-detail/${id}`);
    }

    const content = () => {
        let element = [];

        if (cakes) {
            cakes.forEach((cake) => {
                element.push(
                    <div
                        key={cake.id} className="h-[726px] flex flex-row items-center justify-center w-1/3"
                        onClick={() => handleCakeClick(cake.id)}
                    >
                        <div className="h-full flex flex-col items-center justify-center w-full">
                            <Img
                                className="h-[665px] object-cover w-full"
                                src={cake.image}
                                alt="cake for sell"
                            />
                            <Line className="bg-red-500 h-px w-full" />
                            <Text className="md:ml-[0] sm:text-[21px] md:text-[23px] text-[25px] text-center text-red-500 my-4">
                                {cake.name} Cupcake
                            </Text>
                            <Line className="bg-red-500 h-px w-full" />
                        </div>
                        <Line className="bg-red-500 h-full inset-y-[0] right-0 w-px" />
                    </div>
                )
            })
        } else {
            element.push(
                <div key="loading" className="h-[726px] flex items-center justify-center w-full">
                    <CircularProgress color="success" />
                </div>
            )
        }

        return element;
    }

    return (
        <>
            <div className="bg-orange-50 flex flex-col font-monumentextended items-start justify-start mx-auto w-full">
                <div className="flex flex-col items-start justify-start w-full">
                    <Navbar className="bg-orange-50 flex flex-row font-sfmono items-center justify-start p-[27px] sm:px-5 shadow-bs w-full" />
                </div>
                {/* <div className="flex flex-col md:px-5 relative w-full">
                    <div className="h-[707px] md:h-[726px] mx-auto overflow-auto w-full">
                        <div className="absolute h-[726px] inset-x-[0] mx-auto top-[0] w-full">
                            <Line className="bg-red-500 h-px mx-auto w-full" />
                            <div className="absolute flex flex-col h-full inset-[0] items-center justify-center m-auto w-full">
                                <div className="h-[725px] relative w-full">
                                    <div className="absolute h-[725px] inset-[0] justify-center m-auto w-full">
                                        <div className="absolute flex flex-col inset-x-[0] items-start justify-start mx-auto top-[0] w-full">
                                            <div className="flex relative w-full">
                                                <Img
                                                    className="h-[665px] my-auto object-cover w-1/3"
                                                    src="images/img_header.png"
                                                    alt="unsplashttj5pSixteen"
                                                />
                                                <Img
                                                    className="h-[665px] my-auto object-cover w-1/3"
                                                    src="images/img_header.png"
                                                    alt="unsplashttj5pSixteen_One"
                                                />
                                                <Img
                                                    className="h-[665px] my-auto object-cover w-1/3"
                                                    src="images/img_header.png"
                                                    alt="unsplashttj5pSixteen_Two"
                                                />
                                            </div>
                                            <Line className="bg-red-500 h-px w-full" />
                                        </div>
                                        <Line className="absolute bg-red-500 h-[725px] inset-y-[0] left-1/3 w-px" />
                                        <Line className="absolute bg-red-500 h-[725px] inset-y-[0] right-1/3 w-px" />
                                    </div>
                                    <div className="absolute bottom-[2%] flex md:flex-col flex-row justify-center md:gap-5 inset-x-[0] items-center justify-start mx-auto w-full">
                                        <Text className="md:ml-[0] sm:text-[21px] md:text-[23px] text-[25px] text-center text-red-500 w-1/3">
                                            BLUEBERRY CUPCAKE
                                        </Text>
                                        <Text className="md:ml-[0] sm:text-[21px] md:text-[23px] text-[25px] text-center text-red-500 w-1/3">
                                            ORANGE CUPCAKE
                                        </Text>
                                        <Text className="md:ml-[0] sm:text-[21px] md:text-[23px] text-[25px] text-center text-red-500 w-1/3">
                                            BUTTER CUPCAKE
                                        </Text>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> */}
                <div id="shop" className="flex flex-wrap items-start justify-start mt-navbar w-full">
                    {content()}
                </div>
                <Footer className="bg-orange-50 flex font-sfmono items-center justify-center md:px-5 w-full" />
            </div>
        </>
    );
};

export default Shop;
