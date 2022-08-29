import * as React                                                               from "react";
import {ManagedProject, ManageProjects, ManageProjectsProps, ManageProjectsTab} from "./ManageProjects";
import { Story }                                                                from "@storybook/react";

/**
 * Storybook component configuration
 */
export default {
  title: "Admin/ManageProjects",
  component: ManageProjects,
};

/**
 * Component storybook template
 */
const Template: Story<ManageProjectsProps> = (args) => {
    const sleep = async (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

    const onTabChange = async (next: ManageProjectsTab) => {
        await sleep(1000)

        if(args.onTabChange){
            await args.onTabChange(next)
        }
    }

    const projects: ManagedProject[] = [{
        displayName: "Project #1",
        projectId: "P3orv6ygAHPWXsmtiqxBQf1t5cRCDQL1"
    },{
        displayName: "Project #2",
        projectId: "P3orv6ygAHPWXsmtiqxBQf1t5cRCDQL2"
    },{
        displayName: "Project #3",
        projectId: "P3orv6ygAHPWXsmtiqxBQf1t5cRCDQL3"
    },{
        displayName: "Project #5",
        projectId: "P3orv6ygAHPWXsmtiqxBQf1t5cRCDQL4"
    },{
        displayName: "Project #6",
        projectId: "P3orv6ygAHPWXsmtiqxBQf1t5cRCDQL5",
        workspace: true,
    },{
        displayName: "Project #7",
        projectId: "P3orv6ygAHPWXsmtiqxBQf1t5cRCDQL6"
    },{
        displayName: "Project #8",
        projectId: "P3orv6ygAHPWXsmtiqxBQf1t5cRCDQL7",
        installed: true,
    },{
        displayName: "Project #9",
        projectId: "P3orv6ygAHPWXsmtiqxBQf1t5cRCDQL8"
    }]

    return <div className="h-screen w-full overscroll-none font-proxima pt-10">
      <ManageProjects
          projects={projects}
          {...args}
          loading={null}
          onTabChange={onTabChange}
      />
  </div>
};

/**
 * Component stories
 */
export const Component: Story<ManageProjectsProps> = Template.bind({});
Component.args = {};
