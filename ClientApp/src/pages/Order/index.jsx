import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import { handleSectionNavigation } from "utils";
import OrderApi from "apis/services/Order";
import MoMo from "apis/momo/MoMo";

import { Backdrop, Box, CircularProgress, Pagination } from "@mui/material";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";
import { Button, Img, Input, Line, Text } from "components";
import Navbar from "components/Navbar";
import Footer from "components/Footer";

const Order = () => {
    const [load, setLoad] = useState(true);
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState("");
    const [cancelOrder, setCancelOrder] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [confirms, setConfirms] = useState(null);
    const [confirmDetails, setConfirmDetails] = useState([]);
    const [makings, setMakings] = useState(null);
    const [makingDetails, setMakingDetails] = useState([]);
    const [deliveries, setDeliveries] = useState(null);
    const [deliveriyDetails, setDeliveryDetails] = useState([]);
    const [histories, setHistories] = useState(null);
    const [historyDetails, setHistoryDetails] = useState([]);
    const [selected, setSelected] = useState(1);
    const [searchAnimation, setSearchAnimation] = useState("bg-red-500_63");
    const [searchIcon, setSearchIcon] = useState("images/img_search.svg");
    const [search, setSearch] = useState("");

    const buttonClassSelected = "bg-red-500 border-teal-100 text-orange-50";
    const buttonClassDefault = "bg-orange-50 border-red-500 text-red-500";
    const animationBlockHide = "gap-0";
    const animationBlockShow = "gap-5";
    const animationHide = "opacity-0 h-0";
    const animationTextShow = "opacity-1";

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
        handleSectionNavigation("order", -50);
    }, []);

    useEffect(() => {
        const loadOrder = async () => {
            try {
                let orders = []
                let accountId = JSON.parse(localStorage.getItem("userInfo")).id

                setLoad(true);

                if (selected === 1) {
                    orders = await OrderApi.getOrders({
                        accountId,
                        status: "Pending",
                        subStatus: "Confirmed",
                        pageNumber,
                        search
                    });

                    setConfirms(orders);
                    setMakings({});
                    setDeliveries({});
                    setHistories({});
                    return;
                }

                if (selected === 2) {
                    orders = await OrderApi.getOrders({
                        accountId,
                        status: "Making",
                        pageNumber,
                        search
                    })

                    setMakings(orders);
                    setConfirms({});
                    setDeliveries({});
                    setHistories({});
                    return;
                }

                if (selected === 3) {
                    orders = await OrderApi.getOrders({
                        accountId,
                        status: "Delivering",
                        subStatus: "Delivered",
                        pageNumber,
                        search
                    })

                    setDeliveries(orders);
                    setConfirms({});
                    setMakings({});
                    setHistories({});
                    return;
                }

                if (selected === 4) {
                    orders = await OrderApi.getOrders({
                        accountId,
                        status: "Completed",
                        subStatus: "Cancelled",
                        pageNumber,
                        search
                    })

                    setHistories(orders);
                    setConfirms({});
                    setMakings({});
                    setDeliveries({});
                }
            } catch (error) {
                enqueueSnackbar("Could not load order", { variant: "error" });
            }
        }

        loadOrder();

        // eslint-disable-next-line
    }, [pageNumber, selected, search]);

    useEffect(() => {
        const loadConfirmOrder = async () => {
            try {
                let orderDetails = [];

                await Promise.all(confirms.data.map(async (element) => {
                    let order = await OrderApi.getOrder(element.id);

                    orderDetails.push(order);
                }));

                orderDetails = [...orderDetails].sort((a, b) => {
                    if (a.status === 'Pending' && b.status !== 'Pending') {
                        return -1;
                    }
                    if (a.status !== 'Pending' && b.status === 'Pending') {
                        return 1;
                    }

                    return new Date(b.orderDate) - new Date(a.orderDate);
                })

                setConfirmDetails(orderDetails);
                setTotalPages(confirms.totalPages);
            } catch (error) {
                enqueueSnackbar("Could not load order", { variant: "error" });
            }
        }

        if (confirms) {
            if (confirms.data !== undefined) {
                loadConfirmOrder();
                setLoad(false);
            }
        }

        // eslint-disable-next-line
    }, [confirms]);

    useEffect(() => {
        const loadMakingOrder = async () => {
            try {
                let orderDetails = [];

                await Promise.all(makings.data.map(async (element) => {
                    let order = await OrderApi.getOrder(element.id);

                    orderDetails.push(order);
                }));

                orderDetails = [...orderDetails].sort((a, b) => {
                    return new Date(b.orderDate) - new Date(a.orderDate);
                })

                setMakingDetails(orderDetails);
                setTotalPages(makings.totalPages);
            } catch (error) {
                enqueueSnackbar("Could not load order", { variant: "error" });
            }
        }

        if (makings) {
            if (makings.data !== undefined) {
                loadMakingOrder();
                setLoad(false);
            }
        }

        // eslint-disable-next-line
    }, [makings]);

    useEffect(() => {
        const loadDeliveryOrder = async () => {
            try {
                let orderDetails = [];

                await Promise.all(deliveries.data.map(async (element) => {
                    let order = await OrderApi.getOrder(element.id);

                    orderDetails.push(order);
                }));

                orderDetails = [...orderDetails].sort((a, b) => {
                    if (a.status === 'Delivering' && b.status !== 'Delivering') {
                        return -1;
                    }
                    if (a.status !== 'Delivering' && b.status === 'Delivering') {
                        return 1;
                    }

                    return new Date(b.orderDate) - new Date(a.orderDate);
                })

                setDeliveryDetails(orderDetails);
                setTotalPages(deliveries.totalPages);
            } catch (error) {
                enqueueSnackbar("Could not load order", { variant: "error" });
            }
        }

        if (deliveries) {
            if (deliveries.data !== undefined) {
                loadDeliveryOrder();
                setLoad(false);
            }
        }

        // eslint-disable-next-line
    }, [deliveries]);

    useEffect(() => {
        const loadHistoryOrder = async () => {
            try {
                let orderDetails = [];

                await Promise.all(histories.data.map(async (element) => {
                    let order = await OrderApi.getOrder(element.id);

                    orderDetails.push(order);
                }));

                orderDetails = [...orderDetails].sort((a, b) => {
                    if (a.status === 'Completed' && b.status !== 'Completed') {
                        return -1;
                    }
                    if (a.status !== 'Completed' && b.status === 'Completed') {
                        return 1;
                    }

                    return new Date(b.orderDate) - new Date(a.orderDate);
                })

                setHistoryDetails(orderDetails);
                setTotalPages(histories.totalPages);
            } catch (error) {
                enqueueSnackbar("Could not load order", { variant: "error" });
            }
        }

        if (histories) {
            if (histories.data !== undefined) {
                loadHistoryOrder();
                setLoad(false);
            }
        }

        // eslint-disable-next-line
    }, [histories]);

    const noOrder = (id) => {
        return (
            <Text className={`transition-all duration-300 ${selected === id ? animationTextShow : animationHide} font-sfmono text-lg text-red-500`}>• There are currently no orders •</Text>
        );
    }

    const handlePayBtxClick = (id) => {
        navigate(`/payment/${id}`);
    }

    const handlePageChange = (e, page) => {
        e.preventDefault();

        if (parseInt(page) !== pageNumber) {
            setPageNumber(page);
        }
    }

    const handleSearch = (value) => {
        setSearch(value);
        setPageNumber(1);
    }

    const handleSearchFocus = (e) => {
        e.preventDefault();

        setSearchAnimation("bg-orange-50 border border-solid border-red-500");
        setSearchIcon("images/img_search_focus.svg");
    }

    const handleSearchBlur = (e) => {
        e.preventDefault();

        setSearchAnimation("bg-red-500_63");
        setSearchIcon("images/img_search.svg");
    }

    const handleCloseMessage = () => {
        setOpen(false);
    }

    const handleOpenMessage = (order) => {
        setOpen(true);
        setCancelOrder(order);
    }

    const handleInputMessage = (e) => {
        e.preventDefault();

        if (e.target.value.length <= 250) {
            setMessage(e.target.value);
        }
    }

    const handleCancelOrder = async () => {
        try {
            let orders = confirmDetails.filter(order => order.id !== cancelOrder.id);
            setConfirmDetails(orders);

            setMessage("");
            setOpen(false);

            enqueueSnackbar("Order cancelled, waiting for refund if any", { variant: "success" });

            if (cancelOrder.payment != null) {
                let status = await MoMo.refund(cancelOrder);

                if (status === 0) {
                    enqueueSnackbar("Refund sent, check your MoMo", { variant: "success" });
                }
            }

            await OrderApi.updateOrder(cancelOrder.id, {
                id: cancelOrder.id,
                orderDate: cancelOrder.orderDate,
                shippedDate: cancelOrder.shippedDate,
                shippingInformationId: cancelOrder.shippingInformationId,
                message: message,
                status: "Cancelled"
            });
        } catch (error) {
            enqueueSnackbar("Could not cancel order", { variant: "error" });
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
                            placeholder="Reason for cancel order... (250 Characters Only)"
                            className="h-full bg-orange-50 border-0 leading-[normal] p-0 placeholder:text-red-500_87 placeholder:italic sm:px-5 text-left text-lg text-red-500 break-works w-full"
                            autoFocus
                            type="text"
                            defaultValue={null}
                            onChange={(e) => handleInputMessage(e)}
                        />
                    </div>
                    <div className="flex flex-row gap-5 items-center justify-center w-full">
                        <Button
                            className={`bg-orange-50 hover:bg-indigo-900 border border-indigo-900 hover:border-teal-100 text-indigo-900 hover:text-orange-50 py-2 px-6 rounded-[5px] text-lg ${message.length <= 0 ? "cursor-not-allowed" : ""}`}
                            disabled={message.length <= 0}
                            onClick={() => handleCancelOrder()}
                        >
                            cancel order
                        </Button>
                        <Button
                            className="bg-orange-50 hover:bg-red-500 border border-red-500 hover:border-teal-100 text-red-500 hover:text-orange-50 py-2 px-12 rounded-[5px] text-lg"
                            onClick={() => handleCloseMessage()}
                        >
                            close
                        </Button>
                    </div>
                </div>
            </Backdrop>
        )
    }

    const handleContact = () => {
        const target = document.getElementById("fb-root");

        if (target) {
            target.click();
        }
    }

    const confirm = () => {
        if (confirmDetails.length !== 0) {
            let contents = [];

            confirmDetails.forEach((order) => {
                let image = order.orderDetails[0].cake.image;
                let name = [];
                let cakeSets = [];
                let title = [];
                let numOfOrder = order.orderDetails.length;
                let quantity = 0;
                let singlePrice = order.orderDetails[0].price;
                let date = order.orderDate.slice(0, 10);
                let time = order.orderDate.slice(11, 16);
                let price = 0;
                let payed = order.status === "Confirmed" ? true : false;

                order.orderDetails.forEach((orderDetail) => {
                    if (!name.includes(orderDetail.cake.name)) {
                        name.push(orderDetail.cake.name);
                    }

                    cakeSets.push(JSON.parse(orderDetail.cakeSet));
                    price += orderDetail.price * orderDetail.quantity;

                    quantity += orderDetail.quantity;
                });

                if (!name.includes("CUSCAKE")) {
                    name.forEach((name, index) => {
                        let quantity = 0;

                        Object.keys(cakeSets[index]).forEach((key) => {
                            if (cakeSets[index][key] !== 0) {
                                quantity += cakeSets[index][key] * parseInt(key.slice(3));
                            }
                        })

                        title.push(<Text key={index} className="font-sfmono mt-2 text-[12px] text-red-500">{`${name} ${cakeSets[index].set1 !== undefined ? `[set 1 cake: ${cakeSets[index].set1}]` : ""}${cakeSets[index].set2 !== undefined ? `[set 2 cakes: ${cakeSets[index].set2}]` : ""}${cakeSets[index].set4 !== undefined ? `[set 4 cakes: ${cakeSets[index].set4}]` : ""}${cakeSets[index].set6 !== undefined ? `[set 6 cakes: ${cakeSets[index].set6}]` : ""} [Total: ${quantity}]`}</Text>);
                    });
                }

                contents.push(
                    <HtmlTooltip key={order.id} title={title} placement="top">
                        <Box>
                            <div className={`transition-all duration-300 h-[235px] ${selected === 1 ? "" : "hidden"} bg-orange-50 border border-red-500 border-solid flex flex-col items-center justify-start max-w-[1298px] mx-auto md:px-5 rounded-[5px] w-full`}>
                                <div className="flex md:flex-col flex-row md:gap-5 items-start justify-end w-full">
                                    <Img
                                        className={`transition-all duration-300 h-[234px] md:h-auto border border-solid border-r border-red-500 border-0 object-cover rounded-bl-[5px] rounded-tl-[5px] w-[235px]`}
                                        src={image}
                                        alt="pictureEleven"
                                    />
                                    <div className="flex flex-col items-start justify-start md:ml-[0] ml-[49px] md:mt-0 mt-[30px] w-[30.5%]">
                                        <Text className="font-monumentextended sm:text-[27px] md:text-[29px] text-[31px] text-red-500">
                                            {name.length === 1 ? (
                                                <>
                                                    {name[0]}
                                                </>
                                            ) : (
                                                <>
                                                    {`${name[0]}, ${name[1]} ${name.length > 2 ? "and more" : ""}`}
                                                </>
                                            )}
                                        </Text>
                                        <Text className="font-sfmono mt-4 text-lg text-red-500">
                                            {name.includes("CUSCAKE") ? (
                                                <>
                                                    {name[0]} Gift Box, {numOfOrder}
                                                </>
                                            ) : (
                                                <>
                                                    {name.join(", ")} Cupcake, Gift Box
                                                </>
                                            )}
                                        </Text>
                                        <Text className="font-sfmono h-[22px] mt-[13px] text-lg text-red-500">
                                            x{name.includes("CUSCAKE") ? 1 : quantity}
                                        </Text>
                                    </div>
                                    <div className="h-full flex flex-col gap-[100px] items-right justify-center w-[9.5%]">
                                        <div className="flex flex-col gap-1 items-right">
                                            <Text className="text-lg text-red-500 text-right">{date}</Text>
                                            <Text className="text-lg text-red-500 text-right">{time}</Text>
                                        </div>
                                        <Text className="text-lg text-red-500 text-right">
                                            {name.includes("CUSCAKE") ? (
                                                <>
                                                    {price.toLocaleString("vi-VN")} VNĐ
                                                </>
                                            ) : (
                                                <>
                                                    {singlePrice.toLocaleString("vi-VN")} VNĐ
                                                </>
                                            )}
                                        </Text>
                                    </div>
                                    <Line className={`transition-all duration-300 h-[234px] bg-red-500 md:h-px md:ml-[0] ml-[51px] md:w-full w-px`} />
                                    <div className="flex flex-col md:gap-10 gap-[82px] items-start justify-start m-auto md:mt-0 mt-[42px] w-[31.5%] md:w-full">
                                        <div className="flex flex-row items-center justify-start w-[93%] md:w-full">
                                            <Text className="font-bold text-[22px] sm:text-lg text-red-500 md:text-xl">Total:</Text>
                                            <Text className="font-bold text-[22px] sm:text-lg text-red-500 text-right md:text-xl w-full">
                                                {price.toLocaleString("vi-VN")} VNĐ
                                            </Text>
                                        </div>
                                        {payed ? (
                                            <>
                                                <div className="flex sm:flex-col flex-row gap-5 items-center justify-between w-full">
                                                    <Button
                                                        className="bg-orange-50 hover:bg-indigo-900 border border-indigo-900 hover:border-teal-100 border-solid cursor-pointer leading-[normal] min-w-[193px] py-3.5 rounded-[5px] text-center text-indigo-900 hover:text-orange-50 text-lg"
                                                        onClick={() => handleContact()}
                                                    >
                                                        contact
                                                    </Button>
                                                    <Button
                                                        className="bg-orange-50 hover:bg-red-500 border border-red-500 hover:border-teal-100 border-solid cursor-pointer leading-[normal] min-w-[193px] py-3.5 rounded-[5px] text-center text-lg text-red-500 hover:text-orange-50"
                                                        onClick={() => handleOpenMessage(order)}
                                                    >
                                                        cancel order
                                                    </Button>
                                                </div>
                                            </>
                                        ) : (
                                            <>
                                                <div className="flex sm:flex-col flex-row gap-5 items-center justify-between w-full">
                                                    <Button
                                                        className="bg-orange-50 hover:bg-indigo-900 border border-indigo-900 hover:border-teal-100 border-solid cursor-pointer leading-[normal] min-w-[193px] py-3.5 rounded-[5px] text-center text-indigo-900 hover:text-orange-50 text-lg"
                                                        onClick={() => handlePayBtxClick(order.id)}
                                                    >
                                                        pay
                                                    </Button>
                                                    <Button
                                                        className="bg-orange-50 hover:bg-red-500 border border-red-500 hover:border-teal-100 border-solid cursor-pointer leading-[normal] min-w-[193px] py-3.5 rounded-[5px] text-center text-lg text-red-500 hover:text-orange-50"
                                                        onClick={() => handleOpenMessage(order)}
                                                    >
                                                        cancel order
                                                    </Button>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </Box>
                    </HtmlTooltip>
                );
            });

            return (
                <div className={`transition-all duration-300 flex flex-col ${selected === 1 ? animationBlockShow : animationBlockHide} w-full`}>
                    {contents}
                    {messagePopUp()}
                </div>
            );
        }

        return noOrder(1);
    }

    const making = () => {
        if (makingDetails.length !== 0) {
            let contents = [];

            makingDetails.forEach((order) => {
                let image = order.orderDetails[0].cake.image;
                let name = [];
                let cakeSets = [];
                let title = [];
                let numOfOrder = order.orderDetails.length;
                let quantity = 0;
                let singlePrice = order.orderDetails[0].price;
                let date = order.orderDate.slice(0, 10);
                let time = order.orderDate.slice(11, 16);
                let price = 0;

                order.orderDetails.forEach((orderDetail) => {
                    if (!name.includes(orderDetail.cake.name)) {
                        name.push(orderDetail.cake.name);
                    }

                    cakeSets.push(JSON.parse(orderDetail.cakeSet));
                    price += orderDetail.price * orderDetail.quantity;

                    quantity += orderDetail.quantity;
                });

                if (!name.includes("CUSCAKE")) {
                    name.forEach((name, index) => {
                        let quantity = 0;

                        Object.keys(cakeSets[index]).forEach((key) => {
                            if (cakeSets[index][key] !== 0) {
                                quantity += cakeSets[index][key] * parseInt(key.slice(3));
                            }
                        })

                        title.push(<Text key={index} className="font-sfmono mt-2 text-[12px] text-red-500">{`${name} ${cakeSets[index].set1 !== undefined ? `[set 1 cake: ${cakeSets[index].set1}]` : ""}${cakeSets[index].set2 !== undefined ? `[set 2 cakes: ${cakeSets[index].set2}]` : ""}${cakeSets[index].set4 !== undefined ? `[set 4 cakes: ${cakeSets[index].set4}]` : ""}${cakeSets[index].set6 !== undefined ? `[set 6 cakes: ${cakeSets[index].set6}]` : ""} [Total: ${quantity}]`}</Text>);
                    });
                }

                contents.push(
                    <HtmlTooltip key={order.id} title={title} placement="top">
                        <Box>
                            <div className={`transition-all duration-300 h-[235px] ${selected === 2 ? "" : "hidden"} bg-orange-50 border border-red-500 border-solid flex flex-col items-center justify-start max-w-[1298px] mx-auto md:px-5 rounded-[5px] w-full`}>
                                <div className="flex md:flex-col flex-row md:gap-5 items-start justify-end w-full">
                                    <Img
                                        className={`transition-all duration-300 h-[234px] md:h-auto border border-solid border-r border-red-500 border-0 object-cover rounded-bl-[5px] rounded-tl-[5px] w-[235px]`}
                                        src={image}
                                        alt="pictureEleven"
                                    />
                                    <div className="flex flex-col items-start justify-start md:ml-[0] ml-[49px] md:mt-0 mt-[30px] w-[30.5%]">
                                        <Text className="font-monumentextended sm:text-[27px] md:text-[29px] text-[31px] text-red-500">
                                            {name.length === 1 ? (
                                                <>
                                                    {name[0]}
                                                </>
                                            ) : (
                                                <>
                                                    {`${name[0]}, ${name[1]} ${name.length > 2 ? "and more" : ""}`}
                                                </>
                                            )}
                                        </Text>
                                        <Text className="font-sfmono mt-4 text-lg text-red-500">
                                            {name.includes("CUSCAKE") ? (
                                                <>
                                                    {name[0]} Gift Box, {numOfOrder}
                                                </>
                                            ) : (
                                                <>
                                                    {name.join(", ")} Cupcake, Gift Box
                                                </>
                                            )}
                                        </Text>
                                        <Text className="font-sfmono h-[22px] mt-[13px] text-lg text-red-500">
                                            x{name.includes("CUSCAKE") ? 1 : quantity}
                                        </Text>
                                    </div>
                                    <div className="h-full flex flex-col gap-[100px] items-right justify-center w-[9.5%]">
                                        <div className="flex flex-col gap-1 items-right">
                                            <Text className="text-lg text-red-500 text-right">{date}</Text>
                                            <Text className="text-lg text-red-500 text-right">{time}</Text>
                                        </div>
                                        <Text className="text-lg text-red-500 text-right">
                                            {name.includes("CUSCAKE") ? (
                                                <>
                                                    {price.toLocaleString("vi-VN")} VNĐ
                                                </>
                                            ) : (
                                                <>
                                                    {singlePrice.toLocaleString("vi-VN")} VNĐ
                                                </>
                                            )}
                                        </Text>
                                    </div>
                                    <Line className={`transition-all duration-300 h-[234px] bg-red-500 md:h-px md:ml-[0] ml-[51px] md:w-full w-px`} />
                                    <div className="flex flex-col md:gap-10 gap-[82px] items-start justify-start m-auto md:mt-0 mt-[42px] w-[31.5%] md:w-full">
                                        <div className="flex flex-row items-center justify-start w-[93%] md:w-full">
                                            <Text className="font-bold text-[22px] sm:text-lg text-red-500 md:text-xl">Total:</Text>
                                            <Text className="font-bold text-[22px] sm:text-lg text-red-500 text-right md:text-xl w-full">
                                                {price.toLocaleString("vi-VN")} VNĐ
                                            </Text>
                                        </div>
                                        <div className="flex sm:flex-col flex-row gap-5 items-center justify-between w-full">
                                            <Button
                                                className="z-10 bg-orange-50 hover:bg-indigo-900 border border-indigo-900 hover:border-teal-100 border-solid cursor-pointer leading-[normal] min-w-[406px] py-3.5 rounded-[5px] text-center text-indigo-900 hover:text-orange-50 text-lg"
                                                onClick={() => handleContact()}
                                            >
                                                contact
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Box>
                    </HtmlTooltip>
                );
            });

            return (
                <div className={`transition-all duration-300 flex flex-col ${selected === 2 ? animationBlockShow : animationBlockHide} w-full`}>
                    {contents}
                </div>
            );
        }

        return noOrder(2);
    }

    const delivery = () => {
        if (deliveriyDetails.length !== 0) {
            let contents = [];

            deliveriyDetails.forEach((order) => {
                let image = order.orderDetails[0].cake.image;
                let name = [];
                let cakeSets = [];
                let title = [];
                let numOfOrder = order.orderDetails.length;
                let quantity = 0;
                let singlePrice = order.orderDetails[0].price;
                let date = order.orderDate.slice(0, 10);
                let time = order.orderDate.slice(11, 16);
                let price = 0;
                let deliveryed = order.status === "Delivered" ? true : false;

                order.orderDetails.forEach((orderDetail) => {
                    if (!name.includes(orderDetail.cake.name)) {
                        name.push(orderDetail.cake.name);
                    }

                    cakeSets.push(JSON.parse(orderDetail.cakeSet));
                    price += orderDetail.price * orderDetail.quantity;

                    quantity += orderDetail.quantity;
                });

                if (!name.includes("CUSCAKE")) {
                    name.forEach((name, index) => {
                        let quantity = 0;

                        Object.keys(cakeSets[index]).forEach((key) => {
                            if (cakeSets[index][key] !== 0) {
                                quantity += cakeSets[index][key] * parseInt(key.slice(3));
                            }
                        })

                        title.push(<Text key={index} className="font-sfmono mt-2 text-[12px] text-red-500">{`${name} ${cakeSets[index].set1 !== undefined ? `[set 1 cake: ${cakeSets[index].set1}]` : ""}${cakeSets[index].set2 !== undefined ? `[set 2 cakes: ${cakeSets[index].set2}]` : ""}${cakeSets[index].set4 !== undefined ? `[set 4 cakes: ${cakeSets[index].set4}]` : ""}${cakeSets[index].set6 !== undefined ? `[set 6 cakes: ${cakeSets[index].set6}]` : ""} [Total: ${quantity}]`}</Text>);
                    });
                }

                contents.push(
                    <HtmlTooltip key={order.id} title={title} placement="top">
                        <Box>
                            <div className={`transition-all duration-300 h-[235px] ${selected === 3 ? "" : "hidden"} bg-orange-50 border border-red-500 border-solid flex flex-col items-center justify-start max-w-[1298px] mx-auto md:px-5 rounded-[5px] w-full`}>
                                <div className="flex md:flex-col flex-row md:gap-5 items-start justify-end w-full">
                                    <Img
                                        className={`transition-all duration-300 h-[234px] md:h-auto border border-solid border-r border-red-500 border-0 object-cover rounded-bl-[5px] rounded-tl-[5px] w-[235px]`}
                                        src={image}
                                        alt="pictureEleven"
                                    />
                                    <div className="flex flex-col items-start justify-start md:ml-[0] ml-[49px] md:mt-0 mt-[30px] w-[30.5%]">
                                        <Text className="font-monumentextended sm:text-[27px] md:text-[29px] text-[31px] text-red-500">
                                            {name.length === 1 ? (
                                                <>
                                                    {name[0]}
                                                </>
                                            ) : (
                                                <>
                                                    {`${name[0]}, ${name[1]} ${name.length > 2 ? "and more" : ""}`}
                                                </>
                                            )}
                                        </Text>
                                        <Text className="font-sfmono mt-4 text-lg text-red-500">
                                            {name.includes("CUSCAKE") ? (
                                                <>
                                                    {name[0]} Gift Box, {numOfOrder}
                                                </>
                                            ) : (
                                                <>
                                                    {name.join(", ")} Cupcake, Gift Box
                                                </>
                                            )}
                                        </Text>
                                        <Text className="font-sfmono h-[22px] mt-[13px] text-lg text-red-500">
                                            x{name.includes("CUSCAKE") ? 1 : quantity}
                                        </Text>
                                    </div>
                                    <div className="h-full flex flex-col gap-[100px] items-right justify-center w-[9.5%]">
                                        <div className="flex flex-col gap-1 items-right">
                                            <Text className="text-lg text-red-500 text-right">{date}</Text>
                                            <Text className="text-lg text-red-500 text-right">{time}</Text>
                                        </div>
                                        <Text className="text-lg text-red-500 text-right">
                                            {name.includes("CUSCAKE") ? (
                                                <>
                                                    {price.toLocaleString("vi-VN")} VNĐ
                                                </>
                                            ) : (
                                                <>
                                                    {singlePrice.toLocaleString("vi-VN")} VNĐ
                                                </>
                                            )}
                                        </Text>
                                    </div>
                                    <Line className={`transition-all duration-300 h-[234px] bg-red-500 md:h-px md:ml-[0] ml-[51px] md:w-full w-px`} />
                                    <div className="flex flex-col md:gap-10 gap-[82px] items-start justify-start m-auto md:mt-0 mt-[42px] w-[31.5%] md:w-full">
                                        <div className="flex flex-row items-center justify-start w-[93%] md:w-full">
                                            <Text className="font-bold text-[22px] sm:text-lg text-red-500 md:text-xl">Total:</Text>
                                            <Text className="font-bold text-[22px] sm:text-lg text-red-500 text-right md:text-xl w-full">
                                                {price.toLocaleString("vi-VN")} VNĐ
                                            </Text>
                                        </div>
                                        {deliveryed ? (
                                            <>
                                                <div className="flex sm:flex-col flex-row gap-5 items-center justify-between w-full">
                                                    <Button
                                                        className="bg-orange-50 hover:bg-indigo-900 border border-indigo-900 hover:border-teal-100 border-solid cursor-pointer leading-[normal] min-w-[193px] py-3.5 rounded-[5px] text-center text-indigo-900 hover:text-orange-50 text-lg"
                                                    >
                                                        review
                                                    </Button>
                                                    <Button
                                                        className="bg-orange-50 hover:bg-red-500 border border-red-500 hover:border-teal-100 border-solid cursor-pointer leading-[normal] min-w-[193px] py-3.5 rounded-[5px] text-center text-lg text-red-500 hover:text-orange-50"
                                                    >
                                                        repurchase
                                                    </Button>
                                                </div>
                                            </>
                                        ) : (
                                            <div className="flex sm:flex-col flex-row gap-5 items-center justify-between w-full">
                                                <Button
                                                    className="bg-orange-50 hover:bg-indigo-900 border border-indigo-900 hover:border-teal-100 border-solid cursor-pointer leading-[normal] w-full py-3.5 rounded-[5px] text-center text-indigo-900 hover:text-orange-50 text-lg"
                                                    onClick={() => handleContact()}
                                                >
                                                    contact
                                                </Button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </Box>
                    </HtmlTooltip>
                );
            });

            return (
                <div className={`transition-all duration-300 flex flex-col ${selected === 3 ? animationBlockShow : animationBlockHide} w-full`}>
                    {contents}
                </div>
            );
        }

        return noOrder(3);
    }

    const history = () => {
        if (historyDetails.length !== 0) {
            let contents = [];

            historyDetails.forEach((order) => {
                let image = order.orderDetails[0].cake.image;
                let name = [];
                let cakeSets = [];
                let title = [];
                let numOfOrder = order.orderDetails.length;
                let quantity = 0;
                let singlePrice = order.orderDetails[0].price;
                let date = order.orderDate.slice(0, 10);
                let time = order.orderDate.slice(11, 16);
                let price = 0;
                let completed = order.status === "Completed" ? true : false;

                order.orderDetails.forEach((orderDetail) => {
                    if (!name.includes(orderDetail.cake.name)) {
                        name.push(orderDetail.cake.name);
                    }

                    cakeSets.push(JSON.parse(orderDetail.cakeSet));
                    price += orderDetail.price * orderDetail.quantity;

                    quantity += orderDetail.quantity;
                });

                if (!name.includes("CUSCAKE")) {
                    name.forEach((name, index) => {
                        let quantity = 0;

                        Object.keys(cakeSets[index]).forEach((key) => {
                            if (cakeSets[index][key] !== 0) {
                                quantity += cakeSets[index][key] * parseInt(key.slice(3));
                            }
                        })

                        title.push(<Text key={index} className="font-sfmono mt-2 text-[12px] text-red-500">{`${name} ${cakeSets[index].set1 !== undefined ? `[set 1 cake: ${cakeSets[index].set1}]` : ""}${cakeSets[index].set2 !== undefined ? `[set 2 cakes: ${cakeSets[index].set2}]` : ""}${cakeSets[index].set4 !== undefined ? `[set 4 cakes: ${cakeSets[index].set4}]` : ""}${cakeSets[index].set6 !== undefined ? `[set 6 cakes: ${cakeSets[index].set6}]` : ""} [Total: ${quantity}]`}</Text>);
                    });
                }

                contents.push(
                    <HtmlTooltip key={order.id} title={title} placement="top">
                        <Box>
                            <div className={`transition-all duration-300 h-[235px] ${selected === 4 ? "" : "hidden"} bg-orange-50 border border-red-500 border-solid flex flex-col items-center justify-start max-w-[1298px] mx-auto md:px-5 rounded-[5px] w-full`}>
                                <div className="flex md:flex-col flex-row md:gap-5 items-start justify-end w-full">
                                    <Img
                                        className={`transition-all duration-300 h-[234px] md:h-auto border border-solid border-r border-red-500 border-0 object-cover rounded-bl-[5px] rounded-tl-[5px] w-[235px]`}
                                        src={image}
                                        alt="pictureEleven"
                                    />
                                    <div className="flex flex-col items-start justify-start md:ml-[0] ml-[49px] md:mt-0 mt-[30px] w-[30.5%]">
                                        <Text className="font-monumentextended sm:text-[27px] md:text-[29px] text-[31px] text-red-500">
                                            {name.length === 1 ? (
                                                <>
                                                    {name[0]}
                                                </>
                                            ) : (
                                                <>
                                                    {`${name[0]}, ${name[1]} ${name.length > 2 ? "and more" : ""}`}
                                                </>
                                            )}
                                        </Text>
                                        <Text className="font-sfmono mt-4 text-lg text-red-500">
                                            {name.includes("CUSCAKE") ? (
                                                <>
                                                    {name[0]} Gift Box, {numOfOrder}
                                                </>
                                            ) : (
                                                <>
                                                    {name.join(", ")} Cupcake, Gift Box
                                                </>
                                            )}
                                        </Text>
                                        <Text className="font-sfmono h-[22px] mt-[13px] text-lg text-red-500">
                                            x{name.includes("CUSCAKE") ? 1 : quantity}
                                        </Text>
                                    </div>
                                    <div className="h-full flex flex-col gap-[100px] items-right justify-center w-[9.5%]">
                                        <div className="flex flex-col gap-1 items-right">
                                            <Text className="text-lg text-red-500 text-right">{date}</Text>
                                            <Text className="text-lg text-red-500 text-right">{time}</Text>
                                        </div>
                                        <Text className="text-lg text-red-500 text-right">
                                            {name.includes("CUSCAKE") ? (
                                                <>
                                                    {price.toLocaleString("vi-VN")} VNĐ
                                                </>
                                            ) : (
                                                <>
                                                    {singlePrice.toLocaleString("vi-VN")} VNĐ
                                                </>
                                            )}
                                        </Text>
                                    </div>
                                    <Line className={`transition-all duration-300 h-[234px] bg-red-500 md:h-px md:ml-[0] ml-[51px] md:w-full w-px`} />
                                    <div className="flex flex-col md:gap-10 gap-[82px] items-start justify-start m-auto md:mt-0 mt-[42px] w-[31.5%] md:w-full">
                                        <div className="flex flex-row items-center justify-start w-[93%] md:w-full">
                                            <Text className="font-bold text-[22px] sm:text-lg text-red-500 md:text-xl">Total:</Text>
                                            <Text className="font-bold text-[22px] sm:text-lg text-red-500 text-right md:text-xl w-full">
                                                {price.toLocaleString("vi-VN")} VNĐ
                                            </Text>
                                        </div>
                                        {completed ? (
                                            <div className="flex sm:flex-col flex-row gap-5 items-center justify-between w-full">
                                                <Button
                                                    className="bg-orange-50 hover:bg-indigo-900 border border-indigo-900 hover:border-teal-100 border-solid cursor-pointer leading-[normal] min-w-[406px] py-3.5 rounded-[5px] text-center text-indigo-900 hover:text-orange-50 text-lg"
                                                >
                                                    repurchase
                                                </Button>
                                            </div>
                                        ) : (
                                            <Text className="italic underline text-center text-lg text-red-500 w-full">Canceled</Text>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </Box>
                    </HtmlTooltip>
                );
            });

            return (
                <div className={`transition-all duration-300 flex flex-col ${selected === 4 ? animationBlockShow : animationBlockHide} w-full`}>
                    {contents}
                </div>
            );
        }

        return noOrder(4);
    }

    const content = () => {
        return load ? (
            <CircularProgress color="success" />
        ) : (
            <>
                {confirms && (
                    makings && (
                        deliveries && (
                            histories && (
                                <>
                                    {confirm()}
                                    {making()}
                                    {delivery()}
                                    {history()}
                                </>
                            )
                        )
                    )
                )}
            </>
        )
    }


    return (
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
                        onClick={() => {
                            setSelected(1);
                            setPageNumber(1);
                        }}
                    >
                        Confirm
                    </Button>
                    <Button
                        className={`${selected === 2 ? buttonClassSelected : buttonClassDefault} hover:bg-red-500 border hover:border-teal-100 border-solid cursor-pointer flex-1 leading-[normal] min-w-[233px] py-4 rounded-[5px] text-[22px] text-center sm:text-lg hover:text-orange-50 md:text-xl w-full`}
                        onClick={() => {
                            setSelected(2);
                            setPageNumber(1);
                        }}
                    >
                        Making CUPCAKE
                    </Button>
                    <Button
                        className={`${selected === 3 ? buttonClassSelected : buttonClassDefault} hover:bg-red-500 border hover:border-teal-100 border-solid cursor-pointer flex-1 leading-[normal] min-w-[233px] py-4 rounded-[5px] text-[22px] text-center sm:text-lg hover:text-orange-50 md:text-xl w-full`}
                        onClick={() => {
                            setSelected(3);
                            setPageNumber(1);
                        }}
                    >
                        Delivery
                    </Button>
                    <Button
                        className={`${selected === 4 ? buttonClassSelected : buttonClassDefault} hover:bg-red-500 border hover:border-teal-100 border-solid cursor-pointer flex-1 leading-[normal] min-w-[233px] py-4 rounded-[5px] text-[22px] text-center sm:text-lg hover:text-orange-50 md:text-xl w-full`}
                        onClick={() => {
                            setSelected(4);
                            setPageNumber(1);
                        }}
                    >
                        History
                    </Button>
                </div>
                <Input
                    name="group100"
                    placeholder="Search..."
                    className="placeholder:italic leading-[normal] p-0 placeholder:text-red-500_87 sm:pr-5 text-left text-red-500 placeholder:text-red-500_87 text-sm w-full"
                    wrapClassName={`${searchAnimation} flex mt-5 mb-5 pl-5 pr-[35px] py-1 rounded-[5px] w-[87.2%]`}
                    prefix={<Img className="h-[51px] mr-5 my-auto" src={searchIcon} alt="search" />}
                    onFocus={(e) => handleSearchFocus(e)}
                    onBlur={(e) => handleSearchBlur(e)}
                    onChange={(value) => handleSearch(value)}
                />

                {content()}

                <div className="flex flex-row items-center justify-center mt-[50px] w-full">
                    <Pagination
                        count={totalPages}
                        variant="outlined"
                        shape="rounded"
                        defaultPage={1}
                        page={pageNumber}
                        onChange={(e, page) => handlePageChange(e, page)}
                    />
                </div>

                <Footer className="bg-orange-50 flex items-center justify-center mt-[50px] md:px-5 w-full" />
            </div>
        </div>
    );
};

export default Order;
