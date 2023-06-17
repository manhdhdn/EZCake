import React, { useEffect } from "react";

import { Button, Img, Input, Line, Text } from "../../components";
import Footer from "../../components/Footer";
import SignHeader from "components/SignHeader";
import Chat from "components/Chat";

const Cuscake = () => {
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, []);

    return (
        <>
            <div className="bg-orange-50 flex flex-col font-sfmono items-center justify-start mx-auto w-full">
                <div className="md:h-[1517px] sm:h-[666px] h-[786px] md:px-5 relative w-full">
                    <div className="absolute bottom-[0] flex md:flex-col flex-row md:gap-[54px] inset-x-[0] items-start justify-between mx-auto w-[97%]">
                        <div className="h-[666px] relative w-[42%] md:w-full">
                            <Img
                                className="absolute bottom-[0] h-[556px] inset-x-[0] mx-auto object-cover w-full"
                                src="images/img_bvdt1.png"
                                alt="bvdtOne"
                            />
                            <Line className="absolute bg-red-500 h-[666px] inset-y-[0] my-auto right-[0] w-px" />
                        </div>
                        <div className="flex md:flex-col flex-row gap-5 items-start justify-between md:mt-0 mt-[326px] w-[55%] md:w-full">
                            <div className="flex flex-col gap-[19px] items-center justify-start w-[17%] md:w-full">
                                <div className="flex flex-col items-center justify-start w-full">
                                    <Text className="font-bold text-[22px] text-center sm:text-lg text-red-500 md:text-xl">Number</Text>
                                    <Line className="bg-red-500 h-px mt-1 w-full" />
                                </div>
                                <div className="flex flex-col gap-[18px] items-start justify-start">
                                    <Text className="font-bold text-center text-lg text-red-500">1</Text>
                                    <Text className="text-center text-lg text-red-500">2</Text>
                                    <Text className="text-center text-lg text-red-500">4</Text>
                                    <Text className="text-center text-lg text-red-500">6</Text>
                                </div>
                            </div>
                            <div className="flex flex-col gap-[18px] items-center justify-start w-[26%] md:w-full">
                                <Input
                                    name="group39736"
                                    placeholder="Flour"
                                    className="font-bold leading-[normal] md:text-xl p-0 placeholder:text-red-500 sm:px-5 sm:text-lg text-[22px] text-center text-red-500 w-full"
                                    wrapClassName="border-b border-red-500 pb-[5px] px-[35px] w-full"
                                ></Input>
                                <div className="flex flex-col gap-5 items-center justify-start">
                                    <Text className="font-bold text-center text-lg text-red-500">Chocolate</Text>
                                    <Text className="text-center text-lg text-red-500">Orgirinal</Text>
                                </div>
                            </div>
                            <div className="flex flex-col gap-[18px] items-center justify-start w-[26%] md:w-full">
                                <Input
                                    name="group39737"
                                    placeholder="Flavor"
                                    className="font-bold leading-[normal] md:text-xl p-0 placeholder:text-red-500 sm:px-5 sm:text-lg text-[22px] text-center text-red-500 w-full"
                                    wrapClassName="border-b border-red-500 pb-[5px] px-[35px] w-full"
                                ></Input>
                                <div className="flex flex-col items-center justify-start">
                                    <Text className="font-bold text-center text-lg text-red-500">Chocolate</Text>
                                    <Text className="mt-[19px] text-center text-lg text-red-500">Butter</Text>
                                    <Text className="mt-5 text-center text-lg text-red-500">Blueberry</Text>
                                    <Text className="mt-[17px] text-center text-lg text-red-500">Matcha</Text>
                                </div>
                            </div>
                            <div className="flex flex-col items-center justify-start w-[26%] md:w-full">
                                <Input
                                    name="group39738"
                                    placeholder="Topping"
                                    className="font-bold leading-[normal] md:text-xl p-0 placeholder:text-red-500 sm:px-5 sm:text-lg text-[22px] text-center text-red-500 w-full"
                                    wrapClassName="border-b border-red-500 pb-1 px-[35px] w-full"
                                ></Input>
                                <Text className="font-bold mt-5 text-center text-lg text-red-500">Strawberry</Text>
                                <Text className="mt-[19px] text-center text-lg text-red-500">Sweet nuggets</Text>
                                <Text className="mt-[18px] text-center text-lg text-red-500">Chocolate chips</Text>
                                <Text className="mt-[18px] text-center text-lg text-red-500">Marshmallow</Text>
                                <Text className="mt-5 text-center text-lg text-red-500">Candy</Text>
                            </div>
                        </div>
                    </div>
                    <div className="absolute bottom-[3%] flex flex-col items-center justify-start right-[18%] w-[24%]">
                        <Text className="font-extrabold font-monumentextended sm:text-[39px] md:text-[45px] text-[53px] text-center text-red-500">
                            CUSCAKE
                        </Text>
                        <Text className="font-sfmono italic mt-0.5 text-center text-lg text-red-500">100.000 VNĐ</Text>
                        <Img className="h-[122px] mt-[39px] w-[122px]" src="images/img_frame393.svg" alt="frame393" />
                        <div className="flex flex-row font-sfmono gap-5 items-center justify-between mt-[302px] w-full">
                            <Button className="bg-orange-50 border border-indigo-900 border-solid cursor-pointer leading-[normal] min-w-[193px] py-3.5 rounded-[5px] text-center text-indigo-900 text-lg">
                                pay now
                            </Button>
                            <Text className="italic text-center text-red-500 text-sm underline">Is this a gift?</Text>
                        </div>
                    </div>
                    <div className="absolute flex flex-col inset-x-[0] items-center justify-start mx-auto top-[0] w-full">
                        <div className="bg-orange-50 flex flex-col items-center justify-start p-[27px] sm:px-5 shadow-bs w-full">
                            <SignHeader className="flex flex-col items-center justify-start mb-0.5 w-[6%] md:w-full" />
                        </div>
                        <Line className="bg-red-500 h-px w-full" />
                    </div>
                </div>
                <Chat />
                <Footer className="bg-orange-50 flex items-center justify-center md:px-5 w-full" />
            </div>
        </>
    );
};

export default Cuscake;
