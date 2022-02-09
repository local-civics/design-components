import { Story } from "@storybook/react";
import { ImpactWidget, ImpactWidgetProps } from "./ImpactWidget";

/**
 * Storybook component configuration
 */
export default {
  title: "Profile/ImpactWidget",
  component: ImpactWidget,
};

/**
 * Component storybook template
 */
const Template: Story<ImpactWidgetProps> = (args) => (
  <ImpactWidget magnitude={2} proficiency={3500} nextProficiency={4000} {...args} />
);

/**
 * Component view
 */
export const Component: Story<ImpactWidgetProps> = Template.bind({});
Component.args = {};
