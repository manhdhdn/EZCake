import React from "react";

import { Img } from "components";

const Cakes = (props) => {
  return (
    <>
      <div className={props.className}>
        <Img
          className="h-[500px] md:h-auto object-cover w-[335px]"
          src="images/img_cake_sell.png"
          alt="pictureSeven"
        />
        <Img
          className="h-[500px] md:h-auto object-cover w-[335px]"
          src="images/img_cake_sell.png"
          alt="pictureEight"
        />
        <Img
          className="h-[500px] md:h-auto object-cover w-[335px]"
          src="images/img_cake_sell.png"
          alt="pictureNine"
        />
        <Img
          className="h-[500px] md:h-auto object-cover w-[335px]"
          src="images/img_cake_sell.png"
          alt="pictureTen"
        />
      </div>
    </>
  );
};

Cakes.defaultProps = {};

export default Cakes;
