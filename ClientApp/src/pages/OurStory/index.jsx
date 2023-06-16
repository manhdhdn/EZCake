import React, { useEffect } from "react";

import { Img, Line, Text } from "components";
import Footer from "components/Footer";
import Navbar from "components/Navbar";
import Chat from "components/Chat";

const OurStory = () => {
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" })
    })

    return (
        <>
            <div className="bg-orange-50 flex flex-col font-sfmono items-center justify-start mx-auto w-full">
                <div className="flex flex-col items-start justify-start w-full">
                    <Navbar className="bg-orange-50 flex flex-row font-sfmono items-center justify-start p-[27px] sm:px-5 shadow-bs w-full" />
                </div>
                <div className="h-[667px] md:px-5 relative mt-navbar w-full">
                    <div className="h-[667px] m-auto w-full">
                        <div className="absolute flex flex-col gap-5 h-max inset-y-[0] items-center justify-start my-auto right-[60%] left-[5%] w-[35%]">
                            <Text className="font-extrabold font-monumentextended sm:text-[35px] md:text-[37px] text-[39px] text-red-500 text-left w-full">
                                ABOUT US
                            </Text>
                            <Text className="font-sfmono italic text-lg text-red-500 text-left w-full">
                                Welcome to our cute cupcake shop! We are proud to be the place to bring the most beautiful and delicious
                                cupcakes. With flair and creativity, we create diverse flavors and lovely decorations on each cake.
                                Visit our shop to experience the most adorable and fun cupcakes!
                            </Text>
                        </div>
                        <Img
                            className="absolute h-[667px] inset-y-[0] right-[0] my-auto object-cover w-[55%]"
                            src="images/img_picture1.png"
                            alt="EZCake"
                        />
                    </div>
                    <Line className="absolute bg-red-500 h-[667px] inset-y-[0] my-auto right-[55%] w-px" />
                </div>
                <div className="h-[667px] md:px-5 relative w-full">
                    <div className="h-[667px] m-auto w-full">
                        <Img
                            className="absolute h-[667px] inset-y-[0] left-[0] my-auto object-cover w-[55%]"
                            src="images/img_picture1.png"
                            alt="EZCake"
                        />
                        <div className="absolute flex flex-col gap-5 h-max inset-y-[0] items-center justify-start my-auto right-[5%] left-[60%] w-[35%]">
                            <Text className="font-extrabold font-monumentextended sm:text-[35px] md:text-[37px] text-[39px] text-red-500 text-right w-full">
                                MISSION TO BRING SWEET THINGS
                            </Text>
                            <Text className="font-sfmono italic text-lg text-red-500 text-right w-full">
                                Our sweet mission is to bring joy and happiness to each customer through amazing cupcakes. We believe
                                that a cake is not only a food, but also a way to create memorable moments and share love.
                            </Text>
                        </div>
                        <Line className="absolute bg-red-500 h-px inset-x-[0] mx-auto top-[0] w-full" />
                    </div>
                    <Line className="absolute bg-red-500 h-[667px] inset-y-[0] my-auto right-[45%] w-px" />
                </div>
                <div className="h-[667px] md:px-5 relative w-full">
                    <div className="h-[667px] m-auto w-full">
                        <div className="absolute flex flex-col gap-5 h-max inset-y-[0] items-center justify-start my-auto right-[60%] left-[5%] w-[35%]">
                            <Text className="font-extrabold font-monumentextended sm:text-[35px] md:text-[37px] text-[39px] text-red-500 text-left w-full">
                                MULTIPLE CREATIVE NEW FLAVORS
                            </Text>
                            <Text className="font-sfmono italic text-lg text-red-500 text-left w-full">
                                We are proud to introduce you to new and innovative flavors in the world of cupcakes. At our bakery,
                                we are constantly searching for and discovering unique ways to combine ingredients to create
                                one-of-a-kind cakes.
                            </Text>
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

export default OurStory;
