import React from "react";

import { CircularProgress } from "@mui/material";
import { QRCodeSVG } from "qrcode.react";
import { Img } from "components";

const QRCodeWithIcon = ({ value }) => {
    return (
        <div className="flex items-center justify-center z-10">
            <div className="relative">
                <div className="bg-white-A700 border border-red-500 rounded-[8px] h-[233px] w-[233px]">
                    <QRCodeSVG value={value === null ? "https://ezcake.azurewebsites.net" : value} className="h-full w-full p-2" fgColor="#ee4e34" />
                </div>

                <div className="absolute inset-0 flex items-center justify-center rounded-[15px]">
                    <Img className="absolute bg-white-A700 w-12 h-12 p-2 rounded-full" src="images/img_momo.svg" alt="momo" />
                    {!value && <CircularProgress color="success" />}
                </div>
            </div>
        </div>
    );
};

export default QRCodeWithIcon;
