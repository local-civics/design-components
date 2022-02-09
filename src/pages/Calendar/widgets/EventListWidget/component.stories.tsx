import { Story } from "@storybook/react";
import { EventListWidget, EventListWidgetProps } from "./EventListWidget";

/**
 * Storybook component configuration
 */
export default {
  title: "Pending/Calendar/EventListWidget",
  component: EventListWidget,
  argTypes: {
    events: {
      defaultValue: [
        {
          courseName: "hcz",
          eventName: "1",
          residentName: "andre.carter",
          eventId: "hcz.event.0.top",
          title: "Voter Registration 101",
          summary: "An opportunity to engage on the platform and find new ways to impact your community.",
          location: {
            address: "200 Willoughby Ave",
            city: "Brooklyn",
            state: "NY",
            postalCode: "11205",
          },
          url: "https://www.localcivics.io",
          notBefore: new Date(),
          imageURL: "https://cdn.localcivics.io/area/policy-and-government.jpg",
          pathway: "policy & government",
          tags: ["area:policy & government", "skill:leadership", "skill:speaking", "skill:group"],
          status: "opportunity",
          proficiency: 250,
          order: "top",
        },
        {
          courseName: "hcz",
          eventId: "hcz.event.1.top",
          eventName: "2",
          residentName: "andre.carter",
          title: "Guess the Odd One Out",
          summary: "An opportunity to engage on the platform and find new ways to impact your community.",
          location: {
            address: "200 Willoughby Ave",
            city: "Brooklyn",
            state: "NY",
            postalCode: "11205",
          },
          notBefore: new Date(),
          url: "https://www.localcivics.io",
          imageURL: "https://cdn.localcivics.io/area/arts-and-culture.jpg",
          pathway: "arts & culture",
          tags: ["area:arts & culture"],
          status: "registered",
          proficiency: 250,
          order: "top",
        },
        {
          courseName: "hcz",
          eventId: "hcz.event.2.top",
          eventName: "3",
          residentName: "andre.carter",
          title: "Explore NYC Public Data - Your School",
          summary: "An opportunity to engage on the platform and find new ways to impact your community.",
          location: {
            address: "200 Willoughby Ave",
            city: "Brooklyn",
            state: "NY",
            postalCode: "11205",
          },
          notBefore: new Date(),
          url: "https://www.localcivics.io",
          imageURL: "https://cdn.localcivics.io/area/volunteer.jpg",
          pathway: "volunteer",
          tags: ["area:volunteer"],
          status: "opportunity",
          proficiency: 250,
          order: "top",
        },
      ],
    },
  },
};

/**
 * Component storybook template
 */
const Template: Story<EventListWidgetProps> = (args) => <EventListWidget {...args} />;

/**
 * Component view
 */
export const Component: Story<EventListWidgetProps> = Template.bind({});
Component.args = {};
