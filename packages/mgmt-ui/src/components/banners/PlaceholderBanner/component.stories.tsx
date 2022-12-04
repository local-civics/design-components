import * as React                        from "react";
import {MgmtProvider}                    from "../../../providers/MgmtProvider/MgmtProvider";
import { Story }                                  from "@storybook/react";
import {PlaceholderBanner, PlaceholderBannerProps, PlaceholderBannerData} from "./PlaceholderBanner";

/**
 * Storybook component configuration
 */
export default {
  title: "Banners/PlaceholderBanner",
  component: PlaceholderBanner,
};

const mockdata: PlaceholderBannerData = {
    title: "Wait a minute...",
    icon: "kindergarten",
    description: "You will never miss important product updates, latest news and community QA sessions. Our newsletter is once a week, every Sunday.",
}
/**
 * Component storybook template
 */
const Template: Story<PlaceholderBannerProps> = (args) => (
    <MgmtProvider>
      <div className="h-full w-full overscroll-none font-proxima">
        <PlaceholderBanner {...args} data={args.data || mockdata}/>
      </div>
    </MgmtProvider>
);

/**
 * Component stories
 */
export const Component: Story<PlaceholderBannerProps> = Template.bind({});
Component.args = {};
