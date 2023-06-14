import React from 'react'

import { Link } from 'react-router-dom'
import { Img } from 'components'

const SignHeader = (props) => {
    return (
        <div className={props.className}>
            <Link to="/">
                <Img
                    className="h-[62px]"
                    src="images/img_logosmall.png"
                    alt="logosmall"
                />
            </Link>

        </div>
    )
}

export default SignHeader