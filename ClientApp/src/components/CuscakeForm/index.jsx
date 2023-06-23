import React, { useEffect, useState } from 'react'

import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { v4 } from 'uuid';
import moment from 'moment';
import IngredientTypeApi from 'apis/services/IngredientType';
import CakeApi from 'apis/services/Cake';
import CakeIngredientApi from 'apis/services/CakeIngredient';
import OrderDetailApi from 'apis/services/OrderDetail';
import OrderApi from 'apis/services/Order';

import { CircularProgress } from '@mui/material';
import { Button, Img, Input, Line, Text } from "components";
import SignHeader from "components/SignHeader";

const CuscakeForm = (props) => {
    const [load, setLoad] = useState(true);
    const [flours, setFlours] = useState(null);
    const [flavors, setFlavors] = useState(null);
    const [toppings, setToppings] = useState(null);
    const [number, setNumber] = useState(1);
    const [choosedCake, setChoosedCake] = useState(0);
    const [hoverCake, setHoverCake] = useState(-1);
    const [flour, setFlour] = useState("");
    const [flavor, setFlavor] = useState("");
    const [topping, setTopping] = useState("");
    // eslint-disable-next-line
    const [customedCakes, setCustomedCakes] = useState([]);
    // eslint-disable-next-line
    const [historyCustomedCakes, setHistoryCustomedCakes] = useState([]);
    const [cakeAnimation, setCakeAnimation] = useState("");

    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();

    useEffect(() => {
        let ingredientTypes = [];

        const loadIngredientTypes = async () => {
            try {
                ingredientTypes = await IngredientTypeApi.getIngredientTypes();

                ingredientTypes.forEach(async element => {
                    if (element.name === "Flour") {
                        try {
                            setFlours(await IngredientTypeApi.getIngredientType(element.id));
                        } catch (error) {
                            enqueueSnackbar("Flour could not be loaded", { variant: "error" });
                        }
                    }

                    if (element.name === "Flavor") {
                        try {
                            setFlavors(await IngredientTypeApi.getIngredientType(element.id));
                        } catch (error) {
                            enqueueSnackbar("Flavor could not be loaded", { variant: "error" });
                        }
                    }

                    if (element.name === "Topping") {
                        try {
                            setToppings(await IngredientTypeApi.getIngredientType(element.id));
                        } catch (error) {
                            enqueueSnackbar("Topping could not be loaded", { variant: "error" });
                        }
                    }
                });
            } catch (error) {
                enqueueSnackbar("Ingredient could not be loaded", { variant: "error" });
            }
        }

        loadIngredientTypes();
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        if (flours && flavors && toppings) {
            setLoad(false);
            setFlour(flours.ingredients[0].id);
            setFlavor(flavors.ingredients[0].id);
            setTopping(toppings.ingredients[0].id);
        }
    }, [flours, flavors, toppings]);

    useEffect(() => {
        saveCakeInformation();
        // eslint-disable-next-line
    }, [flour, flavor, topping]);

    useEffect(() => {
        handleChoosedCake(choosedCake);
        // eslint-disable-next-line
    }, [choosedCake]);

    const saveCakeInformation = () => {
        customedCakes[choosedCake] = {
            flour: flour,
            flavor: flavor,
            topping: topping
        }
    }

    const handleChoosedCake = (id) => {
        setFlour(customedCakes[id].flour);
        setFlavor(customedCakes[id].flavor);
        setTopping(customedCakes[id].topping);
    }

    const handleNumberClick = (number) => {
        setNumber(number);
        setChoosedCake(0);
        setHoverCake(-1);

        setCakeAnimation("opacity-1 gap-[86px]");

        let customedCakesLength = customedCakes.length;
        let historyCustomedCakesLength = historyCustomedCakes.length;

        if (customedCakesLength < number) {
            if (historyCustomedCakesLength === 0) {
                for (let index = 0; index < number - customedCakesLength; index++) {
                    customedCakes.push({
                        flour: flours.ingredients[0].id,
                        flavor: flavors.ingredients[0].id,
                        topping: toppings.ingredients[0].id
                    })
                }

            } else {
                customedCakes.push(...historyCustomedCakes.slice(customedCakesLength));
            }
        }

        if (customedCakesLength > number) {
            customedCakes.filter((element, index) => {
                if (historyCustomedCakes[index] !== element) {
                    historyCustomedCakes[index] = element;
                }

                return true;
            })

            for (let index = 0; index < customedCakesLength - number; index++) {
                customedCakes.pop();
            }
        }
    }

    const handleFlourClick = (id) => {
        setFlour(id);
    }

    const handleFlavorClick = (id) => {
        setFlavor(id);
    }

    const handleToppingClick = (id) => {
        setTopping(id);
    }

    const handleCakeIconEnter = (id) => {
        if (choosedCake !== id) {
            setHoverCake(id);
        }
    }

    const handleCakeIconLeave = (id) => {
        if (choosedCake !== id) {
            setHoverCake(-1);
        }
    }

    const handleNumberEnter = () => {
        setCakeAnimation("opacity-0 gap-0");
    }

    const handleNumberLeave = () => {
        setCakeAnimation("opacity-1 gap-[86px]");
    }

    const handleBtxPayClick = async () => {
        try {
            let orderId = v4();
            let shippingInformationId = JSON.parse(localStorage.getItem("userInfo")).shippingInformations[0].id;

            let status = await OrderApi.createOrder({
                id: orderId,
                orderDate: moment().format("YYYY-MM-DDTHH:mm:ss"),
                shippingInformationId,
                status: "Pending"
            });

            if (status === 201) {
                customedCakes.forEach(async (element) => {
                    let cakeId = v4();

                    status = await CakeApi.createCake({
                        id: cakeId,
                        name: "CUSCAKE",
                        sold: 1,
                        image: "https://firebasestorage.googleapis.com/v0/b/ezcake-exe201.appspot.com/o/img_cake_box.png?alt=media&token=51b5cc5a-d2b4-4a71-9646-a2b0dc796faf",
                        status: "Custom"
                    });

                    if (status === 201) {
                        for (let index = 0; index < Object.keys(element).length; index++) {
                            status = await CakeIngredientApi.createCakeIngredient({
                                id: v4(),
                                cakeId,
                                ingredientId: element[Object.keys(element)[index]]
                            });

                            if (status !== 201) {
                                enqueueSnackbar("Cake could not be created", { variant: "error" });
                                return;
                            }
                        }

                        let cake = await CakeApi.getCake(cakeId);

                        if (status === 201) {
                            status = await OrderDetailApi.createOrderDetail({
                                id: v4(),
                                orderId,
                                cakeId,
                                price: cake.price,
                                quantity: 1
                            });

                            if (status === 201) {
                                navigate(`/payment/${orderId}`);
                            }
                        } else {
                            enqueueSnackbar("Order could not be created", { variant: "error" });
                        }
                    } else {
                        enqueueSnackbar("Cake could not be created", { variant: "error" });
                    }
                });
            }
        } catch (error) {
            enqueueSnackbar("Order could not be created", { variant: "error" });
        }

        navigate("/payment/99f4e228-a38b-49e1-836f-f54e34d29ed1");
    }

    const cakeIcon = () => {
        let element = [];

        for (let i = 0; i < number; i++) {
            element.push(
                <Img
                    key={i}
                    className="cursor-pointer"
                    src={choosedCake === i || hoverCake === i ? "images/icon_cake.svg" : "images/icon_cake_hover.svg"}
                    alt="icon_cake"
                    onClick={() => setChoosedCake(i)}
                    onMouseEnter={() => handleCakeIconEnter(i)}
                    onMouseLeave={() => handleCakeIconLeave(i)}
                />
            )
        }

        return (
            <div className={`absolute flex flex-row transition-all duration-300 ${cakeAnimation} items-center justify-center`}>
                {element}
            </div>
        );
    }

    const content = () => {
        if (load) {
            return (
                <div className="absolute flex flex-col items-center justify-center h-full w-full">
                    <CircularProgress color="success" />
                </div>
            )
        } else {
            return (
                <>
                    <div className="absolute bottom-[0] flex md:flex-col flex-row md:gap-[54px] inset-x-[0] items-start justify-between mx-auto w-[97%]">
                        <div className="h-[666px] relative w-[42%] md:w-full">
                            <Img
                                className="absolute bottom-[0] h-[556px] inset-x-[0] mx-auto object-cover w-full"
                                src="images/img_bvdt1.png"
                                alt="bvdtOne"
                            />
                            <Line className="absolute bg-red-500 h-[666px] inset-y-[0] my-auto right-[0] w-[0.5px]" />
                        </div>
                    </div>
                    <div className="absolute bottom-[3%] flex flex-col items-center justify-center left-[46%] right-[4%] w-[50%]">
                        <Text className="font-extrabold font-monumentextended sm:text-[39px] md:text-[45px] text-[53px] text-center text-red-500">
                            CUSCAKE
                        </Text>
                        <Text className="font-sfmono italic mt-0.5 mb-[56px] text-center text-lg text-red-500">{(number * 30000).toLocaleString("vi-VN")} VNĐ</Text>
                        <div className="flex items-center justify-center my-[39px]">
                            {cakeIcon()}
                        </div>
                        <div className="flex md:flex-col flex-row gap-5 items-start justify-between md:mt-0 mt-[56px] w-full">
                            <div className="flex flex-col gap-[18px] items-center justify-start w-[17%] md:w-full z-10">
                                <div className="flex flex-col items-center justify-start w-full">
                                    <Text className="font-bold text-[22px] text-center sm:text-lg text-red-500 md:text-xl">Number</Text>
                                    <Line className="bg-red-500 h-px mt-1 w-full" />
                                </div>
                                <div className="flex flex-col gap-[18px] items-center justify-start">
                                    <Text
                                        className={`text-center text-lg text-red-500 cursor-pointer ${number === 1 ? "font-bold" : ""}`}
                                        onClick={() => handleNumberClick(1)}
                                        onMouseEnter={() => handleNumberEnter()}
                                        onMouseLeave={() => handleNumberLeave()}
                                    >
                                        1
                                    </Text>
                                    <Text
                                        className={`text-center text-lg text-red-500 cursor-pointer ${number === 2 ? "font-bold" : ""}`}
                                        onClick={() => handleNumberClick(2)}
                                        onMouseEnter={() => handleNumberEnter()}
                                        onMouseLeave={() => handleNumberLeave()}
                                    >
                                        2
                                    </Text>
                                    <Text
                                        className={`text-center text-lg text-red-500 cursor-pointer ${number === 4 ? "font-bold" : ""}`}
                                        onClick={() => handleNumberClick(4)}
                                        onMouseEnter={() => handleNumberEnter()}
                                        onMouseLeave={() => handleNumberLeave()}
                                    >
                                        4
                                    </Text>
                                    <Text
                                        className={`text-center text-lg text-red-500 cursor-pointer ${number === 6 ? "font-bold" : ""}`}
                                        onClick={() => handleNumberClick(6)}
                                        onMouseEnter={() => handleNumberEnter()}
                                        onMouseLeave={() => handleNumberLeave()}
                                    >
                                        6
                                    </Text>
                                </div>
                            </div>
                            <div className="flex flex-col gap-[18px] items-center justify-start w-[26%] md:w-full z-10">
                                <Input
                                    name="group39736"
                                    placeholder="Flour"
                                    className="font-bold leading-[normal] md:text-xl p-0 placeholder:text-red-500 sm:px-5 sm:text-lg text-[22px] text-center text-red-500 w-full"
                                    wrapClassName="border-b border-red-500 pb-[5px] px-[35px] w-full"
                                    disabled
                                ></Input>
                                <div className="flex flex-col gap-[18px] items-center justify-start">
                                    {flours &&
                                        flours.ingredients.map(ingredient =>
                                            <Text
                                                key={ingredient.id}
                                                className={`text-center text-lg text-red-500 cursor-pointer ${flour === ingredient.id ? "font-bold" : ""}`}
                                                onClick={() => handleFlourClick(ingredient.id)}
                                            >
                                                {ingredient.name}
                                            </Text>
                                        )
                                    }
                                </div>
                            </div>
                            <div className="flex flex-col gap-[18px] items-center justify-start w-[26%] md:w-full z-10">
                                <Input
                                    name="group39737"
                                    placeholder="Flavor"
                                    className="font-bold leading-[normal] md:text-xl p-0 placeholder:text-red-500 sm:px-5 sm:text-lg text-[22px] text-center text-red-500 w-full"
                                    wrapClassName="border-b border-red-500 pb-[5px] px-[35px] w-full"
                                    disabled
                                ></Input>
                                <div className="flex flex-col gap-[18px] items-center justify-start">
                                    {flavors &&
                                        flavors.ingredients.map(ingredient =>
                                            <Text
                                                key={ingredient.id}
                                                className={`text-center text-lg text-red-500 cursor-pointer ${flavor === ingredient.id ? "font-bold" : ""}`}
                                                onClick={() => handleFlavorClick(ingredient.id)}
                                            >
                                                {ingredient.name}
                                            </Text>
                                        )
                                    }
                                </div>
                            </div>
                            <div className="flex flex-col gap-[18px] items-center justify-start w-[26%] md:w-full z-10">
                                <Input
                                    name="group39738"
                                    placeholder="Topping"
                                    className="font-bold leading-[normal] md:text-xl p-0 placeholder:text-red-500 sm:px-5 sm:text-lg text-[22px] text-center text-red-500 w-full"
                                    wrapClassName="border-b border-red-500 pb-1 px-[35px] w-full"
                                    disabled
                                ></Input>
                                <div className="flex flex-col gap-[18px] items-center justify-start">
                                    {toppings &&
                                        toppings.ingredients.map(ingredient =>
                                            <Text
                                                key={ingredient.id}
                                                className={`text-center text-lg text-red-500 cursor-pointer ${topping === ingredient.id ? "font-bold" : ""}`}
                                                onClick={() => handleToppingClick(ingredient.id)}
                                            >
                                                {ingredient.name}
                                            </Text>
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-row font-sfmono gap-5 items-center justify-center mt-[8px] w-full">
                            <Button
                                className="bg-orange-50 hover:bg-indigo-900 border border-indigo-900 hover:border-teal-100 border-solid cursor-pointer leading-[normal] min-w-[193px] py-3.5 rounded-[5px] text-center text-indigo-900 hover:text-orange-50 text-lg"
                                onClick={() => handleBtxPayClick()}
                            >
                                pay now
                            </Button>
                            <Text className="italic text-center text-red-500 text-sm underline">Is this a gift?</Text>
                        </div>
                    </div>
                </>
            )
        }
    }

    return (
        <div className={props.className}>
            <div className="absolute flex flex-col inset-x-[0] items-center justify-start mx-auto top-[0] w-full">
                <div className="bg-orange-50 flex flex-col items-center justify-start p-[27px] sm:px-5 shadow-bs w-full">
                    <SignHeader className="flex flex-col items-center justify-start mb-0.5 w-[6%] md:w-full" />
                </div>
                <Line className="bg-red-500 h-px w-full" />
            </div>
            {content()}
        </div>
    )
}

export default CuscakeForm
