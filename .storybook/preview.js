import "../src/index.css";
import { addDecorator } from "@storybook/react";
import { MemoryRouter } from "react-router-dom";
import { mockApi } from "./mock";

addDecorator((Story) => {
  mockApi();
  return (
    <MemoryRouter>
      <Story />
    </MemoryRouter>
  );
});

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
      order: ["Basics", "Containers"],
    },
  },
};
