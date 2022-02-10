import { Story } from "@storybook/react";
import { ActivityProgress } from "../../components/ActivityProgress/ActivityProgress";
import { PathwayWidget, PathwayWidgetProps } from "./PathwayWidget";

/**
 * Storybook component configuration
 */
export default {
  title: "Widgets/PathwayWidget",
  component: PathwayWidget,
};

/**
 * Component storybook template
 */
const Template: Story<PathwayWidgetProps> = (args) => (
  <PathwayWidget {...args}>
    <ActivityProgress title="college & career" icon="college & career" />
    <ActivityProgress title="policy & government" icon="policy & government" />
    <ActivityProgress title="arts & culture" icon="arts & culture" />
    <ActivityProgress title="volunteer" icon="volunteer" />
    <ActivityProgress title="recreation" icon="recreation" />
  </PathwayWidget>
);

/**
 * Component view
 */
export const Component: Story<PathwayWidgetProps> = Template.bind({});
Component.args = {};
