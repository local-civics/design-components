import React from "react";
import {EducatorLayout, EducatorLayoutProps, EducatorPageParams, EducatorPageName} from "./EducatorLayout";
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
    const onPageChange = async (next: EducatorPageName) => {
        if(args.onPageChange){
            await args.onPageChange(next)
        }
    }

    return <EducatorLayout
        givenName="Jane"
        familyName="Doe"
        avatarURL="https://lh3.googleusercontent.com/a/AATXAJxa0wMhHpAMrAYKsXkB5Dr8ydbIB4oSYWINowvc=s96-c"
        map={map} {...args}
        onPageChange={onPageChange}
    />
};

/**
 * Component stories
 */
export const Component: Story<EducatorLayoutProps> = Template.bind({});
Component.args = {};

const map = (params: EducatorPageParams) => {
    return <div className="w-full h-full bg-zinc-100 flex">
        <span className="m-auto w-max h-max font-bold">Content</span>
    </div>
}