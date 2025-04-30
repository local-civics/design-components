import * as React            from "react";
import {MemoryRouter}        from "react-router-dom";
import {Pathways, PathwaysProps} from "./Pathways";
import { Story }             from "@storybook/react";

/**
 * Storybook component configuration
 */
export default {
  title: "Pages/Pathways",
  component: Pathways,
};

/**
 * Component storybook template
 */
const Template: Story<PathwaysProps> = (args) => (
    <div className="h-full w-full overscroll-none font-proxima">
        <MemoryRouter>
            <Pathways
                {...args}
                pathways={args.pathways || []}
            />
        </MemoryRouter>
    </div>
);

/**
 * Component stories
 */
export const Component: Story<PathwaysProps> = Template.bind({});
Component.args = {};
