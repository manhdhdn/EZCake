import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import { handleSectionNavigation } from "utils";
import OrderApi from "apis/services/Order";
import MoMo from "apis/momo/MoMo";

import { Button, Img, Input, Line, Text } from "../../components";
import SignHeader from "components/SignHeader";
import Chat from "components/Chat";
import Footer from "../../components/Footer";
import QRCodeWithIcon from "components/QrCode";

const Payment = () => {
    const [order, setOrder] = useState(null);
    const [qrCodeUrl, setQrCodeUrl] = useState(null);

    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        handleSectionNavigation("payment", 0);
    }, []);

    useEffect(() => {
        let price = 0;
        let checkPaymentBody = null;
        let qrCreated = false;

        const loadOrder = async () => {
            try {
                const order = await OrderApi.getOrder(window.location.pathname.split("/").pop());

                order.orderDetails.forEach(element => {
                    price += element.price;
                });

                setOrder(order);
                checkPaymentBody = await MoMo.createRequest(price);
                setQrCodeUrl(checkPaymentBody.qrCodeUrl);
                qrCreated = true;
            } catch (error) {
                enqueueSnackbar(error.message, { variant: "error" });
            }
        }

        loadOrder();

        const intervalId = qrCreated && setInterval(async () => {
            let status = await MoMo.checkPayment(checkPaymentBody);

            if (status === 0) {
                navigate("/order");
            }
        }, 1000);

        return () => {
            clearInterval(intervalId);
        }

        // eslint-disable-next-line
    }, [])

    return (
        <>
            <div className="bg-orange-50 flex flex-col font-sfmono items-center justify-start mx-auto w-full">
                <div className="flex flex-col md:gap-10 gap-[97px] items-center justify-start w-full">
                    <div className="flex flex-col items-center justify-start w-full">
                        <div className="bg-orange-50 flex flex-col items-center justify-start p-[27px] sm:px-5 shadow-bs w-full">
                            <SignHeader className="flex flex-col items-center justify-start mb-0.5 md:px-5 w-[6%] md:w-full" />
                        </div>
                        <Line id="payment" className="bg-red-500 h-px w-full" />
                    </div>
                    <div className="flex md:flex-col flex-row md:gap-[50px] items-center justify-between max-w-[1348px] mx-auto md:px-5 w-full">
                        <div className="flex md:flex-1 flex-col items-start justify-start w-[55%] md:w-full">
                            <Text className="font-monumentextended sm:text-[27px] md:text-[29px] text-[31px] text-red-500">
                                Shipping Information
                            </Text>
                            <div className="flex flex-col font-sfmono gap-2.5 items-start justify-start mt-[22px] w-full">
                                <div className="flex flex-col gap-[5px] items-start justify-start w-full">
                                    <Text className="text-red-500 text-sm">Full name:</Text>
                                    <Input
                                        name="name"
                                        className="leading-[normal] p-0 placeholder:text-red-500 sm:pr-5 text-left text-lg text-red-500 w-full"
                                        wrapClassName="bg-orange-50 border border-red-500 border-solid pb-[17px] pl-5 pr-[35px] pt-5 rounded-[5px] w-full"
                                        type="name"
                                        defaultValue={order && order.shippingInformation.name}
                                    ></Input>
                                </div>
                                <div className="flex flex-col gap-[5px] items-start justify-start w-full">
                                    <Text className="text-red-500 text-sm">Phone number:</Text>
                                    <Input
                                        name="mobileNo"
                                        className="leading-[normal] p-0 placeholder:text-red-500 sm:pr-5 text-left text-lg text-red-500 w-full"
                                        wrapClassName="bg-orange-50 border border-red-500 border-solid pl-5 pr-[35px] py-[18px] rounded-[5px] w-full"
                                        type="number"
                                        defaultValue={order && order.shippingInformation.phoneNumber}
                                    ></Input>
                                </div>
                                <div className="flex flex-col gap-[5px] items-start justify-start w-full">
                                    <Text className="text-red-500 text-sm">Address:</Text>
                                    <Input
                                        name="address"
                                        className="leading-[normal] p-0 placeholder:text-red-500 sm:pr-5 text-left text-lg text-red-500 w-full"
                                        wrapClassName="bg-orange-50 border border-red-500 border-solid pl-5 pr-[35px] py-[36px] rounded-[5px] w-full"
                                        type="address"
                                        defaultValue={order && order.shippingInformation.address}
                                    ></Input>
                                </div>
                                <Text className="italic text-red-500 text-sm underline">Review your note</Text>
                            </div>
                            <Button className="bg-orange-50 hover:bg-red-500 border border-red-500 hover:border-teal-100 border-solid cursor-pointer font-sfmono leading-[normal] min-w-[193px] md:ml-[0] ml-[268px] mt-6 py-3.5 rounded-[5px] text-center text-lg text-red-500 hover:text-orange-50">
                                done
                            </Button>
                        </div>
                        <div className="flex md:flex-1 flex-col gap-[18px] items-start justify-start w-[43%] md:w-full">
                            <div className="flex sm:flex-col flex-row gap-[50px] items-center justify-start w-full">
                                <Img
                                    className="h-[233px] md:h-auto object-cover w-[233px]"
                                    src="images/img_cake_box.png"
                                    alt="rectangle28155"
                                />
                                <QRCodeWithIcon value={qrCodeUrl} />
                            </div>
                            <div className="flex sm:flex-col flex-row sm:gap-10 items-start justify-between w-full">
                                <div className="flex flex-col gap-14 items-start justify-start">
                                    <div className="flex flex-col gap-2 items-start justify-start w-full">
                                        <div className="flex flex-col items-start justify-start w-full">
                                            <Text className="font-monumentextended sm:text-[21px] md:text-[23px] text-[25px] text-red-500">
                                                CUSCAKE
                                            </Text>
                                            <Text className="font-sfmono mt-2 text-lg text-red-500">4 Cake</Text>
                                            <Text className="font-sfmono mt-1 text-lg text-red-500">Gift Box, 4</Text>
                                        </div>
                                        <Text className="italic text-red-500 text-sm underline opacity-0">Edit</Text>
                                    </div>
                                    <div className="flex flex-col items-start justify-start">
                                        <Text className="font-bold text-deep_orange-500 text-lg">Total:</Text>
                                        <Text className="mt-1 text-deep_orange-500 text-lg">120.000 VNĐ</Text>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Chat />
                    <Footer className="bg-orange-50 flex items-center justify-center md:px-5 w-full" />
                </div>
            </div>
        </>
    );
};

export default Payment;
