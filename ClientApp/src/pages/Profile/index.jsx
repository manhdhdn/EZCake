import React, { useEffect } from "react";

import { handleSectionNavigation } from "utils";

import { Img, Line } from "components";
import Navbar from "components/Navbar";
import Footer from "components/Footer";
import Chat from "components/Chat";
import ProfileForm from "components/ProfileForm";

const Profile = () => {
    useEffect(() => {
        handleSectionNavigation("first");
    })

    return (
        <>
            <div className="bg-orange-50 flex flex-col font-sfmono items-center justify-start mx-auto w-full">
                <Navbar className="bg-orange-50 flex flex-row font-sfmono items-center justify-start p-[27px] sm:px-5 shadow-bs w-full" />
                <div className="h-[665px] md:px-5 relative w-full mt-navbar">
                    <Img className="h-[665px] m-auto object-cover w-full" src="images/img_picture1.png" alt="pictureOne" />
                    <Line className="absolute bg-red-500 h-px inset-x-[0] mx-auto top-[0] w-full" />
                    <Chat />
                </div>
                <Line id="first" className="bg-red-500 h-px w-full" />
                <ProfileForm className="flex flex-col items-center justify-start max-w-[1014px] mt-14 mx-auto md:px-5 w-full" />
                <Footer className="bg-orange-50 flex items-center justify-center mt-[100px] md:px-5 w-full" />
            </div>
        </>
    );
};

export default Profile;
