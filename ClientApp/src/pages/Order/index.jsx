import React, { useEffect, useState } from "react";

import { useSnackbar } from "notistack";
import { handleSectionNavigation } from "utils";
import OrderApi from "apis/services/Order";

import { Button, Img, Input, Line, Text } from "components";
import Navbar from "components/Navbar";
import Chat from "components/Chat";
import Footer from "components/Footer";

const Order = () => {
    const [confirms, setConfirms] = useState([]);
    const [makings, setMakings] = useState([]);
    const [deliveries, setDeliveries] = useState([]);
    const [histories, setHistories] = useState([]);
    const [selected, setSelected] = useState(1);

    const buttonClassSelected = "bg-red-500 border-teal-100 text-orange-50";
    const buttonClassDefault = "bg-orange-50 border-red-500 text-red-500";
    const animationHide = "opacity-0 h-0";
    const animationShow = "opacity-1 h-[235px]";
    const animationLineShow = "opacity-1 h-[234px]";
    const animationTextShow = "opacity-1";

    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        handleSectionNavigation("order", 117);
    }, []);

    useEffect(() => {
        const loadOrder = async () => {
            try {
                let order = []
                let accountId = JSON.parse(localStorage.getItem("userInfo")).id

                order = await OrderApi.getOrders({
                    accountId,
                    status: "Pending",
                    subStatus: "Confirmed"
                });

                setConfirms(order);

                order = await OrderApi.getOrders({
                    accountId,
                    status: "Making"
                })

                setMakings(order);

                order = await OrderApi.getOrders({
                    accountId,
                    status: "Delivering",
                    subStatus: "Delivered"
                })

                setDeliveries(order);

                order = await OrderApi.getOrders({
                    accountId,
                    status: "Completed"
                })

                setHistories(order);
            } catch (error) {
                enqueueSnackbar("Could not load order", { variant: "error" });
            }
        }
    }, [])

    const noOrder = (id) => {
        return (
            <Text className={`transition-all duration-200 ${selected === id ? animationTextShow : animationHide} font-sfmono text-lg text-red-500`}>• There are currently no orders •</Text>
        );
    }

    const confirm = () => {
        if (confirms.length !== 0) {
            return (
                <div className={`transition-all duration-200 ${selected === 1 ? animationShow : animationHide} bg-orange-50 border border-red-500 border-solid flex flex-col items-center justify-start max-w-[1298px] mx-auto md:px-5 rounded-[5px] w-full`}>
                    <div className="flex md:flex-col flex-row md:gap-5 items-start justify-end w-full">
                        <Img
                            className={`transition-all duration-200 ${selected === 1 ? animationShow : animationHide} md:h-auto object-cover rounded-bl-[5px] rounded-tl-[5px] w-[235px]`}
                            src="images/img_cake_sell.png"
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
                        <Line className={`transition-all duration-200 ${selected === 1 ? animationLineShow : animationHide} bg-red-500 md:h-px md:ml-[0] ml-[51px] md:w-full w-px`} />
                        <div className="flex flex-col md:gap-10 gap-[82px] items-start justify-start md:ml-[0] ml-[19px] mr-auto md:mt-0 mt-[42px] w-[32%] md:w-full">
                            <div className="flex flex-row gap-[147px] items-center justify-start w-[93%] md:w-full">
                                <Text className="font-bold text-[22px] sm:text-lg text-red-500 md:text-xl">Total:</Text>
                                <Text className="font-bold text-[22px] sm:text-lg text-red-500 text-right md:text-xl">
                                    100.000 VNĐ
                                </Text>
                            </div>
                            <div className="flex sm:flex-col flex-row gap-5 items-center justify-between w-full">
                                <Button
                                    className="bg-orange-50 hover:bg-indigo-900 border border-indigo-900 hover:border-teal-100 border-solid cursor-pointer leading-[normal] min-w-[193px] py-3.5 rounded-[5px] text-center text-indigo-900 hover:text-orange-50 text-lg"
                                >
                                    contact
                                </Button>
                                <Button
                                    className="bg-orange-50 hover:bg-red-500 border border-red-500 hover:border-teal-100 border-solid cursor-pointer leading-[normal] min-w-[193px] py-3.5 rounded-[5px] text-center text-lg text-red-500 hover:text-orange-50"
                                >
                                    cancel order
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }

        return noOrder(1);
    }

    const making = () => {
        if (makings.length !== 0) {
            return (
                <div className={`transition-all duration-200 ${selected === 2 ? animationShow : animationHide} bg-orange-50 border border-red-500 border-solid flex flex-col items-center justify-start max-w-[1298px] mx-auto md:px-5 rounded-[5px] w-full`}>
                    <div className="flex md:flex-col flex-row md:gap-5 items-start justify-end w-full">
                        <Img
                            className={`transition-all duration-200 ${selected === 2 ? animationShow : animationHide} md:h-auto object-cover rounded-bl-[5px] rounded-tl-[5px] w-[235px]`}
                            src="images/img_cake_sell.png"
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
                        <Line className={`transition-all duration-200 ${selected === 2 ? animationLineShow : animationHide} bg-red-500 md:h-px md:ml-[0] ml-[51px] md:w-full w-px`} />
                        <div className="flex flex-col md:gap-10 gap-[82px] items-start justify-start md:ml-[0] ml-[19px] mr-auto md:mt-0 mt-[42px] w-[32%] md:w-full">
                            <div className="flex flex-row gap-[147px] items-center justify-start w-[93%] md:w-full">
                                <Text className="font-bold text-[22px] sm:text-lg text-red-500 md:text-xl">Total:</Text>
                                <Text className="font-bold text-[22px] sm:text-lg text-red-500 text-right md:text-xl">
                                    100.000 VNĐ
                                </Text>
                            </div>
                            <div className="flex sm:flex-col flex-row gap-5 items-center justify-between w-full">
                                <Button
                                    className="z-10 bg-orange-50 hover:bg-indigo-900 border border-indigo-900 hover:border-teal-100 border-solid cursor-pointer leading-[normal] min-w-[406px] py-3.5 rounded-[5px] text-center text-indigo-900 hover:text-orange-50 text-lg"
                                >
                                    contact
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }

        return noOrder(2);
    }

    const delivery = () => {
        if (deliveries.length !== 0) {
            return (
                <div className="flex flex-col gap-5 w-full">
                    <div className={`transition-all duration-200 ${selected === 3 ? animationShow : animationHide} bg-orange-50 border border-red-500 border-solid flex flex-col items-center justify-start max-w-[1298px] mx-auto md:px-5 rounded-[5px] w-full`}>
                        <div className="flex md:flex-col flex-row md:gap-5 items-start justify-end w-full">
                            <Img
                                className={`transition-all duration-200 ${selected === 3 ? animationShow : animationHide} md:h-auto object-cover rounded-bl-[5px] rounded-tl-[5px] w-[235px]`}
                                src="images/img_cake_sell.png"
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
                            <Line className={`transition-all duration-200 ${selected === 3 ? animationLineShow : animationHide} bg-red-500 md:h-px md:ml-[0] ml-[51px] md:w-full w-px`} />
                            <div className="flex flex-col md:gap-10 gap-[82px] items-start justify-start md:ml-[0] ml-[19px] mr-auto md:mt-0 mt-[42px] w-[32%] md:w-full">
                                <div className="flex flex-row gap-[147px] items-center justify-start w-[93%] md:w-full">
                                    <Text className="font-bold text-[22px] sm:text-lg text-red-500 md:text-xl">Total:</Text>
                                    <Text className="font-bold text-[22px] sm:text-lg text-red-500 text-right md:text-xl">
                                        100.000 VNĐ
                                    </Text>
                                </div>
                                <div className="flex sm:flex-col flex-row gap-5 items-center justify-between w-full">
                                    <Button
                                        className="z-20 bg-orange-50 hover:bg-indigo-900 border border-indigo-900 hover:border-teal-100 border-solid cursor-pointer leading-[normal] min-w-[406px] py-3.5 rounded-[5px] text-center text-indigo-900 hover:text-orange-50 text-lg"
                                    >
                                        contact
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={`transition-all duration-200 ${selected === 3 ? animationShow : animationHide} bg-orange-50 border border-red-500 border-solid flex flex-col items-center justify-start max-w-[1298px] mx-auto md:px-5 rounded-[5px] w-full`}>
                        <div className="flex md:flex-col flex-row md:gap-5 items-start justify-end w-full">
                            <Img
                                className={`transition-all duration-200 ${selected === 3 ? animationShow : animationHide} md:h-auto object-cover rounded-bl-[5px] rounded-tl-[5px] w-[235px]`}
                                src="images/img_cake_sell.png"
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
                            <Line className={`transition-all duration-200 ${selected === 3 ? animationLineShow : animationHide} bg-red-500 md:h-px md:ml-[0] ml-[51px] md:w-full w-px`} />
                            <div className="flex flex-col md:gap-10 gap-[82px] items-start justify-start md:ml-[0] ml-[19px] mr-auto md:mt-0 mt-[42px] w-[32%] md:w-full">
                                <div className="flex flex-row gap-[147px] items-center justify-start w-[93%] md:w-full">
                                    <Text className="font-bold text-[22px] sm:text-lg text-red-500 md:text-xl">Total:</Text>
                                    <Text className="font-bold text-[22px] sm:text-lg text-red-500 text-right md:text-xl">
                                        100.000 VNĐ
                                    </Text>
                                </div>
                                <div className="flex sm:flex-col flex-row gap-5 items-center justify-between w-full">
                                    <Button
                                        className="z-20 bg-orange-50 hover:bg-indigo-900 border border-indigo-900 hover:border-teal-100 border-solid cursor-pointer leading-[normal] min-w-[193px] py-3.5 rounded-[5px] text-center text-indigo-900 hover:text-orange-50 text-lg"
                                    >
                                        review
                                    </Button>
                                    <Button
                                        className="z-20 bg-orange-50 hover:bg-red-500 border border-red-500 hover:border-teal-100 border-solid cursor-pointer leading-[normal] min-w-[193px] py-3.5 rounded-[5px] text-center text-lg text-red-500 hover:text-orange-50"
                                    >
                                        repurchase
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }

        return noOrder(3);
    }

    const history = () => {
        if (histories.length !== 0) {
            return (
                <div className={`transition-all duration-200 ${selected === 4 ? animationShow : animationHide} bg-orange-50 border border-red-500 border-solid flex flex-col items-center justify-start max-w-[1298px] mx-auto md:px-5 rounded-[5px] w-full`}>
                    <div className="flex md:flex-col flex-row md:gap-5 items-start justify-end w-full">
                        <Img
                            className={`transition-all duration-200 ${selected === 4 ? animationShow : animationHide} md:h-auto object-cover rounded-bl-[5px] rounded-tl-[5px] w-[235px]`}
                            src="images/img_cake_sell.png"
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
                        <Line className={`transition-all duration-200 ${selected === 4 ? animationLineShow : animationHide} bg-red-500 md:h-px md:ml-[0] ml-[51px] md:w-full w-px`} />
                        <div className="flex flex-col md:gap-10 gap-[82px] items-start justify-start md:ml-[0] ml-[19px] mr-auto md:mt-0 mt-[42px] w-[32%] md:w-full">
                            <div className="flex flex-row gap-[147px] items-center justify-start w-[93%] md:w-full">
                                <Text className="font-bold text-[22px] sm:text-lg text-red-500 md:text-xl">Total:</Text>
                                <Text className="font-bold text-[22px] sm:text-lg text-red-500 text-right md:text-xl">
                                    100.000 VNĐ
                                </Text>
                            </div>
                            <div className="flex sm:flex-col flex-row gap-5 items-center justify-between w-full">
                                <Button
                                    className="z-30 bg-orange-50 hover:bg-indigo-900 border border-indigo-900 hover:border-teal-100 border-solid cursor-pointer leading-[normal] min-w-[406px] py-3.5 rounded-[5px] text-center text-indigo-900 hover:text-orange-50 text-lg"
                                >
                                    repurchase
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }

        return noOrder(4);
    }

    return (
        <>
            <div className="bg-orange-50 flex flex-col font-sfmono items-center justify-start mx-auto w-full">
                <div className="flex flex-col items-center justify-start w-full">
                    <Navbar className="bg-orange-50 flex flex-row font-sfmono items-center justify-start p-[27px] sm:px-5 shadow-bs w-full" />
                    <div className="h-[665px] mt-navbar md:px-5 relative w-full">
                        <Img className="h-[665px] m-auto object-cover w-full" src="images/img_header.png" alt="imgHeader" />
                        <Line className="absolute bg-red-500 h-px inset-x-[0] mx-auto top-[0] w-full" />
                    </div>
                    <Line id="order" className="bg-red-500 h-px w-full" />
                    <div className="flex-wrap md:gap-10 gap-[122px] grid sm:grid-cols-1 md:grid-cols-2 grid-cols-4 items-center justify-between max-w-[1298px] mt-[18px] mx-auto md:px-5 w-full">
                        <Button
                            className={`${selected === 1 ? buttonClassSelected : buttonClassDefault} hover:bg-red-500 border hover:border-teal-100 border-solid cursor-pointer flex-1 leading-[normal] min-w-[233px] py-4 rounded-[5px] text-[22px] text-center sm:text-lg hover:text-orange-50 md:text-xl w-full`}
                            onClick={() => setSelected(1)}
                        >
                            Confirm
                        </Button>
                        <Button
                            className={`${selected === 2 ? buttonClassSelected : buttonClassDefault} hover:bg-red-500 border hover:border-teal-100 border-solid cursor-pointer flex-1 leading-[normal] min-w-[233px] py-4 rounded-[5px] text-[22px] text-center sm:text-lg hover:text-orange-50 md:text-xl w-full`}
                            onClick={() => setSelected(2)}
                        >
                            Making CUPCAKE
                        </Button>
                        <Button
                            className={`${selected === 3 ? buttonClassSelected : buttonClassDefault} hover:bg-red-500 border hover:border-teal-100 border-solid cursor-pointer flex-1 leading-[normal] min-w-[233px] py-4 rounded-[5px] text-[22px] text-center sm:text-lg hover:text-orange-50 md:text-xl w-full`}
                            onClick={() => setSelected(3)}
                        >
                            Delivery
                        </Button>
                        <Button
                            className={`${selected === 4 ? buttonClassSelected : buttonClassDefault} hover:bg-red-500 border hover:border-teal-100 border-solid cursor-pointer flex-1 leading-[normal] min-w-[233px] py-4 rounded-[5px] text-[22px] text-center sm:text-lg hover:text-orange-50 md:text-xl w-full`}
                            onClick={() => setSelected(4)}
                        >
                            History
                        </Button>
                    </div>
                    <Input
                        name="group100"
                        placeholder="Search..."
                        className="italic leading-[normal] p-0 placeholder:text-red-500_87 sm:pr-5 text-left text-red-500_87 text-sm w-full"
                        wrapClassName="bg-red-500_63 flex mt-5 mb-5 pl-5 pr-[35px] py-1 rounded-[5px] w-[91%]"
                        prefix={<Img className="h-[51px] mr-5 my-auto" src="images/img_search.svg" alt="search" />}
                    ></Input>

                    {confirm()}
                    {making()}
                    {delivery()}
                    {history()}

                    <Chat />
                    <Footer className="bg-orange-50 flex items-center justify-center mt-[100px] md:px-5 w-full" />
                </div>
            </div >
        </>
    );
};

export default Order;
