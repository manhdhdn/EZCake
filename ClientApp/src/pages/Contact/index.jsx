import React, { useState, useEffect } from "react";

import { Button, Img, Line, Text } from "components";
import Footer from "components/Footer";
import Navbar from "components/Navbar";
import Chat from "components/Chat";

const Contact = () => {
    const [first, setFirst] = useState(false);
    const [second, setSecond] = useState(false);
    const [third, setThird] = useState(false);
    const [fourth, setFourth] = useState(false);
    const timeout = 150;

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" })
    }, []);

    const handleFirst = () => {
        setTimeout(() => {
            setFirst(!first);
        }, timeout);
        setSecond(false);
        setThird(false);
        setFourth(false);
    }

    const handleSecond = () => {
        setFirst(false);
        setTimeout(() => {
            setSecond(!second);
        }, timeout);
        setThird(false);
        setFourth(false);
    }

    const handleThird = () => {
        setFirst(false);
        setSecond(false);
        setTimeout(() => {
            setThird(!third);
        }, timeout);
        setFourth(false);
    }

    const handleFourth = () => {
        setFirst(false);
        setSecond(false);
        setThird(false);
        setTimeout(() => {
            setFourth(!fourth);
        }, timeout);
    }

    return (
        <>
            <div className="bg-orange-50 flex flex-col font-sfmono items-center justify-start mx-auto w-full">
                <div className="flex flex-col items-start justify-start w-full">
                    <Navbar className="bg-orange-50 flex flex-row font-sfmono items-center justify-start p-[27px] sm:px-5 shadow-bs w-full" />
                </div>
                <div className="h-[667px] md:px-5 relative mt-navbar w-full">
                    <div className="h-[667px] m-auto w-full">
                        <Img
                            className="absolute h-[667px] inset-y-[0] left-[0] my-auto object-cover w-[55%]"
                            src="images/img_picture1.png"
                            alt="EZCake"
                        />
                        <div className="absolute flex flex-col gap-5 h-max inset-y-[0] items-center justify-start my-auto right-[5%] left-[60%] w-[35%]">
                            <Text className="font-extrabold font-monumentextended sm:text-[35px] md:text-[37px] text-[39px] text-red-500 text-left w-full">
                                CONTACT US
                            </Text>
                            <Text className="font-sfmono italic text-lg text-red-500 text-left w-full">
                                Check out our FAQ section below, but if you still have questions or concers we are happy to help!
                                Just reach out with the e-mail below
                            </Text>
                            <Text className="font-bold font-sfmono mt-2 text-left text-red-500 w-full">EzCake@gmail.com</Text>
                            <Line className="bg-red-500 h-px mt-9 mb-10 w-[129%]" />
                            <Text className="font-extrabold font-monumentextended sm:text-[35px] md:text-[37px] text-[39px] text-red-500 text-left w-full">
                                FOLLOW US
                            </Text>
                            <div className="flex flex-row gap-5 items-center justify-start w-full">
                                <Button>
                                    <Img className="h-[51px] w-[51px]" src="images/img_facebook.svg" alt="facebook" />
                                </Button>
                                <Text className="text-lg text-red-500">Facebook</Text>
                            </div>
                            <div className="flex flex-row gap-5 items-center justify-start w-full">
                                <Button className="h-[51px] w-[51px] bg-gray-900 flex items-center justify-center p-[7px] rounded-lg">
                                    <Img className="h-[28px] w-[28px]" src="images/img_tiktok.svg" alt="tiktok" />
                                </Button>
                                <Text className="text-lg text-red-500">Tiktok</Text>
                            </div>
                        </div>
                        <Line className="absolute bg-red-500 h-px inset-x-[0] mx-auto top-[0] w-full" />
                    </div>
                    <Line className="absolute bg-red-500 h-[667px] inset-y-[0] my-auto right-[45%] w-px" />
                </div>
                <div className="h-[667px] md:px-5 relative w-full">
                    <div className="h-[667px] m-auto w-full">
                        <div className="absolute flex flex-col h-max inset-y-[0] justify-start my-auto right-[60%] left-[5%] w-[35%]">
                            <Text className="font-extrabold font-monumentextended sm:text-[35px] md:text-[37px] text-[39px] text-red-500 text-left w-full">
                                FREQUENTLY ASKED QUESTIONS
                            </Text>
                            <Text className="font-bold text-lg text-red-500 mt-10 ml-[17px] z-10  cursor-pointer" onClick={handleFirst}>Does your shop accept custom cupcake orders?</Text>
                            <div className={`flex flex-row gap-2 justify-start mb-2 w-full ${first ? "h-[115px] opacity-100" : "h-0 opacity-0"} transition-all`} >
                                <Text className="font-sfmono text-lg text-red-500 text-left ml-[25px]">
                                    •
                                </Text>
                                <Text className="font-sfmono text-red-500 text-left mt-1">
                                    Of course! Our shop accepts to order cupcakes according to your requirements. Whether you want a screaming skull cupcake or a dancing cat and dog cupcake, we can do it all! We guarantee that the cupcakes will be so adorable that you'll want to kiss them before you eat them!
                                </Text>
                            </div>
                            <Img src="images/img_line.svg" alt="line" />
                            <Text className="font-bold text-lg text-red-500 mt-4 ml-[17px] z-10  cursor-pointer" onClick={handleSecond}>Do you provide delivery service?</Text>
                            <div className={`flex flex-row gap-2 justify-start mb-2 w-full ${second ? "h-[115px] opacity-100" : "h-0 opacity-0"} transition-all`} >
                                <Text className="font-sfmono text-lg text-red-500 text-left ml-[25px]">
                                    •
                                </Text>
                                <Text className="font-sfmono text-red-500 text-left mt-1">
                                    Of course! We provide delivery service for your orders. Just tell us your shipping address and we'll make sure your amazing cupcakes arrive safely and quickly. So you don't have to worry about shipping, just sit back and wait to enjoy the delicious cupcakes you ordered!
                                </Text>
                            </div>
                            <Img src="images/img_line.svg" alt="line" />
                            <Text className="font-bold text-lg text-red-500 mt-4 ml-[17px] z-10  cursor-pointer" onClick={handleThird}>Do you have gluten-free/sugar-free cupcakes?</Text>
                            <div className={`flex flex-row gap-2 justify-start mb-2 w-full ${third ? "h-[155px] opacity-100" : "h-0 opacity-0"} transition-all`} >
                                <Text className="font-sfmono text-lg text-red-500 text-left ml-[25px]">
                                    •
                                </Text>
                                <Text className="font-sfmono text-red-500 text-left mt-1">
                                    Of course, we have! We don't want anyone to miss out on delicious food just because of a nutritional restriction. So we offer gluten-free and sugar-free cupcakes. They are great party touches and will make you feel like you're flying in the clouds! Give it a try and you'll discover that gluten-free and sugar-free cupcakes can be just as sweet and delicious!
                                </Text>
                            </div>
                            <Img src="images/img_line.svg" alt="line" />
                            <Text className="font-bold text-lg text-red-500 mt-4 ml-[17px] z-10  cursor-pointer" onClick={handleFourth}>Do you accept cupcake orders for weddings, birthdays or other events?</Text>
                            <div className={`flex flex-row gap-2 justify-start mb-2 w-full ${fourth ? "h-[155px] opacity-100" : "h-0 opacity-0"} transition-all`} >
                                <Text className="font-sfmono text-lg text-red-500 text-left ml-[25px]">
                                    •
                                </Text>
                                <Text className="font-sfmono text-red-500 text-left mt-1">
                                    Sure! We'd love to take cupcake orders for special occasions like weddings, birthdays, or any other event you're hosting. We can create cupcakes that are beautiful, stylish and fit the theme of the event. Tell us your requirements for taste, color and design, and we will delight you and your guests. Each cupcake will be a sweet highlight of your special day!
                                </Text>
                            </div>
                            <Img src="images/img_line.svg" alt="line" />
                        </div>
                        <Img
                            className="absolute h-[667px] inset-y-[0] right-[0] my-auto object-cover w-[55%]"
                            src="images/img_picture1.png"
                            alt="EZCake"
                        />
                        <Line className="absolute bg-red-500 h-px inset-x-[0] mx-auto top-[0] w-full" />
                    </div>
                    <Line className="absolute bg-red-500 h-[667px] inset-y-[0] my-auto right-[55%] w-px" />
                </div>
                <Chat />
                <Footer className="bg-orange-50 flex items-center justify-center md:px-5 w-full" />
            </div>
        </>
    );
};

export default Contact;
