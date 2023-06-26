import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import { handleSectionNavigation } from "utils";
import OrderApi from "apis/services/Order";

import { CircularProgress, Pagination } from "@mui/material";
import { Button, Img, Input, Line, Text } from "components";
import Navbar from "components/Navbar";
import Chat from "components/Chat";
import Footer from "components/Footer";

const Order = () => {
    const [load, setLoad] = useState(true);
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
    const animationShow = "opacity-1 h-[235px]";
    const animationLineShow = "opacity-1 h-[234px]";
    const animationTextShow = "opacity-1";

    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        handleSectionNavigation("order", 117);
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
                    setMakings([]);
                    setDeliveries([]);
                    setHistories([]);
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
                    setConfirms([]);
                    setDeliveries([]);
                    setHistories([]);
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
                    setConfirms([]);
                    setMakings([]);
                    setHistories([]);
                    return;
                }

                if (selected === 4) {
                    orders = await OrderApi.getOrders({
                        accountId,
                        status: "Completed",
                        pageNumber,
                        search
                    })

                    setHistories(orders);
                    setConfirms([]);
                    setMakings([]);
                    setDeliveries([]);
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
                    if (a.status === 'Pending' && b.status !== 'Pending') {
                        return -1;
                    }
                    if (a.status !== 'Pending' && b.status === 'Pending') {
                        return 1;
                    }

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
                    if (a.status === 'Pending' && b.status !== 'Pending') {
                        return -1;
                    }
                    if (a.status !== 'Pending' && b.status === 'Pending') {
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
                    if (a.status === 'Pending' && b.status !== 'Pending') {
                        return -1;
                    }
                    if (a.status !== 'Pending' && b.status === 'Pending') {
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

        console.log(page);
        console.log(pageNumber);

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

    const confirm = () => {
        if (confirmDetails.length !== 0) {
            let contents = [];

            confirmDetails.forEach((order, index) => {
                let image = order.orderDetails[0].cake.image;
                let name = [];
                let numOfOrder = order.orderDetails.length;
                let quantity = 0;
                let singlePrice = order.orderDetails[0].price;
                let price = 0;
                let payed = order.status === "Confirmed" ? true : false;

                for (let index = 0; index < order.orderDetails.length; index++) {
                    if (!name.includes(order.orderDetails[index].cake.name)) {
                        name.push(order.orderDetails[index].cake.name);
                    }

                    price += order.orderDetails[index].price * order.orderDetails[index].quantity;

                    quantity += order.orderDetails[index].quantity;
                }

                contents.push(
                    <div key={order.id} className={`transition-all duration-300 ${selected === 1 ? animationShow : animationHide} bg-orange-50 border border-red-500 border-solid flex flex-col items-center justify-start max-w-[1298px] mx-auto md:px-5 rounded-[5px] w-full`}>
                        <div className="flex md:flex-col flex-row md:gap-5 items-start justify-end w-full">
                            <Img
                                className={`transition-all duration-300 ${selected === 1 ? animationShow : animationHide} md:h-auto border border-solid border-r border-red-500 border-0 object-cover rounded-bl-[5px] rounded-tl-[5px] w-[235px]`}
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
                                            {`${name[0]}, ${name[1]} ${name.length > 2 ? "and" : ""} more`}
                                        </>
                                    )}
                                </Text>
                                <Text className="font-sfmono mt-4 text-lg text-red-500">
                                    {name.includes("CUSCAKE") ? (
                                        <>
                                            {name.join(", ")} Gift Box, {numOfOrder}
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
                            <div className="md:ml-[0] md:mt-0 mt-[181px] w-[9.5%]">
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
                            <Line className={`transition-all duration-300 ${selected === 1 ? animationLineShow : animationHide} bg-red-500 md:h-px md:ml-[0] ml-[51px] md:w-full w-px`} />
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
                                            >
                                                contact
                                            </Button>
                                            <Button
                                                className="bg-orange-50 hover:bg-red-500 border border-red-500 hover:border-teal-100 border-solid cursor-pointer leading-[normal] min-w-[193px] py-3.5 rounded-[5px] text-center text-lg text-red-500 hover:text-orange-50"
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
                                            >
                                                cancel order
                                            </Button>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                );
            });

            return (
                <div className={`transition-all duration-300 flex flex-col ${selected === 1 ? animationBlockShow : animationBlockHide} w-full`}>
                    {contents}
                </div>
            );
        }

        return noOrder(1);
    }

    const making = () => {
        if (makingDetails.length !== 0) {
            let contents = [];

            makingDetails.forEach((order, index) => {
                let image = order.orderDetails[0].cake.image;
                let name = [];
                let numOfOrder = order.orderDetails.length;
                let quantity = 0;
                let singlePrice = order.orderDetails[0].price;
                let price = 0;

                for (let index = 0; index < order.orderDetails.length; index++) {
                    if (!name.includes(order.orderDetails[index].cake.name)) {
                        name.push(order.orderDetails[index].cake.name);
                    }

                    price += order.orderDetails[index].price * order.orderDetails[index].quantity;

                    quantity += order.orderDetails[index].quantity;
                }

                contents.push(
                    <div key={order.id} className={`transition-all duration-300 ${selected === 2 ? animationShow : animationHide} bg-orange-50 border border-red-500 border-solid flex flex-col items-center justify-start max-w-[1298px] mx-auto md:px-5 rounded-[5px] w-full`}>
                        <div className="flex md:flex-col flex-row md:gap-5 items-start justify-end w-full">
                            <Img
                                className={`transition-all duration-300 ${selected === 2 ? animationShow : animationHide} md:h-auto border border-solid border-r border-red-500 border-0 object-cover rounded-bl-[5px] rounded-tl-[5px] w-[235px]`}
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
                                            {`${name[0]}, ${name[1]} ${name.length > 2 ? "and" : ""} more`}
                                        </>
                                    )}
                                </Text>
                                <Text className="font-sfmono mt-4 text-lg text-red-500">
                                    {name.includes("CUSCAKE") ? (
                                        <>
                                            {name.join(", ")} Gift Box, {numOfOrder}
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
                            <div className="md:ml-[0] md:mt-0 mt-[181px] w-[9.5%]">
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
                            <Line className={`transition-all duration-300 ${selected === 2 ? animationLineShow : animationHide} bg-red-500 md:h-px md:ml-[0] ml-[51px] md:w-full w-px`} />
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
                                    >
                                        contact
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
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

            deliveriyDetails.forEach((order, index) => {
                let image = order.orderDetails[0].cake.image;
                let name = [];
                let numOfOrder = order.orderDetails.length;
                let quantity = 0;
                let singlePrice = order.orderDetails[0].price;
                let price = 0;
                let deliveryed = order.status === "Delivered" ? true : false;

                for (let index = 0; index < order.orderDetails.length; index++) {
                    if (!name.includes(order.orderDetails[index].cake.name)) {
                        name.push(order.orderDetails[index].cake.name);
                    }

                    price += order.orderDetails[index].price * order.orderDetails[index].quantity;

                    quantity += order.orderDetails[index].quantity;
                }

                contents.push(
                    <div key={order.id} className={`transition-all duration-300 ${selected === 3 ? animationShow : animationHide} bg-orange-50 border border-red-500 border-solid flex flex-col items-center justify-start max-w-[1298px] mx-auto md:px-5 rounded-[5px] w-full`}>
                        <div className="flex md:flex-col flex-row md:gap-5 items-start justify-end w-full">
                            <Img
                                className={`transition-all duration-300 ${selected === 3 ? animationShow : animationHide} md:h-auto border border-solid border-r border-red-500 border-0 object-cover rounded-bl-[5px] rounded-tl-[5px] w-[235px]`}
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
                                            {`${name[0]}, ${name[1]} ${name.length > 2 ? "and" : ""} more`}
                                        </>
                                    )}
                                </Text>
                                <Text className="font-sfmono mt-4 text-lg text-red-500">
                                    {name.includes("CUSCAKE") ? (
                                        <>
                                            {name.join(", ")} Gift Box, {numOfOrder}
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
                            <div className="md:ml-[0] md:mt-0 mt-[181px] w-[9.5%]">
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
                            <Line className={`transition-all duration-300 ${selected === 3 ? animationLineShow : animationHide} bg-red-500 md:h-px md:ml-[0] ml-[51px] md:w-full w-px`} />
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
                                    </>
                                ) : (
                                    <div className="flex sm:flex-col flex-row gap-5 items-center justify-between w-full">
                                        <Button
                                            className="z-20 bg-orange-50 hover:bg-indigo-900 border border-indigo-900 hover:border-teal-100 border-solid cursor-pointer leading-[normal] w-full py-3.5 rounded-[5px] text-center text-indigo-900 hover:text-orange-50 text-lg"
                                        >
                                            contact
                                        </Button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
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

            historyDetails.forEach((order, index) => {
                let image = order.orderDetails[0].cake.image;
                let name = [];
                let numOfOrder = order.orderDetails.length;
                let quantity = 0;
                let singlePrice = order.orderDetails[0].price;
                let price = 0;

                for (let index = 0; index < order.orderDetails.length; index++) {
                    if (!name.includes(order.orderDetails[index].cake.name)) {
                        name.push(order.orderDetails[index].cake.name);
                    }

                    price += order.orderDetails[index].price * order.orderDetails[index].quantity;

                    quantity += order.orderDetails[index].quantity;
                }

                contents.push(
                    <div key={order.id} className={`transition-all duration-300 ${selected === 4 ? animationShow : animationHide} bg-orange-50 border border-red-500 border-solid flex flex-col items-center justify-start max-w-[1298px] mx-auto md:px-5 rounded-[5px] w-full`}>
                        <div className="flex md:flex-col flex-row md:gap-5 items-start justify-end w-full">
                            <Img
                                className={`transition-all duration-300 ${selected === 4 ? animationShow : animationHide} md:h-auto border border-solid border-r border-red-500 border-0 object-cover rounded-bl-[5px] rounded-tl-[5px] w-[235px]`}
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
                                            {`${name[0]}, ${name[1]} ${name.length > 2 ? "and" : ""} more`}
                                        </>
                                    )}
                                </Text>
                                <Text className="font-sfmono mt-4 text-lg text-red-500">
                                    {name.includes("CUSCAKE") ? (
                                        <>
                                            {name.join(", ")} Gift Box, {numOfOrder}
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
                            <div className="md:ml-[0] md:mt-0 mt-[181px] w-[9.5%]">
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
                            <Line className={`transition-all duration-300 ${selected === 4 ? animationLineShow : animationHide} bg-red-500 md:h-px md:ml-[0] ml-[51px] md:w-full w-px`} />
                            <div className="flex flex-col md:gap-10 gap-[82px] items-start justify-start m-auto md:mt-0 mt-[42px] w-[31.5%] md:w-full">
                                <div className="flex flex-row items-center justify-start w-[93%] md:w-full">
                                    <Text className="font-bold text-[22px] sm:text-lg text-red-500 md:text-xl">Total:</Text>
                                    <Text className="font-bold text-[22px] sm:text-lg text-red-500 text-right md:text-xl w-full">
                                        {price.toLocaleString("vi-VN")} VNĐ
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

                <Chat />
                <Footer className="bg-orange-50 flex items-center justify-center mt-[50px] md:px-5 w-full" />
            </div>
        </div>
    );
};

export default Order;
