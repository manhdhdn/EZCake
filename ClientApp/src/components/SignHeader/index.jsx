import React from 'react'

import { Img } from 'components'

const SignHeader = (props) => {
    return (
        <div className={props.className}>
            <Img
                className="h-[62px]"
                src="images/img_logosmall.png"
                alt="logosmall"
            />
        </div>
    )
}

export default SignHeader