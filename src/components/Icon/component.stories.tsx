import { Icon, IconProps } from "./Icon";

import { Story } from "@storybook/react";

/**
 * Storybook component configuration
 */
export default {
  title: "Library/Icon",
  component: Icon,
  argTypes: {
    name: {
      defaultValue: "calendar",
    },
  },
};

/**
 * Component storybook template
 */
const Template: Story<IconProps> = (args) => (
  <div className="transition ease-in-out text-slate-400 w-12 h-12">
    <Icon {...args} />
  </div>
);

/**
 * Component icon view
 */
export const Component: Story<IconProps> = Template.bind({});
Component.args = {};
