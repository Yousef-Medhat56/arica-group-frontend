import { extendTheme } from "@chakra-ui/react";

const breakpoints = {
    sm: "426px",
    md: "768px",
    lg: "961px",
    xl: "1201px",
    "2xl": "1441px",
};

const fonts = { body: "Montserrat-Arabic", heading: "Montserrat-Arabic" };

const colors = {
    black: "#25251E",
    text: {
        nav: "#4E4F49",
        primary: "#25251E",
        secondary: "#828281",
    },
    brand: {
        linear: {
            from: "rgba(151, 202, 82, 1)",
            to: "rgba(132, 167, 85, 0.9375)",
        },
        bg: {
            gray: "#D8D9D8",
            green: { light: "#67AA0B", medium: "#D2EAD2" },
        },
    },
};
const theme = extendTheme({ breakpoints, fonts, colors });

export default theme;
