import * as React                        from "react";
import {MemoryRouter}                    from "react-router-dom";
import {Organization, OrganizationProps} from "./Organization";
import { Story }                         from "@storybook/react";

/**
 * Storybook component configuration
 */
export default {
  title: "Pages/Organization",
  component: Organization,
};

/**
 * Component storybook template
 */
const Template: Story<OrganizationProps> = (args) => (
    <div className="h-full w-full overscroll-none font-proxima">
        <MemoryRouter>
            <Organization
                {...args}
                percentageOfAccountsActive={args.percentageOfAccountsActive||0}
                numberOfStudents={300}
                numberOfEducators={15}
                displayName={args.displayName || "Local Civics University"}
                description={args.description || "Organization focused on the history of the United States"}
            />
        </MemoryRouter>
    </div>
);

/**
 * Component stories
 */
export const Component: Story<OrganizationProps> = Template.bind({});
Component.args = {};
