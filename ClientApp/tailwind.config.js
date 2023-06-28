module.exports = {
  mode: "jit",
  content: [
    "./src/**/**/*.{js,ts,jsx,tsx,html,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,html,mdx}",
  ],
  darkMode: "class",
  theme: {
    screens: { md: { max: "1050px" }, sm: { max: "550px" } },
    extend: {
      colors: {
        blue: { A400: "#1877f2" },
        gray: { 900: "#161722" },
        red: { 500: "#ee4e34", "500_87": "#ee4e3487", "500_63": "#ee4e3463" },
        teal: { 100: "#add8e6" },
        cyan: { 300: "#65d2e9" },
        orange: { 50: "#fcedda" },
        yellow: { 500: "#f9ea49" },
        white: { A700_02: "#ffffff02", A700: "#ffffff" },
        indigo: { 900: "#00008b" },
        deep_orange: { 500: "#ff5b28" },
        pink: { 400: "#e6436d" },
      },
      spacing: {
        'navbar': '118px',
      },
      fontFamily: { monumentextended: ['Monument Extended', 'sans-serif'], sfmono: ['SF Mono', 'sans-serif'] },
      boxShadow: { bs: "0px 0px  1px 4px #ffffff02" },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
