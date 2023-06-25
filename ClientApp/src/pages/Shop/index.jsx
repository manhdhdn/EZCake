import React, { useEffect } from "react";


import { Img, Line, Text } from "components";
import Navbar from "components/Navbar";
import Footer from "components/Footer";
import Chat from "components/Chat";

const Shop = () => {
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, []);

    return (
        <>
            <div className="bg-orange-50 flex flex-col font-monumentextended items-center justify-start mx-auto w-full">
                <div className="flex flex-col items-start justify-start w-full">
                    {/* <Navbar className="bg-orange-50 flex flex-row font-sfmono items-center justify-start p-[27px] sm:px-5 shadow-bs w-full" /> */}
                </div>
                <div className="flex flex-col md:px-5 relative mt-navbar w-full">
                    <div className="h-[1451px] md:h-[726px] mx-auto overflow-auto w-full">
                        <div className="absolute h-[726px] inset-x-[0] mx-auto top-[0] w-full">
                            <Line className="bg-red-500 h-px mx-auto w-full" />
                            <div className="absolute flex flex-col h-full inset-[0] items-center justify-center m-auto w-full">
                                <div className="h-[725px] relative w-full">
                                    <div className="absolute h-[725px] inset-[0] justify-center m-auto w-full">
                                        <div className="absolute flex flex-col inset-x-[0] items-start justify-start mx-auto top-[0] w-full">
                                            <div className="flex relative w-[68%] md:w-full">
                                                <Img
                                                    className="h-[665px] my-auto object-cover w-[49%]"
                                                    src="images/img_unsplashttj5p16rb4.png"
                                                    alt="unsplashttj5pSixteen"
                                                />
                                                <Img
                                                    className="h-[665px] ml-[-0.01px] my-auto object-cover w-[52%] z-[1]"
                                                    src="images/img_unsplashttj5p16rb4_665x494.png"
                                                    alt="unsplashttj5pSixteen_One"
                                                />
                                            </div>
                                            <Line className="bg-red-500 h-px w-full" />
                                        </div>
                                        <Line className="absolute bg-red-500 h-[725px] inset-y-[0] left-[33%] my-auto w-px" />
                                        <Line className="absolute bg-red-500 h-[725px] inset-y-[0] my-auto right-[33%] w-px" />
                                    </div>
                                    <div className="absolute bottom-[2%] flex md:flex-col flex-row md:gap-5 inset-x-[0] items-center justify-start mx-auto w-[91%]">
                                        <Text className="sm:text-[21px] md:text-[23px] text-[25px] text-center text-red-500">
                                            BLUEBERRY CUPCAKE
                                        </Text>
                                        <Text className="md:ml-[0] ml-[143px] sm:text-[21px] md:text-[23px] text-[25px] text-center text-red-500">
                                            ORANGE CUPCAKE
                                        </Text>
                                        <Text className="md:ml-[0] ml-[174px] sm:text-[21px] md:text-[23px] text-[25px] text-center text-red-500">
                                            BUTTER CUPCAKE
                                        </Text>
                                    </div>
                                    <Img
                                        className="absolute h-[665px] object-cover right-[0] top-[0] w-[33%]"
                                        src="images/img_unsplashttj5p16rb4_665x472.png"
                                        alt="unsplashttj5pSixteen_Two"
                                    />
                                </div>
                                <Line className="bg-red-500 h-px w-full" />
                            </div>
                        </div>
                    </div>
                    <Chat />
                    <Footer className="bg-orange-50 flex font-sfmono items-center justify-center mt-[18px] md:px-5 w-full" />
                </div>
            </div>
        </>
    );
};

export default Shop;
