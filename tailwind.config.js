module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      lineHeight: {
        "extra-loose": "3",
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
        "dark-blue": {
          400: "#0170BB",
          600: "#015f9f",
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
