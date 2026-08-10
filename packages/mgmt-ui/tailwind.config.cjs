module.exports = {
  content: ["./src/**/*.{cjs,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      lineHeight: {
        "extra-loose": "3",
      },
      // Tailwind's default opacity scale doesn't include 15 (only 0/5/10/20/25/30/...) — the
      // /15 modifier used across the restyled sidebar/cards silently generated no CSS at all
      // without this, even though it looks like valid Tailwind syntax.
      opacity: {
        15: "0.15",
      },
      colors: {
        "sky-blue": {
          200: "#A3E4F3",
          400: "#3BD0F2",
        },
        "dark-blue": {
          400: "#232A3A",
          600: "#0a0f2e",
        },
        mint: {
          100: "#D0FBF0",
          400: "#1EE2AF",
        },
        gold: {
          100: "#FFF8D6",
          400: "#FFD44D",
        },
      },
    },
    fontFamily: {
      proxima: ["ProximaNova"],
    },
  },
  // Mantine's MantineProvider already applies its own global reset (withNormalizeCSS) across all
  // of mgmt-ui's existing pages. Disabling Tailwind's own preflight reset avoids the two fighting
  // over base element styles (margins, headings, form elements) on pages this round doesn't
  // touch. The one piece of preflight every `border`+color utility actually depends on (an
  // element-level `border-style: solid` default — without it, border-width/color render with no
  // visible effect at all) is added back narrowly in index.css instead of re-enabling the whole
  // reset.
  corePlugins: {
    preflight: false,
  },
};
