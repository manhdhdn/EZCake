import React, { useEffect } from "react";

import CuscakeForm from "components/CuscakeForm";
import Footer from "components/Footer";

const Cuscake = () => {
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, []);

    return (
        <>
            <div className="bg-orange-50 flex flex-col font-sfmono items-center justify-start mx-auto w-full">
                <CuscakeForm className="md:h-[1517px] sm:h-[666px] h-[786px] md:px-5 relative w-full" />
                <Footer className="bg-orange-50 flex items-center justify-center md:px-5 w-full" />
            </div>
        </>
    );
};

export default Cuscake;
