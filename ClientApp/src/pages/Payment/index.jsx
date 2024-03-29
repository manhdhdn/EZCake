import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import { handleSectionNavigation } from "utils";
import { v4 } from "uuid";
import moment from "moment";
import OrderApi from "apis/services/Order";
import MoMo from "apis/momo/MoMo";
import PaymentApi from "apis/services/Payment";

import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';
import { Backdrop, Skeleton } from "@mui/material";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";
import { Button, Img, Input, Line, Text } from "../../components";
import SignHeader from "components/SignHeader";
import Footer from "../../components/Footer";
import QRCodeWithIcon from "components/QrCode";

const Payment = () => {
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState("");
    const [order, setOrder] = useState(null);
    const [image, setImage] = useState("images/img_cake_box.png");
    const [names, setNames] = useState([]);
    const [cakeSets, setCakeSets] = useState([]);
    const [price, setPrice] = useState(0);
    const [qrCodeUrl, setQrCodeUrl] = useState(null);
    const [checkPaymentBody, setCheckPaymentBody] = useState(null);

    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();

    const HtmlTooltip = styled(({ className, ...props }) => (
        <Tooltip {...props} classes={{ popper: className }} />
    ))(({ theme }) => ({
        [`& .${tooltipClasses.tooltip}`]: {
            backgroundColor: '#fcedda',
            maxWidth: 700,
            fontSize: theme.typography.pxToRem(12),
            border: '1px solid #ee4e34',
        },
    }));

    useEffect(() => {
        handleSectionNavigation("payment", 0);
    }, []);

    useEffect(() => {
        const loadOrder = async () => {
            try {
                let orderId = window.location.pathname.split("/").pop();
                let order = await OrderApi.getOrder(orderId);

                if (order.status !== "Pending" && order.status !== "Cart") {
                    throw new Error("Confirmed");
                }

                setMessage(order.message);
                setImage(order.orderDetails[0].cake.image);

                let names = [];
                let cakeSets = [];
                let price = 0;

                order.orderDetails.forEach((orderDetail) => {
                    if (!names.includes(orderDetail.cake.name)) {
                        names.push(orderDetail.cake.name);
                    }

                    cakeSets.push(JSON.parse(orderDetail.cakeSet));
                    price += orderDetail.price * orderDetail.quantity;
                });

                setOrder(order);
                setNames(names);
                setCakeSets(cakeSets);
                setPrice(price);

                try {
                    let checkPaymentBody = await MoMo.createRequest(price);

                    setCheckPaymentBody(checkPaymentBody);
                    setQrCodeUrl(checkPaymentBody.qrCodeUrl);
                } catch (error) {
                    enqueueSnackbar("QR code could not be generated", { variant: "error" });
                }
            } catch (error) {
                if (error.message === "Confirmed") {
                    enqueueSnackbar("Order already payed", { variant: "info" });
                } else {
                    enqueueSnackbar("Order could not be loaded", { variant: "error" });
                }
            }
        }

        loadOrder();

        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        const intervalId = checkPaymentBody && setInterval(async () => {
            let status = (await MoMo.checkPayment(checkPaymentBody)).resultCode;

            if (status === 0) {
                try {
                    await OrderApi.updateOrder(order.id, {
                        id: order.id,
                        orderDate: moment().format("YYYY-MM-DDTHH:mm:ss"),
                        shippedDate: order.shippedDate,
                        shippingInformationId: order.shippingInformationId,
                        message,
                        status: "Confirmed"
                    });

                    await PaymentApi.createPayment({
                        id: v4(),
                        partnerCode: checkPaymentBody.partnerCode,
                        requestId: checkPaymentBody.requestId,
                        orderId: checkPaymentBody.orderId,
                        signature: checkPaymentBody.signature,
                        lang: checkPaymentBody.lang,
                        orderUni: order.id
                    });

                    enqueueSnackbar("Order successfully payed", { variant: "success" });

                    navigate("/order");
                } catch (error) {
                    enqueueSnackbar("Order could not be updated", { variant: "error" });
                }
            }
        }, 2500);

        return () => {
            clearInterval(intervalId);
        }

        // eslint-disable-next-line
    }, [checkPaymentBody, message]);

    const handleCloseMessage = () => {
        setOpen(false);
    }

    const handleOpenMessage = () => {
        setOpen(true);
    }

    const handleInputMessage = (e) => {
        e.preventDefault();

        if (e.target.value.length <= 250) {
            setMessage(e.target.value);
        }
    }

    const messagePopUp = () => {
        return (
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={open}
            >
                <div className="h-[40.05%] bg-orange-50 border border-red-500 rounded-[5px] flex flex-col gap-5 items-center justify-center w-[33.125%] z-10">
                    <div className="h-[60.2888%] bg-orange-50 border border-red-500 border-solid pb-[1px] pl-5 pt-5 rounded-[5px] w-[80%]">
                        <textarea
                            name="message"
                            placeholder="250 Characters Only"
                            className="h-full bg-orange-50 border-0 leading-[normal] p-0 placeholder:text-red-500_87 placeholder:italic sm:px-5 text-left text-lg text-red-500 break-works w-full"
                            autoFocus
                            type="text"
                            defaultValue={message}
                            onChange={(e) => handleInputMessage(e)}
                        />
                    </div>
                    <div className="flex flex-row items-center justify-center w-full">
                        <Button
                            className="bg-orange-50 hover:bg-red-500 border border-red-500 hover:border-teal-100 text-red-500 hover:text-orange-50 py-2 px-12 rounded-[5px] text-lg"
                            onClick={() => handleCloseMessage()}
                        >
                            save
                        </Button>
                    </div>
                </div>
            </Backdrop>
        )
    }

    const cakeInfo = () => {
        let element = (
            <>
                <div className="flex flex-col items-start justify-start w-full">
                    <Text className="font-monumentextended sm:text-[21px] md:text-[23px] text-[25px] text-red-500 w-[233px]"><Skeleton /></Text>
                    <Text className="font-sfmono mt-2 text-lg text-red-500 w-[233px]" ><Skeleton /></Text>
                    <Text className="font-sfmono mt-1 text-lg text-red-500 w-[233px]" ><Skeleton /></Text>
                </div>
            </>
        )

        if (names.includes("CUSCAKE")) {
            element = (
                <div key="cuscake">
                    <Text className="font-monumentextended sm:text-[21px] md:text-[23px] text-[25px] text-red-500">
                        {names[0]}
                    </Text>
                    <Text className="font-sfmono mt-2 text-lg text-red-500">{names.includes("CUSCAKE") ? order.orderDetails.length : order.orderDetails[0].quantity} {order.orderDetails[0].quantity > 1 || order.orderDetails.length > 1 ? "Cakes" : "Cake"}</Text>
                    <div className="flex flex-row items-center w-full">
                        <Text className="font-sfmono mt-1 text-lg text-red-500 cursor-pointer">Gift Box</Text>
                        <Tooltip disableFocusListener title={<Text className="font-sfmono p-1 text-sm cursor-pointer">Gift box depending on the quantity of your cake</Text>}>
                            <ArrowCircleDownIcon sx={{ marginTop: "5px", marginLeft: "8px", color: "#ee4e34" }} />
                        </Tooltip>
                    </div>
                </div>
            )
        } else {
            let title = [];

            names.forEach((name, index) => {
                let quantity = 0;

                Object.keys(cakeSets[index]).forEach((key) => {
                    if (cakeSets[index][key] !== 0) {
                        quantity += cakeSets[index][key] * parseInt(key.slice(3));
                    }
                })

                title.push(<Text key={index} className="font-sfmono mt-2 text-[12px] text-red-500">{`${name} ${cakeSets[index].set1 !== undefined ? `[set 1 cake: ${cakeSets[index].set1}]` : ""}${cakeSets[index].set2 !== undefined ? `[set 2 cakes: ${cakeSets[index].set2}]` : ""}${cakeSets[index].set4 !== undefined ? `[set 4 cakes: ${cakeSets[index].set4}]` : ""}${cakeSets[index].set6 !== undefined ? `[set 6 cakes: ${cakeSets[index].set6}]` : ""} [Total: ${quantity}]`}</Text>);
            })

            element = (
                <>
                    <Text className="font-monumentextended sm:text-[21px] md:text-[23px] text-[25px] text-red-500 w-full">
                        {names.length === 1 ? (
                            <>
                                {names[0]}
                            </>
                        ) : (
                            <>
                                {`${names[0]}, ${names[1]} ${names.length > 2 ? "and more" : ""}`}
                            </>
                        )}
                    </Text>
                    <Text className="font-sfmono mt-2 text-lg text-red-500 w-full">{names.length} types of cake</Text>
                    <div className="flex flex-row items-center w-full">
                        <Text className="italic text-red-500 text-sm underline">Hover for more</Text>
                        <HtmlTooltip title={title}>
                            <ArrowCircleDownIcon sx={{ marginTop: "5px", marginLeft: "8px", color: "#ee4e34" }} />
                        </HtmlTooltip>
                    </div>
                </>
            )
        }

        return element;
    }

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
                                <Text
                                    className="italic text-red-500 text-sm underline cursor-pointer"
                                    onClick={() => handleOpenMessage()}
                                >
                                    Review your note
                                </Text>
                            </div>
                            <Button
                                className="bg-orange-50 hover:bg-red-500 border border-red-500 hover:border-teal-100 border-solid cursor-pointer font-sfmono leading-[normal] min-w-[193px] md:ml-[0] ml-[268px] mt-6 py-3.5 rounded-[5px] text-center text-lg text-red-500 hover:text-orange-50"
                                onClick={() => navigate("/order")}
                            >
                                pay later
                            </Button>
                        </div>
                        <div className="flex md:flex-1 flex-col gap-[18px] items-start justify-start w-[43%] md:w-full">
                            <div className="flex sm:flex-col flex-row gap-[50px] items-center justify-start w-full">
                                <Img
                                    className="h-[233px] md:h-auto object-cover w-[233px]"
                                    src={image}
                                    alt="rectangle28155"
                                />
                                <QRCodeWithIcon value={qrCodeUrl} />
                            </div>
                            <div className="flex sm:flex-col flex-row sm:gap-10 items-start justify-between w-full">
                                <div className="flex flex-col gap-14 items-start justify-start">
                                    <div className="flex flex-col gap-2 items-start justify-start w-full">
                                        <div className="flex flex-col items-start justify-start w-full">
                                            {names && cakeSets && cakeInfo()}
                                        </div>
                                        <Text className="italic text-red-500 text-sm underline opacity-0">Edit</Text>
                                    </div>
                                    <div className="flex flex-col items-start justify-start">
                                        <Text className="font-bold text-deep_orange-500 text-lg">Total:</Text>
                                        <Text className="mt-1 text-deep_orange-500 text-lg">{price.toLocaleString("vi-VN")} VNĐ</Text>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Footer className="bg-orange-50 flex items-center justify-center md:px-5 w-full" />
                </div>
                {messagePopUp()}
            </div>
        </>
    );
};

export default Payment;
