import React, { useState, useEffect } from 'react'

import { useSnackbar } from 'notistack';
import ShippingInformationApi from 'apis/services/ShippingInformation';
import AccountApi from 'apis/services/Account';

import { Backdrop, CircularProgress } from '@mui/material';
import { Button, Img, Input, Text } from "components";

const ProfileForm = (props) => {
    const [id, setId] = useState("");
    const [accountId, setAccountId] = useState("");
    const [fullName, setFullName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [gender, setGender] = useState(true);
    const [open, setOpen] = useState(false);
    const [edit, setEdit] = useState(-1);
    const [hoverEdit, setHoverEdit] = useState(-1);

    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        let user = JSON.parse(localStorage.getItem("userInfo"));

        setAccountId(user.id);
        setEmail(user.email);
        setGender(user.gender);

        user.shippingInformations.forEach(element => {
            if (element.prioritisation) {
                setId(element.id);
                setFullName(element.name);
                setPhoneNumber(element.phoneNumber);
                setAddress(element.address);
            }
        });
    }, []);

    const handleIconEditEnter = (id) => {
        setHoverEdit(id);
    }

    const handleIconEditLeave = () => {
        setHoverEdit(-1);
    }

    const handleBtxEditClick = (e, id, edit) => {
        e.preventDefault();

        setEdit(edit);
        document.getElementById(id).focus();
    }

    const handleButtonGenderLeftClick = () => {
        setGender(true);
    }

    const handleButtonGenderRightClick = () => {
        setGender(false);
    }

    const handleBtxSaveClick = async () => {
        setOpen(true);

        try {
            let status = await ShippingInformationApi.updateShippingInformation(id, {
                id,
                name: fullName,
                phoneNumber,
                address,
                prioritisation: true,
                accountId
            })

            if (status === 204) {
                let status = await AccountApi.updateAccount(accountId, {
                    id: accountId,
                    name: fullName,
                    email,
                    gender,
                    role: "User"
                })

                if (status === 204) {
                    localStorage.setItem('userInfo', JSON.stringify(await AccountApi.getAccount({ email: email })));

                    setOpen(false);
                    enqueueSnackbar("Account updated", { variant: "success" });
                }
            }
        } catch (error) {
            setOpen(false);
            enqueueSnackbar("Account could not be updated", { variant: "error" });
        }
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
                    <div className='flex flex-row gap-5 w-full'>
                        <Input
                            id="fullName"
                            name="fullName"
                            placeholder=""
                            className={`leading-[normal] p-0 placeholder:text-red-500_87 placeholder:italic sm:px-5 text-left text-lg text-red-500 w-full ${edit === 0 ? "" : "cursor-not-allowed"}`}
                            wrapClassName="bg-orange-50 border border-red-500 border-solid pb-[17px] pl-5 pt-5 rounded-[5px] w-full"
                            type="text"
                            readOnly={edit === 0 ? false : true}
                            defaultValue={fullName}
                            onChange={(value) => setFullName(value)}
                        ></Input>
                        <Img
                            className="cursor-pointer"
                            src={hoverEdit === 0 ? "images/icon_edit_hover.svg" : "images/icon_edit.svg"}
                            alt="edit"
                            onClick={(e) => handleBtxEditClick(e, "fullName", 0)}
                            onMouseEnter={() => handleIconEditEnter(0)}
                            onMouseLeave={() => handleIconEditLeave()}
                        />
                    </div>
                </div>
                <div className="flex flex-col gap-[5px] items-start justify-start w-full">
                    <Text className="text-red-500 text-sm">Phone number:</Text>
                    <div className="flex md:flex-col flex-row md:gap-10 items-center justify-between w-full">
                        <div className="flex flex-row gap-5 w-full">
                            <Input
                                id="mobileNo"
                                name="mobileNo"
                                placeholder=""
                                className={`leading-[normal] p-0 placeholder:text-red-500_87 placeholder:italic sm:px-5 text-left text-lg text-red-500 w-full ${edit === 1 ? "" : "cursor-not-allowed"}`}
                                wrapClassName="bg-orange-50 border border-red-500 border-solid md:flex-1 pl-5 pr-[35px] py-[18px] rounded-[5px] md:w-full"
                                type="number"
                                readOnly={edit === 1 ? false : true}
                                defaultValue={phoneNumber}
                                onChange={(value) => setPhoneNumber(value)}
                            ></Input>
                            <Img
                                className="cursor-pointer"
                                src={hoverEdit === 1 ? "images/icon_edit_hover.svg" : "images/icon_edit.svg"}
                                alt="edit"
                                onClick={(e) => handleBtxEditClick(e, "mobileNo", 1)}
                                onMouseEnter={() => handleIconEditEnter(1)}
                                onMouseLeave={() => handleIconEditLeave()}
                            />
                        </div>
                        <div className="flex md:flex-1 flex-row gap-5 items-start justify-end w-full">
                            <Text className="mt-[13px] text-[22px] sm:text-lg text-red-500 text-right md:text-xl">Gender</Text>
                            <div className="flex flex-row">
                                <Img className="h-[51px] w-[51px]" src={gender ? "images/img_frame380.svg" : "images/img_frame379.svg"} alt="frame379" onClick={handleButtonGenderLeftClick} />
                                <Text className="mt-[13px] text-[22px] sm:text-lg text-red-500 md:text-xl">Male</Text>
                            </div>
                            <div className="flex flex-row">
                                <Img className="h-[51px] w-[51px]" src={!gender ? "images/img_frame380.svg" : "images/img_frame379.svg"} alt="frame380" onClick={handleButtonGenderRightClick} />
                                <Text className="mt-[13px] text-[22px] sm:text-lg text-red-500 md:text-xl">Female</Text>
                            </div>
                            <Img className="opacity-0" src="images/icon_edit.svg" alt="edit" />
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-1.5 items-start justify-start w-full">
                    <Text className="text-red-500 text-sm">Email:</Text>
                    <div className="flex flex-row gap-5 w-full cursor-not-allowed">
                        <Input
                            id="email"
                            name="email"
                            className="leading-[normal] p-0 placeholder:text-red-500_87 placeholder:italic sm:px-5 text-left text-lg text-red-500 w-full cursor-not-allowed"
                            wrapClassName="bg-orange-50 border border-red-500 border-solid pb-[17px] pl-5 pt-5 rounded-[5px] w-full"
                            type="email"
                            disabled
                            defaultValue={email}
                            onChange={(value) => setEmail(value)}
                        ></Input>
                        <Img
                            src={hoverEdit === 2 ? "images/icon_edit_hover.svg" : "images/icon_edit.svg"}
                            alt="edit"
                            onClick={() => { }}
                            onMouseEnter={() => handleIconEditEnter(2)}
                            onMouseLeave={() => handleIconEditLeave()}
                        />
                    </div>
                </div>
                <div className="flex flex-col gap-[5px] items-start justify-start w-full">
                    <Text className="text-red-500 text-sm">Address:</Text>
                    <div className="flex flex-row gap-5 w-full">
                        <Input
                            id="address"
                            name="address"
                            placeholder=""
                            className={`leading-[normal] p-0 placeholder:text-red-500_87 placeholder:italic sm:px-5 text-left text-lg text-red-500 w-full ${edit === 3 ? "" : "cursor-not-allowed"}`}
                            wrapClassName="bg-orange-50 border border-red-500 border-solid pb-[27px] pl-5 pt-[27px] rounded-[5px] w-full"
                            type="address"
                            readOnly={edit === 3 ? false : true}
                            defaultValue={address}
                            onChange={(value) => setAddress(value)}
                        ></Input>
                        <Img
                            className="cursor-pointer"
                            src={hoverEdit === 3 ? "images/icon_edit_hover.svg" : "images/icon_edit.svg"}
                            alt="edit"
                            onClick={(e) => handleBtxEditClick(e, "address", 3)}
                            onMouseEnter={() => handleIconEditEnter(3)}
                            onMouseLeave={() => handleIconEditLeave()}
                        />
                    </div>
                </div>
            </div>
            <Button
                className="bg-orange-50 hover:bg-red-500 border border-red-500 hover:border-teal-100 border-solid cursor-pointer leading-[normal] min-w-[193px] mt-[60px] py-3.5 rounded-[5px] text-center text-lg text-red-500 hover:text-orange-50"
                onClick={handleBtxSaveClick}
            >
                save
            </Button>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={open}
            >
                <CircularProgress color="success" />
            </Backdrop>
        </div>
    )
}

export default ProfileForm