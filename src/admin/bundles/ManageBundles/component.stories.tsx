import * as React                                                           from "react";
import {ManagedBundle, ManageBundles, ManageBundlesProps, ManageBundlesTab} from "./ManageBundles";
import { Story }                                                            from "@storybook/react";

/**
 * Storybook component configuration
 */
export default {
  title: "Admin/ManageBundles",
  component: ManageBundles,
};

/**
 * Component storybook template
 */
const Template: Story<ManageBundlesProps> = (args) => {
    const sleep = async (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

    const onTabChange = async (next: ManageBundlesTab) => {
        await sleep(1000)

        if(args.onTabChange){
            await args.onTabChange(next)
        }
    }

    const bundles: ManagedBundle[] = [{
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
      <ManageBundles
          bundles={bundles}
          {...args}
          loading={null}
          onTabChange={onTabChange}
      />
  </div>
};

/**
 * Component stories
 */
export const Component: Story<ManageBundlesProps> = Template.bind({});
Component.args = {};
