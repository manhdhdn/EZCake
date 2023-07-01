import React from 'react'

import { Button, Img } from 'components'

const Chat = () => {
    const handleClick = () => {
        const targetButton = document.getElementById("fb-customer-chat");
        console.log(targetButton);
        if (targetButton) {
            targetButton.click();
        }
    }

    return (
        <>
            <Button
                style={{ position: "fixed", zIndex: 100 }}
                className="absolute bg-orange-50 hover:bg-red-500 border-2 border-red-500 border-solid bottom-[14%] flex h-[51px] items-center justify-center p-2 pt-3 right-[1%] rounded-[18px] w-[51px]"
                onClick={handleClick}
            >
                <Img src="images/img_vector.svg" alt="vector" />
            </Button>
        </>
    )
}

export default Chat