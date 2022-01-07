module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      lineHeight: {
        "extra-loose": "3",
      },
    },
    fontFamily: {
      proxima: ["ProximaNova"],
    },
    minHeight: (theme) => ({
      ...theme('spacing'),
    }),
  },
  variants: {
    extend: {
      fill: ["hover", "focus"],
      stroke: ["hover", "focus"],
    },
  },
  plugins: [require('@tailwindcss/line-clamp'),],
};
