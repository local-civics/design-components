import * as React                                                             from "react";
import {ManagedBucket, ManageBuckets, ManageBucketsProps, ManageBucketsTab} from "./ManageBuckets";
import { Story }                                                              from "@storybook/react";

/**
 * Storybook component configuration
 */
export default {
  title: "Admin/ManageBuckets",
  component: ManageBuckets,
};

/**
 * Component storybook template
 */
const Template: Story<ManageBucketsProps> = (args) => {
    const sleep = async (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

    const onTabChange = async (next: ManageBucketsTab) => {
        await sleep(1000)

        if(args.onTabChange){
            await args.onTabChange(next)
        }
    }

    const buckets: ManagedBucket[] = [{
        displayName: "Bucket #1",
        bucketId: "P3orv6ygAHPWXsmtiqxBQf1t5cRCDQL1"
    },{
        displayName: "Bucket #2",
        bucketId: "P3orv6ygAHPWXsmtiqxBQf1t5cRCDQL2"
    },{
        displayName: "Bucket #3",
        bucketId: "P3orv6ygAHPWXsmtiqxBQf1t5cRCDQL3"
    },{
        displayName: "Bucket #5",
        bucketId: "P3orv6ygAHPWXsmtiqxBQf1t5cRCDQL4"
    },{
        displayName: "Bucket #6",
        bucketId: "P3orv6ygAHPWXsmtiqxBQf1t5cRCDQL5",
        workspace: true,
    },{
        displayName: "Bucket #7",
        bucketId: "P3orv6ygAHPWXsmtiqxBQf1t5cRCDQL6"
    },{
        displayName: "Bucket #8",
        bucketId: "P3orv6ygAHPWXsmtiqxBQf1t5cRCDQL7",
        installed: true,
    },{
        displayName: "Bucket #9",
        bucketId: "P3orv6ygAHPWXsmtiqxBQf1t5cRCDQL8"
    }]

    return <div className="h-screen w-full overscroll-none font-proxima pt-10">
      <ManageBuckets
          buckets={buckets}
          {...args}
          loading={null}
          onTabChange={onTabChange}
      />
  </div>
};

/**
 * Component stories
 */
export const Component: Story<ManageBucketsProps> = Template.bind({});
Component.args = {};
