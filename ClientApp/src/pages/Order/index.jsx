import React from "react";

import { Button, Img, Input, Line, Text } from "components";
import Navbar from "components/Navbar";
import Chat from "components/Chat";
import Footer from "components/Footer";

const Order = () => {
    return (
        <>
            <div className="bg-orange-50 flex flex-col font-sfmono items-center justify-start mx-auto w-full">
                <div className="flex flex-col items-center justify-start w-full">
                    <Navbar className="bg-orange-50 flex flex-row font-sfmono items-center justify-start p-[27px] sm:px-5 shadow-bs w-full" />
                    <div className="h-[665px] mt-navbar md:px-5 relative w-full">
                        <Img className="h-[665px] m-auto object-cover w-full" src="images/img_picture1.png" alt="pictureOne" />
                        <Line className="absolute bg-red-500 h-px inset-x-[0] mx-auto top-[0] w-full" />
                    </div>
                    <Line className="bg-red-500 h-px w-full" />
                    <div className="flex-wrap md:gap-10 gap-[122px] grid sm:grid-cols-1 md:grid-cols-2 grid-cols-4 items-center justify-between max-w-[1298px] mt-[18px] mx-auto md:px-5 w-full">
                        <Button className="bg-red-500 cursor-pointer flex-1 font-bold leading-[normal] min-w-[233px] py-4 rounded-[5px] text-[22px] text-center sm:text-lg text-orange-50 md:text-xl w-full">
                            Confirm
                        </Button>
                        <Button className="bg-orange-50 border border-red-500 border-solid cursor-pointer flex-1 leading-[normal] min-w-[233px] py-4 rounded-[5px] text-[22px] text-center sm:text-lg text-red-500 md:text-xl w-full">
                            Making CUPCAKE
                        </Button>
                        <Button className="bg-orange-50 border border-red-500 border-solid cursor-pointer flex-1 leading-[normal] min-w-[233px] py-4 rounded-[5px] text-[22px] text-center sm:text-lg text-red-500 md:text-xl w-full">
                            Delivery
                        </Button>
                        <Button className="bg-orange-50 border border-red-500 border-solid cursor-pointer flex-1 leading-[normal] min-w-[233px] py-4 rounded-[5px] text-[22px] text-center sm:text-lg text-red-500 md:text-xl w-full">
                            History
                        </Button>
                    </div>
                    <Input
                        name="group100"
                        placeholder="Search..."
                        className="italic leading-[normal] p-0 placeholder:text-red-500_87 sm:pr-5 text-left text-red-500_87 text-sm w-full"
                        wrapClassName="bg-red-500_63 flex mt-5 pl-5 pr-[35px] py-1 rounded-[5px] w-[91%]"
                        prefix={<Img className="h-[51px] mr-5 my-auto" src="images/img_volume.svg" alt="volume" />}
                    ></Input>
                    <div className="bg-orange-50 border border-red-500 border-solid flex flex-col items-center justify-start max-w-[1298px] mt-5 mx-auto md:px-5 rounded-[5px] w-full">
                        <div className="flex md:flex-col flex-row md:gap-5 items-start justify-end w-[99%] md:w-full">
                            <Img
                                className="h-[235px] md:h-auto object-cover rounded-bl-[5px] rounded-tl-[5px] w-[235px]"
                                src="images/img_picture11_235x235.png"
                                alt="pictureEleven"
                            />
                            <div className="flex flex-col items-start justify-start md:ml-[0] ml-[49px] md:mt-0 mt-[30px]">
                                <Text className="font-monumentextended sm:text-[27px] md:text-[29px] text-[31px] text-red-500">
                                    CUSCAKE
                                </Text>
                                <Text className="font-sfmono mt-4 text-lg text-red-500">CUSCAKE Gift Box, 4</Text>
                                <Text className="font-sfmono h-[22px] mt-[13px] text-lg text-red-500">x1</Text>
                            </div>
                            <Text className="md:ml-[0] ml-[183px] md:mt-0 mt-[181px] text-lg text-red-500 text-right">
                                100.000 VNĐ
                            </Text>
                            <Line className="bg-red-500 h-[235px] md:h-px md:ml-[0] ml-[51px] md:w-full w-px" />
                            <div className="flex flex-col md:gap-10 gap-[82px] items-start justify-start md:ml-[0] ml-[19px] md:mt-0 mt-[42px] w-[32%] md:w-full">
                                <div className="flex flex-row gap-[147px] items-center justify-start w-[93%] md:w-full">
                                    <Text className="font-bold text-[22px] sm:text-lg text-red-500 md:text-xl">Total:</Text>
                                    <Text className="font-bold text-[22px] sm:text-lg text-red-500 text-right md:text-xl">
                                        100.000 VNĐ
                                    </Text>
                                </div>
                                <div className="flex sm:flex-col flex-row gap-5 items-center justify-between w-full">
                                    <Button className="bg-orange-50 border border-indigo-900 border-solid cursor-pointer leading-[normal] min-w-[193px] py-3.5 rounded-[5px] text-center text-indigo-900 text-lg">
                                        contact
                                    </Button>
                                    <Button className="bg-orange-50 border border-red-500 border-solid cursor-pointer leading-[normal] min-w-[193px] py-3.5 rounded-[5px] text-center text-lg text-red-500">
                                        cancel order
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-orange-50 border border-red-500 border-solid flex flex-col items-center justify-start max-w-[1298px] mt-5 mx-auto md:px-5 rounded-[5px] w-full">
                        <div className="flex md:flex-col flex-row md:gap-5 items-start justify-end w-[99%] md:w-full">
                            <Img
                                className="h-[235px] md:h-auto object-cover rounded-bl-[5px] rounded-tl-[5px] w-[235px]"
                                src="images/img_picture11_235x235.png"
                                alt="pictureEleven_One"
                            />
                            <div className="flex flex-col gap-[13px] items-start justify-start md:ml-[0] ml-[49px] md:mt-0 mt-8">
                                <Text className="font-monumentextended sm:text-[27px] md:text-[29px] text-[31px] text-red-500">
                                    Milk Cupcake
                                </Text>
                                <Text className="font-sfmono text-lg text-red-500">Milk Cupcake, Gift Box</Text>
                                <Text className="font-sfmono h-[22px] text-lg text-red-500">x1</Text>
                            </div>
                            <Text className="md:ml-[0] ml-[107px] md:mt-0 mt-[181px] text-lg text-red-500 text-right">
                                100.000 VNĐ
                            </Text>
                            <Line className="bg-red-500 h-[235px] md:h-px md:ml-[0] ml-[51px] md:w-full w-px" />
                            <div className="flex flex-col md:gap-10 gap-[82px] items-start justify-start md:ml-[0] ml-[19px] md:mt-0 mt-[42px] w-[32%] md:w-full">
                                <div className="flex flex-row gap-[147px] items-center justify-start w-[93%] md:w-full">
                                    <Text className="font-bold text-[22px] sm:text-lg text-red-500 md:text-xl">Total:</Text>
                                    <Text className="font-bold text-[22px] sm:text-lg text-red-500 text-right md:text-xl">
                                        100.000 VNĐ
                                    </Text>
                                </div>
                                <div className="flex sm:flex-col flex-row gap-5 items-center justify-between w-full">
                                    <Button className="bg-orange-50 border border-indigo-900 border-solid cursor-pointer leading-[normal] min-w-[193px] py-3.5 rounded-[5px] text-center text-indigo-900 text-lg">
                                        contact
                                    </Button>
                                    <Button className="bg-orange-50 border border-red-500 border-solid cursor-pointer leading-[normal] min-w-[193px] py-3.5 rounded-[5px] text-center text-lg text-red-500">
                                        cancel order
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-orange-50 border border-red-500 border-solid flex flex-col items-center justify-start max-w-[1298px] mt-5 mx-auto md:px-5 rounded-[5px] w-full">
                        <div className="flex md:flex-col flex-row md:gap-5 items-start justify-end w-[99%] md:w-full">
                            <Img
                                className="h-[235px] md:h-auto object-cover rounded-bl-[5px] rounded-tl-[5px] w-[235px]"
                                src="images/img_picture11_235x235.png"
                                alt="pictureEleven_Two"
                            />
                            <div className="flex flex-col items-start justify-start md:ml-[0] ml-[49px] md:mt-0 mt-[30px]">
                                <Text className="font-monumentextended sm:text-[27px] md:text-[29px] text-[31px] text-red-500">
                                    CUSCAKE
                                </Text>
                                <Text className="font-sfmono mt-4 text-lg text-red-500">CUSCAKE Gift Box, 4</Text>
                                <Text className="font-sfmono h-[22px] mt-[13px] text-lg text-red-500">x1</Text>
                            </div>
                            <Text className="md:ml-[0] ml-[183px] md:mt-0 mt-[181px] text-lg text-red-500 text-right">
                                100.000 VNĐ
                            </Text>
                            <Line className="bg-red-500 h-[235px] md:h-px md:ml-[0] ml-[51px] md:w-full w-px" />
                            <div className="flex flex-col md:gap-10 gap-[82px] items-start justify-start md:ml-[0] ml-[19px] md:mt-0 mt-[42px] w-[32%] md:w-full">
                                <div className="flex flex-row gap-[147px] items-center justify-start w-[93%] md:w-full">
                                    <Text className="font-bold text-[22px] sm:text-lg text-red-500 md:text-xl">Total:</Text>
                                    <Text className="font-bold text-[22px] sm:text-lg text-red-500 text-right md:text-xl">
                                        100.000 VNĐ
                                    </Text>
                                </div>
                                <div className="flex sm:flex-col flex-row gap-5 items-center justify-between w-full">
                                    <Button className="bg-orange-50 border border-indigo-900 border-solid cursor-pointer leading-[normal] min-w-[193px] py-3.5 rounded-[5px] text-center text-indigo-900 text-lg">
                                        contact
                                    </Button>
                                    <Button className="bg-orange-50 border border-red-500 border-solid cursor-pointer leading-[normal] min-w-[193px] py-3.5 rounded-[5px] text-center text-lg text-red-500">
                                        cancel order
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-orange-50 border border-red-500 border-solid flex flex-col items-center justify-start max-w-[1298px] mt-5 mx-auto md:px-5 rounded-[5px] w-full">
                        <div className="flex md:flex-col flex-row md:gap-5 items-start justify-end w-[99%] md:w-full">
                            <Img
                                className="h-[235px] md:h-auto object-cover rounded-bl-[5px] rounded-tl-[5px] w-[235px]"
                                src="images/img_picture11_235x235.png"
                                alt="pictureEleven_Three"
                            />
                            <div className="flex flex-col gap-[13px] items-start justify-start md:ml-[0] ml-[49px] md:mt-0 mt-8">
                                <Text className="font-monumentextended sm:text-[27px] md:text-[29px] text-[31px] text-red-500">
                                    Milk Cupcake
                                </Text>
                                <Text className="font-sfmono text-lg text-red-500">Milk Cupcake, Gift Box</Text>
                                <Text className="font-sfmono h-[22px] text-lg text-red-500">x1</Text>
                            </div>
                            <Text className="md:ml-[0] ml-[107px] md:mt-0 mt-[181px] text-lg text-red-500 text-right">
                                100.000 VNĐ
                            </Text>
                            <Line className="bg-red-500 h-[235px] md:h-px md:ml-[0] ml-[51px] md:w-full w-px" />
                            <div className="flex flex-col md:gap-10 gap-[82px] items-start justify-start md:ml-[0] ml-[19px] md:mt-0 mt-[42px] w-[32%] md:w-full">
                                <div className="flex flex-row gap-[147px] items-center justify-start w-[93%] md:w-full">
                                    <Text className="font-bold text-[22px] sm:text-lg text-red-500 md:text-xl">Total:</Text>
                                    <Text className="font-bold text-[22px] sm:text-lg text-red-500 text-right md:text-xl">
                                        100.000 VNĐ
                                    </Text>
                                </div>
                                <div className="flex sm:flex-col flex-row gap-5 items-center justify-between w-full">
                                    <Button className="bg-orange-50 border border-indigo-900 border-solid cursor-pointer leading-[normal] min-w-[193px] py-3.5 rounded-[5px] text-center text-indigo-900 text-lg">
                                        contact
                                    </Button>
                                    <Button className="bg-orange-50 border border-red-500 border-solid cursor-pointer leading-[normal] min-w-[193px] py-3.5 rounded-[5px] text-center text-lg text-red-500">
                                        cancel order
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-orange-50 border border-red-500 border-solid flex flex-col items-center justify-start max-w-[1298px] mt-5 mx-auto md:px-5 rounded-[5px] w-full">
                        <div className="flex md:flex-col flex-row md:gap-5 items-start justify-end w-[99%] md:w-full">
                            <Img
                                className="h-[235px] md:h-auto object-cover rounded-bl-[5px] rounded-tl-[5px] w-[235px]"
                                src="images/img_picture11_235x235.png"
                                alt="pictureEleven_Four"
                            />
                            <div className="flex flex-col items-start justify-start md:ml-[0] ml-[49px] md:mt-0 mt-[30px]">
                                <Text className="font-monumentextended sm:text-[27px] md:text-[29px] text-[31px] text-red-500">
                                    CUSCAKE
                                </Text>
                                <Text className="font-sfmono mt-4 text-lg text-red-500">CUSCAKE Gift Box, 4</Text>
                                <Text className="font-sfmono h-[22px] mt-[13px] text-lg text-red-500">x1</Text>
                            </div>
                            <Text className="md:ml-[0] ml-[183px] md:mt-0 mt-[181px] text-lg text-red-500 text-right">
                                100.000 VNĐ
                            </Text>
                            <Line className="bg-red-500 h-[235px] md:h-px md:ml-[0] ml-[51px] md:w-full w-px" />
                            <div className="flex flex-col md:gap-10 gap-[82px] items-start justify-start md:ml-[0] ml-[19px] md:mt-0 mt-[42px] w-[32%] md:w-full">
                                <div className="flex flex-row gap-[147px] items-center justify-start w-[93%] md:w-full">
                                    <Text className="font-bold text-[22px] sm:text-lg text-red-500 md:text-xl">Total:</Text>
                                    <Text className="font-bold text-[22px] sm:text-lg text-red-500 text-right md:text-xl">
                                        100.000 VNĐ
                                    </Text>
                                </div>
                                <div className="flex sm:flex-col flex-row gap-5 items-center justify-between w-full">
                                    <Button className="bg-orange-50 border border-indigo-900 border-solid cursor-pointer leading-[normal] min-w-[193px] py-3.5 rounded-[5px] text-center text-indigo-900 text-lg">
                                        contact
                                    </Button>
                                    <Button className="bg-orange-50 border border-red-500 border-solid cursor-pointer leading-[normal] min-w-[193px] py-3.5 rounded-[5px] text-center text-lg text-red-500">
                                        cancel order
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex h-[235px] sm:h-[255px] md:h-[817px] justify-end max-w-[1298px] mt-5 mx-auto md:px-5 relative w-full">
                        <Text className="mb-6 ml-auto mr-[50px] mt-auto text-[22px] sm:text-lg text-red-500 text-right md:text-xl">
                            100.000 VNĐ
                        </Text>
                        <div className="absolute bg-orange-50 border border-red-500 border-solid flex flex-col h-full inset-[0] items-center justify-center m-auto rounded-[5px] w-full">
                            <div className="flex md:flex-col flex-row md:gap-5 items-start justify-end w-[99%] md:w-full">
                                <Img
                                    className="h-[235px] md:h-auto object-cover rounded-bl-[5px] rounded-tl-[5px] w-[235px]"
                                    src="images/img_picture11_235x235.png"
                                    alt="pictureEleven_Five"
                                />
                                <div className="flex flex-col gap-[13px] items-start justify-start md:ml-[0] ml-[49px] md:mt-0 mt-8">
                                    <Text className="font-monumentextended sm:text-[27px] md:text-[29px] text-[31px] text-red-500">
                                        Milk Cupcake
                                    </Text>
                                    <Text className="font-sfmono text-lg text-red-500">Milk Cupcake, Gift Box</Text>
                                    <Text className="font-sfmono h-[22px] text-lg text-red-500">x1</Text>
                                </div>
                                <Text className="md:ml-[0] ml-[107px] md:mt-0 mt-[181px] text-lg text-red-500 text-right">
                                    100.000 VNĐ
                                </Text>
                                <Line className="bg-red-500 h-[235px] md:h-px md:ml-[0] ml-[51px] md:w-full w-px" />
                                <div className="flex flex-col md:gap-10 gap-[82px] items-start justify-start md:ml-[0] ml-[19px] md:mt-0 mt-[42px] w-[32%] md:w-full">
                                    <div className="flex flex-row gap-[147px] items-center justify-start w-[93%] md:w-full">
                                        <Text className="font-bold text-[22px] sm:text-lg text-red-500 md:text-xl">Total:</Text>
                                        <Text className="font-bold text-[22px] sm:text-lg text-red-500 text-right md:text-xl">
                                            100.000 VNĐ
                                        </Text>
                                    </div>
                                    <div className="flex sm:flex-col flex-row gap-5 items-center justify-between w-full">
                                        <Button className="bg-orange-50 border border-indigo-900 border-solid cursor-pointer leading-[normal] min-w-[193px] py-3.5 rounded-[5px] text-center text-indigo-900 text-lg">
                                            contact
                                        </Button>
                                        <Button className="bg-orange-50 border border-red-500 border-solid cursor-pointer leading-[normal] min-w-[193px] py-3.5 rounded-[5px] text-center text-lg text-red-500">
                                            cancel order
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Chat />
                    <Footer className="bg-orange-50 flex items-center justify-center mt-[100px] md:px-5 w-full" />
                </div>
            </div>
        </>
    );
};

export default Order;
