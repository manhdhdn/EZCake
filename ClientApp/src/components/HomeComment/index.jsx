import React from 'react'

import { Img, List, Text } from "components";

const HomeComment = () => {
    return (
        <>
            <List
                className="sm:flex-col flex-row gap-[19px] grid grid-cols-5 md:ml-[0] ml-[91px] mt-[98px] md:px-5 w-[18%]"
                orientation="horizontal"
            >
                <div className="flex flex-col h-[33px] items-center justify-start w-full">
                    <Img
                        className="min-h-[33px] min-w-[33px]"
                        src="images/img_star.svg"
                        alt="starOne"
                    />
                </div>
                <div className="flex flex-col h-[33px] items-center justify-start w-full">
                    <Img
                        className="min-h-[33px] min-w-[33px]"
                        src="images/img_star.svg"
                        alt="starTwo"
                    />
                </div>
                <div className="flex flex-col h-[33px] items-center justify-start w-full">
                    <Img
                        className="min-h-[33px] min-w-[33px]"
                        src="images/img_star.svg"
                        alt="starThree"
                    />
                </div>
                <div className="flex flex-col h-[33px] items-center justify-start w-full">
                    <Img
                        className="min-h-[33px] min-w-[33px]"
                        src="images/img_star.svg"
                        alt="starFour"
                    />
                </div>
                <div className="flex flex-col h-[33px] items-center justify-start w-full">
                    <Img
                        className="min-h-[33px] min-w-[33px]"
                        src="images/img_star.svg"
                        alt="starFive"
                    />
                </div>
            </List>
            <Text
                className="md:ml-[0] ml-[91px] mt-4 sm:text-[27px] md:text-[29px] text-[31px] text-red-500"
                size="txtMonumentExtendedRegular31"
            >
                Shrek
            </Text>
            <Text
                className="md:ml-[0] ml-[91px] mt-[42px] text-lg text-red-500 w-[88%] sm:w-full"
                size="txtSFMonoRegular18"
            >
                <>
                    The cupcake custom service is really worth the customer&#39;s
                    experience. I am very pleased with the result of the cake
                    specially made for me. The service staff is very dedicated and
                    friendly, they advise and give ideas to create a perfect cake as
                    required.
                </>
            </Text>
        </>
    )
}

export default HomeComment