import * as React                                                           from "react";
import {ManagedOrganization, ManageOrganizations, ManageOrganizationsProps} from "./ManageOrganizations";
import { Story }                                                            from "@storybook/react";

/**
 * Storybook component configuration
 */
export default {
  title: "Admin/ManageOrganizations",
  component: ManageOrganizations,
};

/**
 * Component storybook template
 */
const Template: Story<ManageOrganizationsProps> = (args) => {
    const organizations: ManagedOrganization[] = [{
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
      <ManageOrganizations
          organizations={organizations}
          {...args}
          loading={null}
      />
  </div>
};

/**
 * Component stories
 */
export const Component: Story<ManageOrganizationsProps> = Template.bind({});
Component.args = {};
