import React from "react";
import { Story } from "@storybook/react";
import { HoursList, HoursListProps } from "./HoursList";

/**
 * Storybook component configuration
 */
export default {
  title: "Library/HoursList",
  component: HoursList,
};

/**
 * Component storybook template
 */
const Template: Story<HoursListProps> = (args) => (
  <div style={{ width: 860 }}>
    <HoursList {...args} />
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
export const Component: Story<HoursListProps> = Template.bind({});
Component.args = {
  pathways,
  entries: [
    {
      entryId: "e1",
      revision: 2,
      createdAt: "2026-11-03T14:20:00Z",
      status: "invalidated",
      activityDate: "2026-11-02",
      hostName: "Rose Pantry",
      activityType: "Community Service",
      minutes: 150,
      description: "Sorted and packed donations for the weekend food drive and helped load the delivery truck.",
      contactPerson: "Pat Lee",
      pathwayId: "civic-readiness",
      categoryId: "2b",
      supports: "Civic Readiness · 2b. Service-Learning Project",
      pathwayTitle: "Civic Readiness",
      categoryName: "2b. Service-Learning Project",
      evidenceUrl: "https://cdn.localcivics.io/v1/store/example/proof.pdf",
      reviewNote: "The supervisor signature is missing. Add a letter or photo that shows it.",
    },
    {
      entryId: "e2",
      revision: 3,
      createdAt: "2026-10-19T10:00:00Z",
      status: "verified",
      activityDate: "2026-10-18",
      hostName: "Riverside Library",
      activityType: "Community Service",
      minutes: 90,
      description: "Ran the reading hour for first graders.",
      supports: "Civic Readiness",
      pathwayTitle: "Civic Readiness",
      pathwayId: "civic-readiness",
    },
    {
      entryId: "e3",
      revision: 1,
      createdAt: "2026-10-31T10:00:00Z",
      status: "pending",
      activityDate: "2026-10-30",
      hostName: "Oak Street Garden",
      activityType: "Project",
      minutes: 45,
      description: "Planted beds with the neighborhood association.",
      evidenceUrl: "https://example.org/garden-photo",
    },
    {
      entryId: "e4",
      revision: 2,
      createdAt: "2026-09-13T10:00:00Z",
      status: "withdrawn",
      activityDate: "2026-09-12",
      hostName: "Hope Shelter",
      activityType: "Community Service",
      minutes: 20,
    },
    {
      entryId: "e5",
      revision: 1,
      createdAt: "2026-11-02T09:30:00Z",
      status: "pending",
      activityDate: "2026-11-01",
      hostName: "Spring Recital, Jefferson High Auditorium",
      activityType: "Composition",
      minutes: 180,
      description: "Performed my own arrangement of a Gershwin prelude for the spring recital.",
      supports: "Arts Pathway · 3a. Performance",
      pathwayTitle: "Arts Pathway",
      categoryName: "3a. Performance",
      pathwayId: "arts",
      categoryId: "3a",
      evidenceUrl: "https://cdn.localcivics.io/v1/store/example/recital.mp4",
    },
    {
      entryId: "e6",
      revision: 2,
      createdAt: "2026-10-23T10:00:00Z",
      status: "verified",
      activityDate: "2026-10-22",
      hostName: "Red Cross, Riverside Chapter",
      activityType: "Training",
      minutes: 375,
      description: "First aid and CPR certification course.",
      supports: "Civic Readiness · 2b. Service-Learning Project",
      pathwayTitle: "Civic Readiness",
      categoryName: "2b. Service-Learning Project",
      pathwayId: "civic-readiness",
      categoryId: "2b",
      evidenceUrl: "https://cdn.localcivics.io/v1/store/example/certificate.pdf",
    },
    {
      entryId: "e7",
      revision: 1,
      createdAt: "2026-10-29T08:00:00Z",
      status: "pending",
      activityDate: "2026-10-28",
      hostName: "Studio Session, Jefferson High",
      activityType: "Other",
      minutes: 120,
      description: "Extra studio session for the ear-training unit.",
    },
    {
      entryId: "e8",
      revision: 2,
      createdAt: "2026-10-12T10:00:00Z",
      status: "verified",
      activityDate: "2026-10-10",
      hostName: "Community Garden Co-op",
      activityType: "Community Service",
      minutes: 240,
      description: "Weekend work-based learning shift.",
      supports: "Civic Readiness · 2d. Extracurricular / Work-based Learning",
      pathwayTitle: "Civic Readiness",
      categoryName: "2d. Extracurricular / Work-based Learning",
      pathwayId: "civic-readiness",
      categoryId: "2d",
    },
    {
      entryId: "legacy-1",
      revision: 1,
      createdAt: "2026-04-10T00:00:00Z",
      status: "verified",
      activityDate: "2026-04-10",
      hostName: "",
      activityType: "Legacy total",
      minutes: 660,
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

export const Empty: Story<HoursListProps> = Template.bind({});
Empty.args = { entries: [] };

export const Loading: Story<HoursListProps> = Template.bind({});
Loading.args = { entries: [], loading: true };
