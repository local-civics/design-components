import * as React                             from "react";
import { GettingStarted, GettingStartedProps } from "./GettingStarted";
import { Story }                              from "@storybook/react";

/**
 * Storybook component configuration
 */
export default {
  title: "Components/GettingStarted",
  component: GettingStarted,
};

/**
 * Component storybook template
 */
const Template: Story<GettingStartedProps> = (args) => (
    <div className="h-full w-full overscroll-none font-proxima">
        <GettingStarted {...args} videoURL={args.videoURL || "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"} opened/>
    </div>
);

/**
 * Component stories
 */
export const Component: Story<GettingStartedProps> = Template.bind({});
Component.args = {};
