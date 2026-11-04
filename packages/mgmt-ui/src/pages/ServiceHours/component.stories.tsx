import React from "react";
import { Story } from "@storybook/react";
import { ServiceHours, ServiceHoursProps, ServiceHourReviewItem } from "./ServiceHours";
import { AdminProvider } from "../../providers/AdminProvider/AdminProvider";

/**
 * Storybook component configuration
 */
export default {
  title: "Pages/ServiceHours",
  component: ServiceHours,
};

/**
 * Component storybook template. Keeps the entries in state and answers approve / invalidate the way
 * the app does (after a short delay, with the entry the "server" returns), so a change is visible.
 */
const Template: Story<ServiceHoursProps> = (args) => {
  const [items, setItems] = React.useState<ServiceHourReviewItem[]>(args.items || []);
  const update = (entryId: string, patch: Partial<ServiceHourReviewItem>) =>
    new Promise((resolve) =>
      setTimeout(() => {
        setItems((list) => list.map((i) => (i.entryId === entryId ? { ...i, ...patch, revision: i.revision + 1 } : i)));
        resolve(undefined);
      }, 500)
    );

  return (
    <AdminProvider>
      <ServiceHours
        {...args}
        items={items}
        onApprove={(item) => update(item.entryId, { status: "verified", reviewNote: "" })}
        onInvalidate={(item, reason) => update(item.entryId, { status: "invalidated", reviewNote: reason })}
        onStudentClick={(userId) => console.log("student", userId)}
      />
    </AdminProvider>
  );
};

const items: ServiceHourReviewItem[] = [
  {
    entryId: "e1",
    revision: 1,
    userId: "u1",
    studentName: "Akinola Akintayo",
    status: "pending",
    serviceDate: "2026-11-02",
    hostName: "Rose Pantry",
    serviceType: "Community Service",
    hours: 4,
    description: "Sorted and packed donations for the weekend food drive and helped load the delivery truck.",
    contactPerson: "Pat Lee",
    contactPhone: "555-0100",
    contactEmail: "pat@example.org",
    supports: "Civic Readiness · 2b. Service-Learning Project",
    evidenceUrl: "https://cdn.localcivics.io/v1/store/example/proof.pdf",
    createdAt: "2026-11-03T14:20:00Z",
  },
  {
    entryId: "e2",
    revision: 3,
    userId: "u2",
    studentName: "Colin Test",
    status: "pending",
    serviceDate: "2026-10-30",
    hostName: "Oak Street Garden",
    serviceType: "Project",
    hours: 2,
    description: "Planted beds with the neighborhood association.",
    reviewNote: "The supervisor signature is missing.",
    editedAt: "2026-11-02T09:00:00Z",
    createdAt: "2026-10-31T10:00:00Z",
  },
  {
    entryId: "e3",
    revision: 2,
    userId: "u1",
    studentName: "Akinola Akintayo",
    status: "verified",
    serviceDate: "2026-10-18",
    hostName: "Riverside Library",
    serviceType: "Community Service",
    hours: 3,
    description: "Ran the reading hour for first graders.",
    supports: "Civic Readiness",
    createdAt: "2026-10-19T10:00:00Z",
  },
  {
    entryId: "e4",
    revision: 4,
    userId: "u3",
    studentName: "Test Three",
    status: "invalidated",
    serviceDate: "2026-10-05",
    hostName: "Hope Shelter",
    serviceType: "Community Service",
    hours: 6,
    description: "Served meals.",
    reviewNote: "Six hours in one day is more than the shelter was open. Please check the date.",
    createdAt: "2026-10-06T10:00:00Z",
  },
  {
    entryId: "e5",
    revision: 2,
    userId: "u3",
    studentName: "Test Three",
    status: "withdrawn",
    serviceDate: "2026-09-12",
    hostName: "Hope Shelter",
    serviceType: "Community Service",
    hours: 1,
    createdAt: "2026-09-13T10:00:00Z",
  },
  {
    entryId: "legacy-1",
    revision: 1,
    userId: "u2",
    studentName: "Colin Test",
    status: "pending",
    serviceDate: "2026-04-10",
    hostName: "",
    serviceType: "Legacy total",
    hours: 11,
    description: "Hours logged before individual entries were tracked.",
    createdAt: "2026-04-10T10:00:00Z",
  },
];

/**
 * Component stories
 */
export const Component: Story<ServiceHoursProps> = Template.bind({});
Component.args = { loading: false, items: [] };

export const Mock: Story<ServiceHoursProps> = Template.bind({});
Mock.args = { loading: false, items, hasMore: true };

export const Loading: Story<ServiceHoursProps> = Template.bind({});
Loading.args = { loading: true, items: [] };
