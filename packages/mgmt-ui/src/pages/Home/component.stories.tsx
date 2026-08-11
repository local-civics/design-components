import * as React        from "react";
import {MemoryRouter}    from "react-router-dom";
import {AdminProvider}   from "../../providers/AdminProvider/AdminProvider";
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
 * Component storybook template. Wrapped in AdminProvider (Mantine's NotificationsProvider lives
 * there) since the copy-access-code button is a real showNotification call, same as before this
 * round's restyle - without this wrapper the toast has nowhere to portal into.
 */
const Template: Story<HomeProps> = (args) => (
  <AdminProvider><div className="h-full w-full overscroll-none font-proxima">
      <MemoryRouter>
        <Home {...args}
              name={args.name || "Jane McDowell"}
              impactStatement={args.impactStatement || "I want to equip my students with transformational leadership skills so they could make impact in their communities!"}
              organization={args.organization || {name: "Local Civics", description: "An example organization", website: "https://www.localcivics.io", image: "https://cdn.localcivics.io/hub/landing.jpg", accessCode: "ABC123"}}
        />
      </MemoryRouter>
  </div></AdminProvider>
);

/**
 * Component stories
 */
export const Component: Story<HomeProps> = Template.bind({});
Component.args = {};
