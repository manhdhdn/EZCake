import React from "react";

const sizeClasses = {
  txtMonumentExtendedRegular31: "font-monumentextended font-normal",
  txtSFMonoRegularItalic18: "font-normal font-sfmono italic",
  txtMonumentExtendedRegular25: "font-monumentextended font-normal",
  txtMonumentExtendedUltrabold53: "font-extrabold font-monumentextended",
  txtMonumentExtendedUltrabold96: "font-extrabold font-monumentextended",
  txtSFMonoRegular16: "font-normal font-sfmono",
  txtMonumentExtendedUltrabold53Orange50:
    "font-extrabold font-monumentextended",
  txtSFMonoBold18: "font-bold font-sfmono",
  txtSFMonoRegular14: "font-normal font-sfmono",
  txtSFMonoRegularItalic18Orange50: "font-normal font-sfmono italic",
  txtSFMonoRegular18: "font-normal font-sfmono",
};

const Text = ({ children, className = "", size, as, ...restProps }) => {
  const Component = as || "p";

  return (
    <Component
      className={`text-left ${className} ${size && sizeClasses[size]}`}
      {...restProps}
    >
      {children}
    </Component>
  );
};

export { Text };
