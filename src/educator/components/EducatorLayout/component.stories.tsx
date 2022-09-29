import React from "react";
import {EducatorLayout, EducatorLayoutProps} from "./EducatorLayout";
import { Story } from "@storybook/react";

/**
 * Storybook component configuration
 */
export default {
  title: "Educator/Library/EducatorLayout",
  component: EducatorLayout,
};

/**
 * Component storybook template
 */
const Template: Story<EducatorLayoutProps> = (args) => {
    return <EducatorLayout
        givenName="Jane"
        familyName="Doe"
        avatarURL="https://lh3.googleusercontent.com/a/AATXAJxa0wMhHpAMrAYKsXkB5Dr8ydbIB4oSYWINowvc=s96-c"
        {...args}
    />
};

/**
 * Component stories
 */
export const Component: Story<EducatorLayoutProps> = Template.bind({});
Component.args = {};