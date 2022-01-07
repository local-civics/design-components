import { Icon, IconProps } from ".";

import { Story } from "@storybook/react";

/**
 * Storybook component configuration
 */
export default {
  title: "Basics/Icon",
  component: Icon,
  argTypes: {
    icon: {
      defaultValue: "calendar",
    },
  },
};

/**
 * Component storybook template
 */
const Template: Story<IconProps> = (args) => <Icon className="stroke-slate-500 fill-slate-500 w-12 h-12" {...args} />;

/**
 * Default icon view
 */
export const Default: Story<IconProps> = Template.bind({});
Default.args = {};
