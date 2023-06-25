import React, { useEffect, useState } from "react";

import { enqueueSnackbar } from "notistack";
import CakeApi from "apis/services/Cake";

import { Button, Img, Input, Line, List, Text } from "components";
import Navbar from "components/Navbar";
import Cakes from "components/Cakes";
import Footer from "components/Footer";

const CakeDetail = () => {
    const [cake, setCake] = useState(null);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, []);

    useEffect(() => {
        const loadCakeDetail = async () => {
            try {
                let cakeDetail = await CakeApi.getCake(window.location.pathname.split("/").pop());

                setCake(cakeDetail);
            } catch (error) {
                enqueueSnackbar("Could not load cake detail", { variant: "error" });
            }
        }


        loadCakeDetail();
    }, []);

    return (
        <>
            {cake && (
                <div className="bg-orange-50 flex flex-col font-monumentextended items-center justify-start mx-auto w-full">
                <div className="flex flex-col items-start justify-start w-full">
                    <Navbar className="bg-orange-50 flex flex-row font-sfmono items-center justify-start p-[27px] sm:px-5 shadow-bs w-full" />
                </div>
                <div className="h-[616px] md:px-5 relative mt-navbar w-full">
                    <Line className="absolute bg-red-500 h-[616px] inset-y-[0] my-auto right-[46%] w-px" />
                    <Line className="absolute bg-red-500 h-px inset-x-[0] mx-auto top-[0] w-full" />
                    <div className="absolute flex flex-col md:gap-10 gap-[100px] h-max inset-y-[0] items-center justify-start my-auto right-[5%] w-[36%]">
                        <div className="flex flex-col gap-10 items-center justify-start w-full">
                            <Text className="font-extrabold sm:text-[39px] md:text-[45px] text-[53px] text-red-500 w-full">
                                {cake.name} Cupcake
                            </Text>
                            <div className="flex flex-col font-sfmono items-center justify-start w-full">
                                <div className="flex flex-col gap-2 justify-start w-full">
                                    <div className="flex sm:flex-col flex-row sm:gap-10 gap-[118px] items-center justify-start ml-2.5 md:ml-[0] w-[88%] md:w-full">
                                        <Text className="font-bold text-center text-lg text-red-500">Product Description</Text>
                                        <Text className="text-center text-lg text-red-500">Ingredients</Text>
                                    </div>
                                    <div className="flex flex-col gap-2 items-center justify-start w-full">
                                        <div className="flex flex-col relative w-full">
                                            <Line className="bg-red-500 h-px mx-auto w-full" />
                                            <Line className="bg-red-500 h-0.5 mb-auto mt-[-1px] w-[46%] z-[1]" />
                                        </div>
                                        <Text className="text-base text-red-500 w-full">
                                            Blueberry Cupcake is a cute little cake that has the delicious flavor of blueberries. This is a
                                            popular dessert and is often made for special occasions or for everyday enjoyment.
                                        </Text>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col font-sfmono gap-[39px] items-center justify-start w-full">
                            <div className="flex flex-col gap-3.5 items-center justify-start w-full">
                                <Line className="bg-red-500 h-px w-full" />
                                <div className="flex flex-row items-center justify-between w-full">
                                    <div className="flex flex-col items-center justify-start">
                                        <div className="flex flex-row gap-[25px] items-center justify-between w-full">
                                            <Text className="text-lg text-red-500">Number</Text>
                                            <Button className="bg-orange-50 border border-red-500 border-solid cursor-pointer leading-[normal] min-w-[71px] py-1 rounded-[3px] text-center text-lg text-red-500">
                                                1
                                            </Button>
                                        </div>
                                    </div>
                                    <Text className="text-lg text-red-500 text-right">{cake.price.toLocaleString("vi-VN")} VNĐ</Text>
                                </div>
                                <Line className="bg-red-500 h-px w-full" />
                            </div>
                            <div className="flex flex-row gap-5 items-center justify-center w-[52%] md:w-full">
                                <Img className="h-[36px] w-[38px]" src="images/img_cart.svg" alt="cart_One" />
                                <Button className="bg-orange-50 border border-indigo-900 border-solid cursor-pointer leading-[normal] min-w-[193px] py-3.5 rounded-[5px] text-center text-indigo-900 text-lg">
                                    buy now
                                </Button>
                            </div>
                        </div>
                    </div>
                    <Img
                        className="absolute h-[560px] inset-y-[0] left-[1%] my-auto object-cover w-1/2"
                        src={cake.image}
                        alt="rectangle28158"
                    />
                </div>
                <Line className="bg-red-500 h-px w-full" />
                <Text className="font-extrabold mt-[35px] sm:text-[35px] md:text-[37px] text-[39px] text-center text-red-500">
                    Customer Reviews
                </Text>
                <div className="flex flex-col font-sfmono gap-[19px] items-end justify-start max-w-[1258px] mt-[43px] mx-auto md:px-5 w-full">
                    <List className="flex flex-col gap-10 items-center py-10 w-full" orientation="vertical">
                        <div className="flex flex-1 flex-col items-center justify-start my-0 w-full">
                            <div className="flex flex-col items-start justify-start w-full">
                                <div className="flex flex-row items-center justify-start w-1/5 md:w-full">
                                    <div className="flex flex-col h-[33px] items-center justify-start w-[33px]">
                                        <Img
                                            className="h-[33px] outline outline-[1px] outline-red-500 w-[33px]"
                                            src="images/img_star1_5.svg"
                                            alt="starOne"
                                        />
                                    </div>
                                    <div className="flex flex-col h-[33px] items-center justify-start ml-[19px] w-[33px]">
                                        <Img
                                            className="h-[33px] outline outline-[1px] outline-red-500 w-[33px]"
                                            src="images/img_star2_5.svg"
                                            alt="starTwo"
                                        />
                                    </div>
                                    <div className="flex flex-col h-[33px] items-center justify-start ml-5 w-[33px]">
                                        <Img
                                            className="h-[33px] outline outline-[1px] outline-red-500 w-[33px]"
                                            src="images/img_star3_5.svg"
                                            alt="starThree"
                                        />
                                    </div>
                                    <div className="flex flex-col h-[33px] items-center justify-start ml-[19px] w-[33px]">
                                        <Img
                                            className="h-[33px] outline outline-[1px] outline-red-500 w-[33px]"
                                            src="images/img_star4_5.svg"
                                            alt="starFour"
                                        />
                                    </div>
                                    <div className="flex flex-col h-[33px] items-center justify-start ml-5 w-[33px]">
                                        <Img
                                            className="h-[33px] outline outline-[1px] outline-red-500 w-[33px]"
                                            src="images/img_star5_5.svg"
                                            alt="starFive"
                                        />
                                    </div>
                                </div>
                                <Text className="font-monumentextended mt-[22px] sm:text-[27px] md:text-[29px] text-[31px] text-red-500">
                                    Envy
                                </Text>
                                <Text className="font-sfmono mt-9 text-lg text-red-500 w-full">
                                    One useful feature of EZ Cupcake is that it allows users to preview their custom cakes on the website.
                                    When the user changes elements such as shape, color, and decoration, the cake image will be updated
                                    immediately. This gives users an accurate view of the final product before placing an order.
                                </Text>
                            </div>
                        </div>
                        <Line className="self-center h-px bg-red-500 w-full" />
                        <div className="flex flex-1 flex-col items-center justify-start my-0 w-full">
                            <div className="flex flex-col items-start justify-start w-full">
                                <div className="flex flex-row items-center justify-start w-1/5 md:w-full">
                                    <div className="flex flex-col h-[33px] items-center justify-start w-[33px]">
                                        <Img
                                            className="h-[33px] outline outline-[1px] outline-red-500 w-[33px]"
                                            src="images/img_star1_6.svg"
                                            alt="starOne"
                                        />
                                    </div>
                                    <div className="flex flex-col h-[33px] items-center justify-start ml-[19px] w-[33px]">
                                        <Img
                                            className="h-[33px] outline outline-[1px] outline-red-500 w-[33px]"
                                            src="images/img_star2_6.svg"
                                            alt="starTwo"
                                        />
                                    </div>
                                    <div className="flex flex-col h-[33px] items-center justify-start ml-5 w-[33px]">
                                        <Img
                                            className="h-[33px] outline outline-[1px] outline-red-500 w-[33px]"
                                            src="images/img_star3_6.svg"
                                            alt="starThree"
                                        />
                                    </div>
                                    <div className="flex flex-col h-[33px] items-center justify-start ml-[19px] w-[33px]">
                                        <Img
                                            className="h-[33px] outline outline-[1px] outline-red-500 w-[33px]"
                                            src="images/img_star4_6.svg"
                                            alt="starFour"
                                        />
                                    </div>
                                    <div className="flex flex-col h-[33px] items-center justify-start ml-5 w-[33px]">
                                        <Img
                                            className="h-[33px] outline outline-[1px] outline-red-500 w-[33px]"
                                            src="images/img_star5_6.svg"
                                            alt="starFive"
                                        />
                                    </div>
                                </div>
                                <Text className="font-monumentextended mt-[22px] sm:text-[27px] md:text-[29px] text-[31px] text-red-500">
                                    Envy
                                </Text>
                                <Text className="font-sfmono mt-9 text-lg text-red-500 w-full">
                                    One useful feature of EZ Cupcake is that it allows users to preview their custom cakes on the website.
                                    When the user changes elements such as shape, color, and decoration, the cake image will be updated
                                    immediately. This gives users an accurate view of the final product before placing an order.
                                </Text>
                            </div>
                        </div>
                        <Line className="self-center h-px bg-red-500 w-full" />
                        <div className="flex flex-1 flex-col items-center justify-start my-0 w-full">
                            <div className="flex flex-col items-start justify-start w-full">
                                <div className="flex flex-row items-center justify-start w-1/5 md:w-full">
                                    <div className="flex flex-col h-[33px] items-center justify-start w-[33px]">
                                        <Img
                                            className="h-[33px] outline outline-[1px] outline-red-500 w-[33px]"
                                            src="images/img_star1_7.svg"
                                            alt="starOne"
                                        />
                                    </div>
                                    <div className="flex flex-col h-[33px] items-center justify-start ml-[19px] w-[33px]">
                                        <Img
                                            className="h-[33px] outline outline-[1px] outline-red-500 w-[33px]"
                                            src="images/img_star2_7.svg"
                                            alt="starTwo"
                                        />
                                    </div>
                                    <div className="flex flex-col h-[33px] items-center justify-start ml-5 w-[33px]">
                                        <Img
                                            className="h-[33px] outline outline-[1px] outline-red-500 w-[33px]"
                                            src="images/img_star3_7.svg"
                                            alt="starThree"
                                        />
                                    </div>
                                    <div className="flex flex-col h-[33px] items-center justify-start ml-[19px] w-[33px]">
                                        <Img
                                            className="h-[33px] outline outline-[1px] outline-red-500 w-[33px]"
                                            src="images/img_star4_7.svg"
                                            alt="starFour"
                                        />
                                    </div>
                                    <div className="flex flex-col h-[33px] items-center justify-start ml-5 w-[33px]">
                                        <Img
                                            className="h-[33px] outline outline-[1px] outline-red-500 w-[33px]"
                                            src="images/img_star5_7.svg"
                                            alt="starFive"
                                        />
                                    </div>
                                </div>
                                <Text className="font-monumentextended mt-[22px] sm:text-[27px] md:text-[29px] text-[31px] text-red-500">
                                    Envy
                                </Text>
                                <Text className="font-sfmono mt-9 text-lg text-red-500 w-full">
                                    One useful feature of EZ Cupcake is that it allows users to preview their custom cakes on the website.
                                    When the user changes elements such as shape, color, and decoration, the cake image will be updated
                                    immediately. This gives users an accurate view of the final product before placing an order.
                                </Text>
                            </div>
                        </div>
                    </List>
                    <div className="flex flex-row items-start justify-end w-[8%] md:w-full">
                        <Text className="italic mb-1 text-lg text-red-500 text-right underline">1</Text>
                        <Text className="italic mb-1 ml-[21px] text-lg text-red-500 text-right">2</Text>
                        <Text className="italic ml-[23px] mt-1 text-lg text-red-500 text-right">...</Text>
                    </div>
                </div>
                <Cakes className="gap-5 grid sm:grid-cols-1 md:grid-cols-2 grid-cols-4 items-center justify-between max-w-[1400px] mt-3.5 mx-auto md:px-5 w-full" />
                <Footer className="bg-orange-50 flex font-sfmono items-center justify-center mt-5 md:px-5 w-full" />
            </div>
            )}
        </>
    );
};

export default CakeDetail;
