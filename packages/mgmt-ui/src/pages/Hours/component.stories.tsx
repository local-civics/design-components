import React from "react";
import { Story } from "@storybook/react";
import { Hours, HoursProps, HourReviewItem } from "./Hours";
import { AdminProvider } from "../../providers/AdminProvider/AdminProvider";

/**
 * Storybook component configuration
 */
export default {
  title: "Pages/Hours",
  component: Hours,
};

/**
 * Component storybook template. Keeps the entries in state and answers approve / invalidate the way
 * the app does (after a short delay, with the entry the "server" returns), so a change is visible.
 */
const Template: Story<HoursProps> = (args) => {
  const [items, setItems] = React.useState<HourReviewItem[]>(args.items || []);
  const update = (entryId: string, patch: Partial<HourReviewItem>) =>
    new Promise((resolve) =>
      setTimeout(() => {
        setItems((list) => list.map((i) => (i.entryId === entryId ? { ...i, ...patch, revision: i.revision + 1 } : i)));
        resolve(undefined);
      }, 500)
    );

  return (
    <AdminProvider>
      <Hours
        {...args}
        items={items}
        onApprove={(item) => update(item.entryId, { status: "verified", reviewNote: "" })}
        onInvalidate={(item, reason) => update(item.entryId, { status: "invalidated", reviewNote: reason })}
        onBulkApprove={async (list) => {
          for (const item of list) {
            await update(item.entryId, { status: "verified", reviewNote: "" });
          }
        }}
        onStudentClick={(userId) => console.log("student", userId)}
      />
    </AdminProvider>
  );
};

const items: HourReviewItem[] = [
  {
    entryId: "e1",
    revision: 1,
    userId: "u1",
    studentName: "Akinola Akintayo",
    status: "pending",
    activityDate: "2026-11-02",
    hostName: "Rose Pantry",
    activityType: "Community Service",
    hours: 4,
    description: "Sorted and packed donations for the weekend food drive and helped load the delivery truck.",
    contactPerson: "Pat Lee",
    contactPhone: "555-0100",
    contactEmail: "pat@example.org",
    supports: "Civic Readiness · 2b. Service-Learning Project",
    pathwayId: "civic-readiness",
    categoryId: "2b",
    pathwayTitle: "Civic Readiness",
    categoryName: "2b. Service-Learning Project",
    evidenceUrl: "https://cdn.localcivics.io/v1/store/example/proof.pdf",
    createdAt: "2026-11-03T14:20:00Z",
  },
  {
    entryId: "e2",
    revision: 3,
    userId: "u2",
    studentName: "Colin Test",
    status: "pending",
    activityDate: "2026-10-30",
    hostName: "Oak Street Garden",
    activityType: "Project",
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
    activityDate: "2026-10-18",
    hostName: "Riverside Library",
    activityType: "Community Service",
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
    activityDate: "2026-10-05",
    hostName: "Hope Shelter",
    activityType: "Community Service",
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
    activityDate: "2026-09-12",
    hostName: "Hope Shelter",
    activityType: "Community Service",
    hours: 1,
    createdAt: "2026-09-13T10:00:00Z",
  },
  {
    entryId: "e6",
    revision: 1,
    userId: "u4",
    studentName: "Maya Okafor",
    status: "pending",
    activityDate: "2026-11-01",
    hostName: "Spring Recital, Jefferson High Auditorium",
    activityType: "Composition",
    hours: 3,
    description: "Performed my own arrangement of a Gershwin prelude for the spring recital.",
    contactPerson: "Ms. Alvarez",
    contactEmail: "alvarez@example.org",
    supports: "Arts Pathway · 3a. Performance",
    pathwayId: "arts",
    categoryId: "3a",
    pathwayTitle: "Arts Pathway",
    categoryName: "3a. Performance",
    evidenceUrl: "https://cdn.localcivics.io/v1/store/example/recital.mp4",
    createdAt: "2026-11-02T09:30:00Z",
  },
  {
    entryId: "e7",
    revision: 2,
    userId: "u4",
    studentName: "Maya Okafor",
    status: "verified",
    activityDate: "2026-10-22",
    hostName: "Red Cross, Riverside Chapter",
    activityType: "Training",
    hours: 6,
    description: "First aid and CPR certification course.",
    contactPerson: "J. Rivera",
    supports: "Civic Readiness",
    evidenceUrl: "https://cdn.localcivics.io/v1/store/example/certificate.pdf",
    createdAt: "2026-10-23T10:00:00Z",
  },
  {
    entryId: "e8",
    revision: 1,
    userId: "u5",
    studentName: "Jordan Lee",
    status: "pending",
    activityDate: "2026-10-28",
    hostName: "Studio Session, Jefferson High",
    activityType: "Other",
    hours: 2,
    description: "Extra studio session for the ear-training unit.",
    contactPerson: "Mr. Chen",
    createdAt: "2026-10-29T08:00:00Z",
  },
];

/**
 * Component stories
 */
export const Component: Story<HoursProps> = Template.bind({});
Component.args = { loading: false, items: [] };

export const Mock: Story<HoursProps> = Template.bind({});
Mock.args = { loading: false, items, hasMore: true };

export const Loading: Story<HoursProps> = Template.bind({});
Loading.args = { loading: true, items: [] };
