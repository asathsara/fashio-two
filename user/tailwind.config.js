/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      width: {
        0.25: "0.0625rem",
      },
      height: {
        "3/4": "75%",
        "7/10": "70%",
        124: "31rem",
        128: "32rem",
        144: "36rem",
      },
      fontSize: {
        "2.5xl": "1.7rem",
      },
      borderWidth: {
        1: "1px",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        pacifico: ["Pacifico", "sans-serif"],
      },
      margin: {
        "1/5": "20%",
        "1/8": "12.5%",
        "1/10": "10%"
      },
      colors: {
        lightPurple: "#BB86FC",
        mediumPurple: "#9D54F5",
        vibrantPurple: "#6200EE",
        darkPurple: "#3700B3",
        lightTeal: "#03DAC5",
        darkTeal: "#018786",
        black: "#000000",
        white: "#FFFFFF",
        darkGray: "#353535",
        navbarGray: "#212121",

        skyBlue: "#0099FF",
        brightBlue: "#32CCFF",
        cyanBlue: "#00B0FF",
        softBlue: "#9BE6FF",
        mintGreen: "#63FCB1",
        emeraldGreen: "#00EC78",
        lightCoral: "#FEACBC",
        salmonPink: "#FF6986",
        pastelYellow: "#FFF26D",
        brightYellow: "#FFEE33",
        semiTransparentGray: "rgba(0, 0, 0, 0.58)",

        veryLightBlue: "#E1F5FE",
        lightBlue: "#81D4FA",
        mediumBlue: "#039BE5",
        deepBlue: "#01579B",
        backgroundBlue: "#E9FCFF",

        paleBlue: "#D5F2FF",
        paleGreen: "#D5FFEA",
        paleRed: "#FFD6DE",
        palePurple: "#E3D7FF",
        paleYellow: "#FFFCD9",

        softYellow: "#F9FFAB",
        coralRed: "#FFA597",
        peachRed: "#FC9382",

        lavender: "#8B81FE",
        indigo: "#6C60FF",

        roseRed: "#F5586E",
        pinkRose: "#F88998",
        amberYellow: "#FFCF93",

        mediumGray: "#676767",
        silver: "#C0C0C0",
        charcoal: "#121212",
        backgroundGray: "#F5F8F9",
        iconGray: "#B7B7B7",
        darkNavy: "#17262A",
        oceanBlue: "#009AF8",
        lightGray: "#B8B8B8",
        textBlue: "#333A41",
        cardBackground: "#F9F9F9",
        systemText: "rgba(0, 0, 0, 0.72)",
        counterBlue: "#32374B",
        lightCounterBlue: "#3a4057",
        cardGray: "#F3F3F3",
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        ".text-outline": {
          color: "transparent",
          WebkitTextStroke: "1px black", // Outline color and width
        },
      });
    },
  ],
};
