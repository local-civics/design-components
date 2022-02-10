import "../src/index.css";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  a11y: {
    // the target DOM element
    element: "#root",
    // sets the execution mode for the addon
    manual: false,
  },
  options: {
    storySort: {
      order: ["Pages", "Widgets", "Modals", "Boards", "Workflows", "Contexts", "Library"],
    },
  },
};
