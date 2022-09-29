import * as React                                                         from "react";
import {Organization, ListOrganizations, ListOrganizationsProps} from "./ListOrganizations";
import { Story }                                                          from "@storybook/react";

/**
 * Storybook component configuration
 */
export default {
  title: "Admin/Organizations/ListOrganizations",
  component: ListOrganizations,
};

/**
 * Component storybook template
 */
const Template: Story<ListOrganizationsProps> = (args) => {
    const organizations: Organization[] = [{
        displayName: "Organization #1",
        organizationId: "P3orv6ygAHPWXsmtiqxBQf1t5cRCDQL1"
    },{
        displayName: "Organization #2",
        organizationId: "P3orv6ygAHPWXsmtiqxBQf1t5cRCDQL2"
    },{
        displayName: "Organization #3",
        organizationId: "P3orv6ygAHPWXsmtiqxBQf1t5cRCDQL3"
    },{
        displayName: "Organization #4",
        organizationId: "P3orv6ygAHPWXsmtiqxBQf1t5cRCDQL4"
    }]

    return <div className="h-screen w-full overscroll-none font-proxima pt-10">
      <ListOrganizations
          organizations={organizations}
          {...args}
      />
  </div>
};

/**
 * Component stories
 */
export const Component: Story<ListOrganizationsProps> = Template.bind({});
Component.args = {};
