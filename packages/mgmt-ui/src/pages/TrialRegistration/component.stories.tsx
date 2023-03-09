import * as React                                         from "react";
import { TrialRegistration, TrialRegistrationProps } from "./TrialRegistration";
import { Story }                                          from "@storybook/react";

/**
 * Storybook component configuration
 */
export default {
  title: "Pages/TrialRegistration",
  component: TrialRegistration,
};

/**
 * Component storybook template
 */
const Template: Story<TrialRegistrationProps> = (args) => (
    <div className="h-full w-full overscroll-none font-proxima">
        <TrialRegistration
            {...args}
           organizations={[
               {organizationId: "1", displayName: "Result #1"},
               {organizationId: "2", displayName: "Result #2"},
               {organizationId: "3", displayName: "Result #3"},
           ]}
        />
        {/*<img className="object-cover w-screen h-screen" alt="landing" src="https://cdn.localcivics.io/hub/landing.jpg" />*/}
    </div>
);

/**
 * Component stories
 */
export const Component: Story<TrialRegistrationProps> = Template.bind({});
Component.args = {};
