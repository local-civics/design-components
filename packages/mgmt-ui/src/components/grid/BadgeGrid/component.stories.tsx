import * as React                                                                        from "react";
import {MemoryRouter}                        from "react-router-dom";
import {BadgeGrid, BadgeGridProps, TaskCard} from "./BadgeGrid";
import { Story }                             from "@storybook/react";

/**
 * Storybook component configuration
 */
export default {
  title: "Components/BadgeGrid",
  component: BadgeGrid,
};

const mockdata = [
    {
        title: "5.3 minor release (September 2022)",
        description: "Form context management, Switch, Grid and Indicator components improvements, new hook and 10+ other changes",
        lessonsCompleted: 36,
        lessonsTotal: 36,
        href: "",
    },
    {
        title: "5.4 minor release (October 2022)",
        description: "Form context management, Switch, Grid and Indicator components improvements, new hook and 10+ other changes",
        lessonsCompleted: 23,
        lessonsTotal: 36,
        href: "",
    },
    {
        title: "5.5 minor release (November 2022)",
        description: "Form context management, Switch, Grid and Indicator components improvements, new hook and 10+ other changes",
        lessonsCompleted: 23,
        lessonsTotal: 36,
        href: "",
    },
]

/**
 * Component storybook template
 */
const Template: Story<BadgeGridProps> = (args) => (
  <div className="h-full w-full overscroll-none font-proxima">
      <MemoryRouter>
        <BadgeGrid {...args} badges={args.badges || mockdata}/>
      </MemoryRouter>
  </div>
);

/**
 * Component stories
 */
export const Component: Story<BadgeGridProps> = Template.bind({});
Component.args = {};
