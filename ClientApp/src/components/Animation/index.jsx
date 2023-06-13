import React from 'react'

import { Img, Line } from 'components'

const Animation = (props) => {
  return (
    <div className={props.className}>
      <Img
        className="h-[665px] sm:h-auto object-cover w-full"
        src="images/img_picture1.png"
        alt="pictureOne"
      />
      <Line className="bg-red-500 h-[665px] md:h-px md:w-full w-px" />
    </div>
  )
}

export default Animation