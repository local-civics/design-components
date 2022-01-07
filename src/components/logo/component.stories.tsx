import { Logo, LogoProps } from ".";
import { Story } from "@storybook/react";

/**
 * Storybook component configuration
 */
export default {
  title: "Basics/Logo",
  component: Logo,
  argTypes: {
    variant: {
      defaultValue: "localcivics",
    },
  },
};

/**
 * Component storybook template
 */
const Template: Story<LogoProps> = (args) => <Logo className="w-48" {...args} />;

/**
 * Component stories
 */
export const Default: Story<LogoProps> = Template.bind({});
Default.args = {};
