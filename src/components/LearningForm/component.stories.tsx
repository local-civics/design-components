import React from "react";
import { LearningForm, LearningFormProps } from "./LearningForm";
import { Story } from "@storybook/react";

/**
 * Storybook component configuration
 */
export default {
  title: "Library/LearningForm",
  component: LearningForm,
};

/**
 * Component storybook template
 */
const Template: Story<LearningFormProps> = (args) => (
  <div className="font-proxima m-auto">
    <LearningForm
      headline="College Explorer Scavenger Hunt (CUNY)"
      summary={`Undergrad Spotlights are an opportunity to learn about different colleges and universities from the people who know them best— current students! Hear their thoughts on the college search & applications, choosing a major, and more.

In this Undergrad Spotlight, Sam Lee shares about her Cornell experience! Sam discusses the importance of authenticity in an application, how homework in college differs from high school, and her life studying engineering/information science in Ithaca.
`}
      imageURL="https://cdn.localcivics.io/area/recreation.jpg"
      eta="30m"
      items={[
        {
          itemId: "e2eae1bd-a536-4e1a-aad9-933a485bd83b",
          headline: "Upload a file as proof.",
          format: "question",
          questionType: "file upload",
        },
        {
          itemId: "d2771822-fa11-4b1f-a379-b9bf30e3b395",
          headline: "Select one from the dropdown.",
          format: "question",
          questionType: "drop down",
          options: ["Option 1"],
        },
        {
          itemId: "85f481cd-1f4b-47b0-a81a-70fec273ff90",
          headline: "What color(s) would you like to order?",
          format: "question",
          questionType: "checkbox",
          options: ["color 1", "color 2", "color 3", "color 4"],
        },
        {
          itemId: "f89c3e8e-548e-48ca-bcf0-dcd763122d23",
          headline: "Study this image.",
          format: "image",
        },
        {
          itemId: "c5e5cf03-6a49-45a5-8330-e415f1954004",
          headline: "What date did it occur?",
          format: "question",
          questionType: "date",
        },
        {
          itemId: "77655601-7648-4096-b392-01f85dd176a9",
          headline: "Listen while you study.",
          format: "embed",
          url: "https://www.youtube.com/embed/85HsSNdymo8",
        },
        {
          itemId: "2f6126ad-3a2a-40a7-a442-92afa48700a7",
          headline: "Are you a new or existing customer?",
          format: "question",
          questionType: "radio",
          options: ["I am a new customer", "I am an existing customer"],
        },
        {
          itemId: "9750cc0e-7dc2-49bb-9d19-efc6c0c288ec",
          headline: "Questions and comments",
          format: "question",
          questionType: "text",
          paragraph: true,
        },
        {
          itemId: "a4b2e738-0f69-40c9-97e0-1602bb3260b1",
          headline: "What is the item you would like to order?",
          summary: "Please enter the product number",
          format: "question",
          questionType: "text",
          required: true,
        },
        {
          itemId: "d986106b-f9ba-40e9-82b9-84e611f7c910",
          headline: "What time did it occur?",
          format: "question",
          questionType: "time",
        },
      ]}
      {...args}
      onSubmit={async (reflection, rating) => {
        args.onSubmit && (await args.onSubmit(reflection, rating));
      }}
    />
  </div>
);

/**
 * Component stories
 */
export const Component: Story<LearningFormProps> = Template.bind({});
Component.args = {};
