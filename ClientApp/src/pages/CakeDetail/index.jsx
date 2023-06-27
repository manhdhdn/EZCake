import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import { enqueueSnackbar } from "notistack";
import { v4 } from "uuid";
import moment from "moment";
import CakeApi from "apis/services/Cake";
import OrderApi from "apis/services/Order";
import OrderDetailApi from "apis/services/OrderDetail";

import { Button, Img, Input, Line, List, Text } from "components";
import Navbar from "components/Navbar";
import Cakes from "components/Cakes";
import Footer from "components/Footer";

const CakeDetail = () => {
    const [cake, setCake] = useState(null);
    const [choosed, setChoosed] = useState(0);
    const [number, setNumber] = useState(1);
    const [cartIcon, setCartIcon] = useState("images/img_cart.svg");

    const textAnimation = "font-bold";
    const lineAnimation = "ml-[57%]";

    const navigate = useNavigate();

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

    const handleInputNumber = (value) => {
        if (value < 0) {
            setNumber(0);
            return;
        }

        if (value > 6) {
            setNumber(6);
            return;
        }

        setNumber(value);
    }

    const handleTabClick = (index) => {
        setChoosed(index);
    }

    const handleCartIconEnter = () => {
        setCartIcon("images/img_cart_hover.svg");
    };

    const handleCartIconLeave = () => {
        setCartIcon("images/img_cart.svg");
    }

    const handleBuyNow = async () => {
        try {
            let orderId = v4();

            let status = await OrderApi.createOrder({
                id: orderId,
                orderDate: moment().format("YYYY-MM-DDTHH:mm:ss"),
                shippingInformationId: JSON.parse(localStorage.getItem("userInfo")).shippingInformations[0].id,
                status: "Pending"
            })

            if (status === 201) {
                status = await OrderDetailApi.createOrderDetail({
                    id: v4(),
                    orderId,
                    cakeId: cake.id,
                    price: cake.price,
                    quantity: number === "" || number === "0" ? 1 : number
                })

                if (status === 201) {
                    navigate(`/payment/${orderId}`);
                }
            }
        } catch (error) {
            enqueueSnackbar("Order could not be created", { variant: "error" });
        }
    }

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
                                            <Text
                                                className={`${choosed === 0 ? textAnimation : ""} text-center text-lg text-red-500 cursor-pointer`}
                                                onClick={() => handleTabClick(0)}
                                            >
                                                Product Description
                                            </Text>
                                            <Text
                                                className={`${choosed === 1 ? textAnimation : ""} text-center text-lg text-red-500 ml-4 cursor-pointer`}
                                                onClick={() => handleTabClick(1)}
                                            >
                                                Ingredients
                                            </Text>
                                        </div>
                                        <div className="flex flex-col gap-2 items-center justify-start w-full">
                                            <div className="flex flex-col relative w-full">
                                                <Line className="bg-red-500 h-px mx-auto w-full" />
                                                <Line className={`transition-all duration-300 bg-red-500 h-0.5 mb-auto mt-[-1px] ${choosed === 1 ? lineAnimation : ""} w-[43%] z-[1]`} />
                                            </div>
                                            <div className="flex flex-col relative mb-[76px] w-full">
                                                <div className={`flex flex-row gap-2 absolute justify-start w-full ${choosed === 0 ? "h-[115px] opacity-1" : "h-0 opacity-0"} transition-all`} >
                                                    <Text className="font-sfmono text-lg text-red-500 text-left ml-[5px]">
                                                        •
                                                    </Text>
                                                    <Text className="font-sfmono text-red-500 text-left mt-1">
                                                        {cake.description}
                                                    </Text>
                                                </div>
                                                <div className={`flex flex-row gap-2 absolute justify-start w-full ${choosed === 1 ? "h-[115px] opacity-1" : "h-0 opacity-0"} transition-all`} >
                                                    <Text className="font-sfmono text-lg text-red-500 text-left ml-[5px]">
                                                        •
                                                    </Text>
                                                    <Text className="font-sfmono text-red-500 text-left mt-1">
                                                        Flour, baking powder, salt, sugar, butter, eggs, vanilla, milk, blueberries
                                                    </Text>
                                                </div>
                                            </div>
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
                                                {/* Convert upper button to the type Input that I declared */}
                                                <Input
                                                    className="leading-[normal] text-center text-lg text-red-500 h-full w-full"
                                                    wrapClassName="bg-orange-50 border border-red-500 border-solid h-[30px] rounded-[3px] pl-2 w-[68px]"
                                                    value={number}
                                                    type="number"
                                                    onChange={(value) => handleInputNumber(value)}
                                                />
                                            </div>
                                        </div>
                                        <Text className="text-lg text-red-500 text-right">{cake.price.toLocaleString("vi-VN")} VNĐ</Text>
                                    </div>
                                    <Line className="bg-red-500 h-px w-full" />
                                </div>
                                <div className="flex flex-row gap-5 items-center justify-center w-[52%] md:w-full">
                                    <Img
                                        className="h-[36px] w-[38px] cursor-pointer"
                                        src={cartIcon}
                                        alt="cart_One"
                                        onMouseEnter={handleCartIconEnter}
                                        onMouseLeave={handleCartIconLeave}
                                    />
                                    <Button
                                        className="bg-orange-50 hover:bg-indigo-900 border border-indigo-900 hover:border-teal-100 border-solid cursor-pointer leading-[normal] min-w-[193px] py-3.5 rounded-[5px] text-center text-indigo-900 hover:text-orange-50 text-lg"
                                        onClick={() => handleBuyNow()}
                                    >
                                        buy now
                                    </Button>
                                </div>
                            </div>
                        </div>
                        <Img
                            className="absolute h-[584px] inset-y-[0] left-[1%] my-auto object-cover w-1/2"
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
                                                className="h-[33px] w-[33px]"
                                                src="images/img_star.svg"
                                                alt="starOne"
                                            />
                                        </div>
                                        <div className="flex flex-col h-[33px] items-center justify-start ml-[19px] w-[33px]">
                                            <Img
                                                className="h-[33px] w-[33px]"
                                                src="images/img_star.svg"
                                                alt="starTwo"
                                            />
                                        </div>
                                        <div className="flex flex-col h-[33px] items-center justify-start ml-5 w-[33px]">
                                            <Img
                                                className="h-[33px] w-[33px]"
                                                src="images/img_star.svg"
                                                alt="starThree"
                                            />
                                        </div>
                                        <div className="flex flex-col h-[33px] items-center justify-start ml-[19px] w-[33px]">
                                            <Img
                                                className="h-[33px] w-[33px]"
                                                src="images/img_star.svg"
                                                alt="starFour"
                                            />
                                        </div>
                                        <div className="flex flex-col h-[33px] items-center justify-start ml-5 w-[33px]">
                                            <Img
                                                className="h-[33px] w-[33px]"
                                                src="images/img_star.svg"
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
                                                className="h-[33px] w-[33px]"
                                                src="images/img_star.svg"
                                                alt="starOne"
                                            />
                                        </div>
                                        <div className="flex flex-col h-[33px] items-center justify-start ml-[19px] w-[33px]">
                                            <Img
                                                className="h-[33px] w-[33px]"
                                                src="images/img_star.svg"
                                                alt="starTwo"
                                            />
                                        </div>
                                        <div className="flex flex-col h-[33px] items-center justify-start ml-5 w-[33px]">
                                            <Img
                                                className="h-[33px] w-[33px]"
                                                src="images/img_star.svg"
                                                alt="starThree"
                                            />
                                        </div>
                                        <div className="flex flex-col h-[33px] items-center justify-start ml-[19px] w-[33px]">
                                            <Img
                                                className="h-[33px] w-[33px]"
                                                src="images/img_star.svg"
                                                alt="starFour"
                                            />
                                        </div>
                                        <div className="flex flex-col h-[33px] items-center justify-start ml-5 w-[33px]">
                                            <Img
                                                className="h-[33px] w-[33px]"
                                                src="images/img_star.svg"
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
                                                className="h-[33px] w-[33px]"
                                                src="images/img_star.svg"
                                                alt="starOne"
                                            />
                                        </div>
                                        <div className="flex flex-col h-[33px] items-center justify-start ml-[19px] w-[33px]">
                                            <Img
                                                className="h-[33px] w-[33px]"
                                                src="images/img_star.svg"
                                                alt="starTwo"
                                            />
                                        </div>
                                        <div className="flex flex-col h-[33px] items-center justify-start ml-5 w-[33px]">
                                            <Img
                                                className="h-[33px] w-[33px]"
                                                src="images/img_star.svg"
                                                alt="starThree"
                                            />
                                        </div>
                                        <div className="flex flex-col h-[33px] items-center justify-start ml-[19px] w-[33px]">
                                            <Img
                                                className="h-[33px] w-[33px]"
                                                src="images/img_star.svg"
                                                alt="starFour"
                                            />
                                        </div>
                                        <div className="flex flex-col h-[33px] items-center justify-start ml-5 w-[33px]">
                                            <Img
                                                className="h-[33px] w-[33px]"
                                                src="images/img_star.svg"
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
