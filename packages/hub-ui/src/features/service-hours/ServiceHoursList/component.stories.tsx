import React from "react";
import { Story } from "@storybook/react";
import { ServiceHoursList, ServiceHoursListProps } from "./ServiceHoursList";

/**
 * Storybook component configuration
 */
export default {
  title: "Library/ServiceHoursList",
  component: ServiceHoursList,
};

/**
 * Component storybook template
 */
const Template: Story<ServiceHoursListProps> = (args) => (
  <div style={{ width: 860 }}>
    <ServiceHoursList {...args} />
  </div>
);

const pathways = [
  {
    pathwayId: "civic-readiness",
    title: "Civic Readiness",
    categories: [
      { categoryId: "2b", name: "2b. Service-Learning Project" },
      { categoryId: "2d", name: "2d. Extracurricular / Work-based Learning" },
    ],
  },
  { pathwayId: "digital-citizenship", title: "Digital Citizenship" },
];

/**
 * Component stories
 */
export const Component: Story<ServiceHoursListProps> = Template.bind({});
Component.args = {
  pathways,
  entries: [
    {
      entryId: "e1",
      revision: 2,
      status: "invalidated",
      serviceDate: "2026-11-02",
      hostName: "Rose Pantry",
      serviceType: "Community Service",
      hours: 4,
      description: "Sorted and packed donations for the weekend food drive and helped load the delivery truck.",
      contactPerson: "Pat Lee",
      pathwayId: "civic-readiness",
      categoryId: "2b",
      supports: "Civic Readiness · 2b. Service-Learning Project",
      evidenceUrl: "https://cdn.localcivics.io/v1/store/example/proof.pdf",
      reviewNote: "The supervisor signature is missing. Add a letter or photo that shows it.",
    },
    {
      entryId: "e2",
      revision: 3,
      status: "verified",
      serviceDate: "2026-10-18",
      hostName: "Riverside Library",
      serviceType: "Community Service",
      hours: 3,
      description: "Ran the reading hour for first graders.",
      supports: "Civic Readiness",
      pathwayId: "civic-readiness",
    },
    {
      entryId: "e3",
      revision: 1,
      status: "pending",
      serviceDate: "2026-10-30",
      hostName: "Oak Street Garden",
      serviceType: "Project",
      hours: 2,
      description: "Planted beds with the neighborhood association.",
      evidenceUrl: "https://example.org/garden-photo",
    },
    {
      entryId: "e4",
      revision: 2,
      status: "withdrawn",
      serviceDate: "2026-09-12",
      hostName: "Hope Shelter",
      serviceType: "Community Service",
      hours: 1,
    },
    {
      entryId: "legacy-1",
      revision: 1,
      status: "pending",
      serviceDate: "2026-04-10",
      hostName: "",
      serviceType: "Legacy total",
      hours: 11,
      description: "Hours logged before individual entries were tracked.",
      isLegacy: true,
    },
  ],
  onEdit: (entry, responses) => {
    console.log("edit", entry.entryId, responses);
    return new Promise((resolve) => setTimeout(resolve, 600));
  },
  onWithdraw: (entry) => {
    console.log("withdraw", entry.entryId);
    return new Promise((resolve) => setTimeout(resolve, 600));
  },
  onPathwayChange: (pathwayId) => console.log("pathway", pathwayId),
};

export const Empty: Story<ServiceHoursListProps> = Template.bind({});
Empty.args = { entries: [] };

export const Loading: Story<ServiceHoursListProps> = Template.bind({});
Loading.args = { entries: [], loading: true };
