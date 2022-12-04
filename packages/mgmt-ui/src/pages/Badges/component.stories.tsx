import * as React                from "react";
import {MgmtProvider}                      from "../../providers/MgmtProvider/MgmtProvider";
import {Badges, BadgesProps} from "./Badges";
import { Story }                           from "@storybook/react";

/**
 * Storybook component configuration
 */
export default {
  title: "Pages/Badges",
  component: Badges,
};

/**
 * Component storybook template
 */
const Template: Story<BadgesProps> = (args) => (
    <MgmtProvider>
      <div className="h-full w-full overscroll-none font-proxima">
        <Badges {...args}/>
      </div>
    </MgmtProvider>
);

/**
 * Component stories
 */
export const Component: Story<BadgesProps> = Template.bind({});
Component.args = {};
