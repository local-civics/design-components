import * as React                                                         from "react";
import {Bundle, ListBundles, ListBundlesProps, ListBundlesTab} from "./ListBundles";
import { Story }                                                          from "@storybook/react";

/**
 * Storybook component configuration
 */
export default {
  title: "Admin/Bundles/ListBundles",
  component: ListBundles,
};

/**
 * Component storybook template
 */
const Template: Story<ListBundlesProps> = (args) => {
    const sleep = async (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

    const onTabChange = async (next: ListBundlesTab) => {
        await sleep(1000)

        if(args.onTabChange){
            await args.onTabChange(next)
        }
    }

    const bundles: Bundle[] = [{
        displayName: "Bundle #1",
        bundleId: "P3orv6ygAHPWXsmtiqxBQf1t5cRCDQL1"
    },{
        displayName: "Bundle #2",
        bundleId: "P3orv6ygAHPWXsmtiqxBQf1t5cRCDQL2"
    },{
        displayName: "Bundle #3",
        bundleId: "P3orv6ygAHPWXsmtiqxBQf1t5cRCDQL3"
    },{
        displayName: "Bundle #5",
        bundleId: "P3orv6ygAHPWXsmtiqxBQf1t5cRCDQL4"
    },{
        displayName: "Bundle #6",
        bundleId: "P3orv6ygAHPWXsmtiqxBQf1t5cRCDQL5",
        workspace: true,
    },{
        displayName: "Bundle #7",
        bundleId: "P3orv6ygAHPWXsmtiqxBQf1t5cRCDQL6"
    },{
        displayName: "Bundle #8",
        bundleId: "P3orv6ygAHPWXsmtiqxBQf1t5cRCDQL7",
        installed: true,
    },{
        displayName: "Bundle #9",
        bundleId: "P3orv6ygAHPWXsmtiqxBQf1t5cRCDQL8"
    }]

    return <div className="h-screen w-full overscroll-none font-proxima pt-10">
      <ListBundles
          bundles={bundles}
          {...args}
          onTabChange={onTabChange}
      />
  </div>
};

/**
 * Component stories
 */
export const Component: Story<ListBundlesProps> = Template.bind({});
Component.args = {};
