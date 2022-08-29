import * as React from "react";
import { Story } from "@storybook/react";

import { Icon, IconProps, iconNames } from "./Icon";

/**
 * Storybook component configuration
 */
export default {
  title: "Admin/Icon",
  component: Icon,
  argTypes: {
    name: {
      table: {
        disable: true,
      },
    },
  },
};

/**
 * Component storybook template
 */
const Template: Story<IconProps> = (args) => (
  <div className="grid grid-cols-8 gap-x-3 gap-y-6">
    {iconNames.map((icon) => (
      <div key={icon} className="transition ease-in-out text-slate-400 w-8 h-8">
        <Icon {...args} name={icon} />
      </div>
    ))}
  </div>
);

/**
 * Component icon view
 */
export const Component: Story<IconProps> = Template.bind({});
Component.args = {};
