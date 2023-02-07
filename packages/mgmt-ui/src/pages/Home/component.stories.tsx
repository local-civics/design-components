import * as React        from "react";
import {MemoryRouter}    from "react-router-dom";
import {Home, HomeProps} from "./Home";
import { Story }         from "@storybook/react";

/**
 * Storybook component configuration
 */
export default {
  title: "Pages/Home",
  component: Home,
};

/**
 * Component storybook template
 */
const Template: Story<HomeProps> = (args) => (
  <div className="h-full w-full overscroll-none font-proxima">
      <MemoryRouter>
        <Home {...args}
              name={args.name || "Jane McDowell"}
              impactStatement={args.impactStatement || "I want to equip my students with transformational leadership skills so they could make impact in their communities!"}
              organization={args.organization || {name: "Local Civics", description: "An example organization", website: "https://www.localcivics.io", image: "https://cdn.localcivics.io/hub/landing.jpg"}}
        />
      </MemoryRouter>
  </div>
);

/**
 * Component stories
 */
export const Component: Story<HomeProps> = Template.bind({});
Component.args = {};
