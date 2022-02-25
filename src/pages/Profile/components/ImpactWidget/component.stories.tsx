import { Story } from "@storybook/react";
import { ImpactWidget, ImpactWidgetProps } from "./ImpactWidget";

/**
 * Storybook component configuration
 */
export default {
  title: "Library/Profile/ImpactWidget",
  component: ImpactWidget,
};

/**
 * Component storybook template
 */
const Template: Story<ImpactWidgetProps> = (args) => (
  <ImpactWidget degree={2} quality={3500} nextPromotion={4000} {...args} />
);

/**
 * Component view
 */
export const Component: Story<ImpactWidgetProps> = Template.bind({});
Component.args = {};
