import React from "react";
import { Story } from "@storybook/react";
import { Form, FormProps } from "./Form";

/**
 * Storybook component configuration
 */
export default {
  title: "Service Tracking/Form",
  component: Form,
};

/**
 * Component storybook template
 */
const Template: Story<FormProps> = (args) => (
  <div className="w-max font-proxima m-auto">
    <Form
      {...args}
      onSubmit={async (value) => {
        args.onSubmit && (await args.onSubmit(value));
      }}
    />
  </div>
);

/**
 * Component stories
 */
export const Component: Story<FormProps> = Template.bind({});
Component.args = {};

/**
 * Editing an existing entry: opens filled in, with the optional pathway and requirement link.
 */
export const Editing: Story<FormProps> = Template.bind({});
Editing.args = {
  title: "Edit Entry",
  subtitle: "Changing an entry sends it back to your educator for review.",
  initialValues: {
    organizationName: "Rose Pantry",
    contactPerson: "Pat Lee",
    contactPhoneNumber: "555-0100",
    contactEmail: "pat@example.org",
    date: "2026-11-02",
    totalHours: "4",
    type: "Community Service",
    description: "Sorted and packed donations for the weekend food drive.",
    pathwayId: "civic-readiness",
    categoryId: "2b",
    evidenceUrl: "https://example.org/proof.pdf",
  },
  pathways: [
    {
      pathwayId: "civic-readiness",
      title: "Civic Readiness",
      categories: [
        { categoryId: "2b", name: "2b. Service-Learning Project" },
        { categoryId: "2d", name: "2d. Extracurricular / Work-based Learning" },
      ],
    },
    { pathwayId: "digital-citizenship", title: "Digital Citizenship" },
  ],
  successTitle: "Your changes are saved!",
  successMessage: "If you changed anything, your educator will review it again.",
};

/**
 * Logging a new entry with the optional pathway link available.
 */
export const WithPathways: Story<FormProps> = Template.bind({});
WithPathways.args = { pathways: Editing.args!.pathways };
