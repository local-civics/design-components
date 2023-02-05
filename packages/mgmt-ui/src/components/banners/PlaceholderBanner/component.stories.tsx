import * as React                        from "react";
import { Story }                                  from "@storybook/react";
import {PlaceholderBanner, PlaceholderBannerProps} from "./PlaceholderBanner";

/**
 * Storybook component configuration
 */
export default {
  title: "Components/PlaceholderBanner",
  component: PlaceholderBanner,
};

/**
 * Component storybook template
 */
const Template: Story<PlaceholderBannerProps> = (args) => (
    <div className="h-full w-full overscroll-none font-proxima">
        <PlaceholderBanner {...args} />
    </div>
);

/**
 * Component stories
 */
export const Component: Story<PlaceholderBannerProps> = Template.bind({});
Component.args = {};
