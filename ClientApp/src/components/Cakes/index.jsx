import React from "react";

import { Img } from "components";

const Cakes = (props) => {
  return (
    <>
      <div className={props.className}>
        <Img
          className="h-[500px] md:h-auto object-cover w-full"
          src="images/img_picture7.png"
          alt="pictureSeven"
        />
        <Img
          className="h-[500px] md:h-auto object-cover w-full"
          src="images/img_picture7.png"
          alt="pictureEight"
        />
        <Img
          className="h-[500px] md:h-auto object-cover w-full"
          src="images/img_picture7.png"
          alt="pictureNine"
        />
        <Img
          className="h-[500px] md:h-auto object-cover w-full"
          src="images/img_picture7.png"
          alt="pictureTen"
        />
      </div>
    </>
  );
};

Cakes.defaultProps = {};

export default Cakes;
