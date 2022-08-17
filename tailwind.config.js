module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    borderWidth: {
      "1.5": "1.5px",
    },
    extend: {
      lineHeight: {
        "extra-loose": "3",
      },
      fontSize: {
        "xxs": ".4rem",
      },
      colors: {
        primary: {
          400: "#61daf5",
          600: "#3ad1f2",
        },
        secondary: {
          400: "#4e5561",
          600: "#222a39",
        },
        blue: {
          400: "#0170BB",
          600: "#015f9f",
        },
        "brown": {
          600: "#505050",
        },
        "sky-blue": {
          200: "#A3E4F3",
          400: "#3BD0F2",
        },
        "dark-blue": {
          400: "#232A3A",
          600: "#0a0f2e",
        },
      },
    },
    fontFamily: {
      proxima: ["ProximaNova"],
    },
    minHeight: (theme) => ({
      ...theme("spacing"),
    }),
    minWidth: (theme) => ({
      ...theme("spacing"),
    }),
  },
  variants: {
    extend: {
      fill: ["hover", "focus"],
      stroke: ["hover", "focus"],
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
