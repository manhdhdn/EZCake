import React, { useEffect, useState } from 'react'

import IngredientTypeApi from 'apis/services/IngredientType';

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

                        }
                    }
                    if (element.name === "Flavor") {
                        try {
                            setFlavors(await IngredientTypeApi.getIngredientType(element.id));
                        } catch (error) {

                        }
                    }
                    if (element.name === "Topping") {
                        try {
                            setToppings(await IngredientTypeApi.getIngredientType(element.id));
                        } catch (error) {

                        }
                    }
                });
            } catch (error) {

            }
        }

        loadIngredientTypes();
    }, []);

    useEffect(() => {
        if (flours && flavors && toppings) {
            setLoad(false);
            setFlour(flours.ingredients[0].id);
            setFlavor(flavors.ingredients[0].id);
            setTopping(toppings.ingredients[0].id);
        }
    }, [flours, flavors, toppings]);

    const handleNumberClick = (number) => {
        setNumber(number);
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

    const handleChoosedCake = (id) => {
        setChoosedCake(id);
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

    const handleBtxPayClick = () => {

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
                    onClick={() => handleChoosedCake(i)}
                    onMouseEnter={() => handleCakeIconEnter(i)}
                    onMouseLeave={() => handleCakeIconLeave(i)}
                />
            )
        }

        return element;
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
                            <Line className="absolute bg-red-500 h-[666px] inset-y-[0] my-auto right-[0] w-px" />
                        </div>
                        <div className="flex md:flex-col flex-row gap-5 items-start justify-between md:mt-0 mt-[326px] w-[55%] md:w-full">
                            <div className="flex flex-col gap-[18px] items-center justify-start w-[17%] md:w-full">
                                <div className="flex flex-col items-center justify-start w-full">
                                    <Text className="font-bold text-[22px] text-center sm:text-lg text-red-500 md:text-xl">Number</Text>
                                    <Line className="bg-red-500 h-px mt-1 w-full" />
                                </div>
                                <div className="flex flex-col gap-[18px] items-center justify-start">
                                    <Text
                                        className={`text-center text-lg text-red-500 cursor-pointer ${number === 1 ? "font-bold" : ""}`}
                                        onClick={() => handleNumberClick(1)}
                                    >
                                        1
                                    </Text>
                                    <Text
                                        className={`text-center text-lg text-red-500 cursor-pointer ${number === 2 ? "font-bold" : ""}`}
                                        onClick={() => handleNumberClick(2)}
                                    >
                                        2
                                    </Text>
                                    <Text
                                        className={`text-center text-lg text-red-500 cursor-pointer ${number === 4 ? "font-bold" : ""}`}
                                        onClick={() => handleNumberClick(4)}
                                    >
                                        4
                                    </Text>
                                    <Text
                                        className={`text-center text-lg text-red-500 cursor-pointer ${number === 6 ? "font-bold" : ""}`}
                                        onClick={() => handleNumberClick(6)}
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
                    </div>
                    <div className="absolute bottom-[3%] flex flex-col items-center justify-start right-[18%] w-[24%]">
                        <Text className="font-extrabold font-monumentextended sm:text-[39px] md:text-[45px] text-[53px] text-center text-red-500">
                            CUSCAKE
                        </Text>
                        <Text className="font-sfmono italic mt-0.5 text-center text-lg text-red-500">100.000 VNĐ</Text>
                        <div className="flex flex-row gap-[75px] items-center justify-center my-[39px]">
                            {cakeIcon()}
                        </div>
                        <div className="flex flex-row font-sfmono gap-5 items-center justify-between mt-[302px] w-full">
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
