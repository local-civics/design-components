import * as React        from "react";
import {MemoryRouter}         from "react-router-dom";
import {TrialHome, TrialHomeProps} from "./TrialHome";
import { Story }              from "@storybook/react";

/**
 * Storybook component configuration
 */
export default {
  title: "Pages/TrialHome",
  component: TrialHome,
};

const mockdata = [
    {
        title: "5.3 minor release (September 2022)",
        description: "Form context management, Switch, Grid and Indicator components improvements, new hook and 10+ other changes",
        lessonsCompleted: 36,
        lessonsTotal: 36,
        href: "",
        users: [{name: "Jane Doe"}, {name: "Peter Pop"}, {name: "Felona Moldova"}, {name: "Eric Bell"}],
    },
    {
        title: "5.4 minor release (October 2022)",
        description: "Form context management, Switch, Grid and Indicator components improvements, new hook and 10+ other changes",
        lessonsCompleted: 23,
        lessonsTotal: 36,
        href: "",
        users: [{name: "Jane Doe"}, {name: "Peter Pop"}, {name: "Felona Moldova"}, {name: "Eric Bell"}],
    },
    {
        title: "5.5 minor release (November 2022)",
        description: "Form context management, Switch, Grid and Indicator components improvements, new hook and 10+ other changes",
        lessonsCompleted: 23,
        lessonsTotal: 36,
        href: "",
        users: [{name: "Jane Doe"}, {name: "Peter Pop"}, {name: "Felona Moldova"}, {name: "Eric Bell"}],
    },
]

/**
 * Component storybook template
 */
const Template: Story<TrialHomeProps> = (args) => (
  <div className="h-full w-full overscroll-none font-proxima">
      <MemoryRouter>
        <TrialHome {...args}
                   name={args.name || "Jane McDowell"}
                   daysRemaining={args.daysRemaining || 0}
                   badges={args.badges || mockdata}
        />
      </MemoryRouter>
  </div>
);

/**
 * Component stories
 */
export const Component: Story<TrialHomeProps> = Template.bind({});
Component.args = {};
