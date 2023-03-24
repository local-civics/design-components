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
        taskId: "1",
        title: "5.3 minor release (September 2022)",
        description: "Form context management, Switch, Grid and Indicator components improvements, new hook and 10+ other changes",
        href: "",
        users: [{name: "Jane Doe"}, {name: "Peter Pop"}, {name: "Felona Moldova"}, {name: "Eric Bell"}],
    },
    {
        taskId: "2",
        title: "5.4 minor release (October 2022)",
        description: "Form context management, Switch, Grid and Indicator components improvements, new hook and 10+ other changes. And more description demonstrating the wrapping of text",
        isComplete: false,
        href: "",
        users: [{name: "Jane Doe"}, {name: "Peter Pop"}, {name: "Felona Moldova"}, {name: "Eric Bell"}],
    },
    {
        taskId: "3",
        title: "5.5 minor release (November 2022)",
        description: "Form context management, Switch, Grid and Indicator components improvements, new hook and 10+ other changes",
        href: "",
        users: [{name: "Jane Doe"}, {name: "Peter Pop"}, {name: "Felona Moldova"}, {name: "Eric Bell"}],
    },
    {
        taskId: "4",
        title: "5.6 minor release (November 2022)",
        description: "Form context management, Switch, Grid and Indicator components improvements, new hook and 10+ other changes",
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
                   firstName="Jane"
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
