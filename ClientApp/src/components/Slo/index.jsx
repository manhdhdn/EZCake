import React from "react";

import { Button, Text } from "components";

import { handleSectionNavigation } from "utils";

const Slo = (props) => {
  return (
    <>
      <div className={props.className}>
        <div className="flex flex-col items-center justify-start mb-0.5 w-[45%] md:w-full">
          <Text
            className="sm:text-[39px] md:text-[45px] text-[53px] text-center text-orange-50"
            size="txtMonumentExtendedUltrabold53Orange50"
          >
            Ez Zone
          </Text>
          <Text
            className="italic mt-[62px] text-center text-lg text-orange-50 w-full"
            size="txtSFMonoRegularItalic18Orange50"
          >
            Spread the love with our creative cake “decorations” function! Here,
            you can unleash your creativity and turn cakes into colorful works
            of art. With hundreds of bright colors combined with unique
            thinking, you are completely free to express your creativity and
            create adorable and irresistible cakes. Come to Ez Zone - a great
            creative space to create cakes that your loved one is sure to fall
            in love with!
          </Text>
          <Button
            className="common-pointer bg-red-500 border border-orange-50 border-solid cursor-pointer font-sfmono leading-[normal] min-w-[193px] mt-[60px] py-3.5 rounded-[5px] text-center text-lg text-orange-50"
            id="block1"
            onClick={() => {
              handleSectionNavigation("block3");
            }}
          >
            sign in
          </Button>
        </div>
      </div>
    </>
  );
};

Slo.defaultProps = {};

export default Slo;
