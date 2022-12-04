import * as React                from "react";
import {MgmtProvider}                       from "../../providers/MgmtProvider/MgmtProvider";
import {Lessons, LessonsProps} from "./Lessons";
import { Story }                            from "@storybook/react";

/**
 * Storybook component configuration
 */
export default {
  title: "Pages/Lessons",
  component: Lessons,
};

/**
 * Component storybook template
 */
const Template: Story<LessonsProps> = (args) => (
    <MgmtProvider>
      <div className="h-full w-full overscroll-none font-proxima">
        <Lessons {...args}/>
      </div>
    </MgmtProvider>
);

/**
 * Component stories
 */
export const Component: Story<LessonsProps> = Template.bind({});
Component.args = {};
