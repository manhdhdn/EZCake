import React, { useState, useEffect } from 'react'

import { Button, Img, Input, Text } from "components";

const ProfileForm = (props) => {
    const [fullName, setFullName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [gender, setGender] = useState(true);

    useEffect(() => {
        let shippingInformation = "";
    }, []);

    const handleButtonGenderLeftClick = () => {
        setGender(true);
    }

    const handleButtonGenderRightClick = () => {
        setGender(false);
    }

    return (
        <div className={props.className}>
            <div className="flex flex-col gap-[7px] items-center justify-start">
                <Text className="font-extrabold font-monumentextended sm:text-[35px] md:text-[37px] text-[39px] text-center text-red-500">
                    MY PROFILE
                </Text>
                <Text className="font-sfmono italic text-center text-lg text-red-500">
                    Manage profile information for account security
                </Text>
            </div>
            <div className="flex flex-col gap-5 items-center justify-start mt-[57px] w-full">
                <div className="flex flex-col gap-[5px] items-start justify-start w-full">
                    <Text className="text-red-500 text-sm">Full name:</Text>
                    <Input
                        name="group39839"
                        placeholder=""
                        className="leading-[normal] p-0 placeholder:text-red-500 sm:pr-5 text-left text-lg text-red-500 w-full"
                        wrapClassName="bg-orange-50 border border-red-500 border-solid pb-[17px] pl-5 pt-5 rounded-[5px] w-full"
                        defaultValue={fullName}
                        onChange={(value) => setFullName(value)}
                    ></Input>
                </div>
                <div className="flex flex-col gap-[5px] items-start justify-start mr-[40px] w-[96%] md:w-full">
                    <Text className="text-red-500 text-sm">Phone number:</Text>
                    <div className="flex md:flex-col flex-row md:gap-10 items-center justify-between w-full">
                        <Input
                            name="mobileNo"
                            placeholder=""
                            className="leading-[normal] p-0 placeholder:text-red-500 sm:pr-5 text-left text-lg text-red-500 w-full"
                            wrapClassName="bg-orange-50 border border-red-500 border-solid md:flex-1 pl-5 pr-[35px] py-[18px] rounded-[5px] md:w-full"
                            type="number"
                            defaultValue={phoneNumber}
                            onChange={(value) => setPhoneNumber(value)}
                        ></Input>
                        <div className="flex md:flex-1 flex-row items-start justify-between w-[39%] md:w-full">
                            <Text className="mt-[13px] text-[22px] sm:text-lg text-red-500 text-right md:text-xl">Gender</Text>
                            <Img className="h-[51px] w-[51px]" src={gender ? "images/img_frame380.svg" : "images/img_frame379.svg"} alt="frame379" onClick={handleButtonGenderLeftClick} />
                            <Text className="mt-[13px] text-[22px] sm:text-lg text-red-500 md:text-xl">Male</Text>
                            <Img className="h-[51px] w-[51px]" src={!gender ? "images/img_frame380.svg" : "images/img_frame379.svg"} alt="frame380" onClick={handleButtonGenderRightClick} />
                            <Text className="mt-[13px] text-[22px] sm:text-lg text-red-500 md:text-xl">Female</Text>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-1.5 items-start justify-start w-full">
                    <Text className="text-red-500 text-sm">Email:</Text>
                    <Input
                        name="group39843"
                        placeholder=""
                        className="leading-[normal] p-0 placeholder:text-red-500 sm:pr-5 text-left text-lg text-red-500 w-full"
                        wrapClassName="bg-orange-50 border border-red-500 border-solid pb-[17px] pl-5 pt-5 rounded-[5px] w-full"
                        type="email"
                        defaultValue={email}
                        onChange={(value) => setEmail(value)}
                    ></Input>
                </div>
                <div className="flex flex-col gap-[5px] items-start justify-start w-full">
                    <Text className="text-red-500 text-sm">Address:</Text>
                    <Input
                        name="group39844"
                        placeholder=""
                        className="leading-[normal] p-0 placeholder:text-red-500 sm:pr-5 text-left text-lg text-red-500 w-full"
                        wrapClassName="bg-orange-50 border border-red-500 border-solid pb-[27px] pl-5 pt-[27px] rounded-[5px] w-full"
                        type="address"
                        defaultValue={address}
                        onChange={(value) => setAddress(value)}
                    ></Input>
                </div>
            </div>
            <Button className="bg-orange-50 border border-red-500 border-solid cursor-pointer leading-[normal] min-w-[193px] mt-[60px] py-3.5 rounded-[5px] text-center text-lg text-red-500">
                save
            </Button>
        </div>
    )
}

export default ProfileForm