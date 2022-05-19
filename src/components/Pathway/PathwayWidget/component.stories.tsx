import { Story } from "@storybook/react";
import { PathwayProgress } from "../PathwayProgress/PathwayProgress";
import { PathwayWidget, PathwayWidgetProps } from "./PathwayWidget";

/**
 * Storybook component configuration
 */
export default {
  title: "Library/Pathway/PathwayWidget",
  component: PathwayWidget,
};

/**
 * Component storybook template
 */
const Template: Story<PathwayWidgetProps> = (args) => (
  <PathwayWidget {...args}>
    <PathwayProgress title="college & career" icon="college & career" />
    <PathwayProgress title="policy & government" icon="policy & government" />
    <PathwayProgress title="arts & culture" icon="arts & culture" />
    <PathwayProgress title="volunteer" icon="volunteer" />
    <PathwayProgress title="recreation" icon="recreation" />
  </PathwayWidget>
);

/**
 * Component view
 */
export const Component: Story<PathwayWidgetProps> = Template.bind({});
Component.args = {};
