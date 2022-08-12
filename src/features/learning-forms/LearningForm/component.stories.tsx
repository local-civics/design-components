import React from "react";
import { LearningForm, LearningFormProps } from "./LearningForm";
import { Story } from "@storybook/react";

/**
 * Storybook component configuration
 */
export default {
  title: "Learning Forms/LearningForm",
  component: LearningForm,
};

const publicSpeakingForm: LearningFormProps = {
    "formId": "5b0c2c0f-5f23-48ee-a0af-ed4f08ab23fc",
    "displayName": "Public Speaking",
    "description": "Public speaking is a huge part of getting the job done when it comes to enacting change in the world. We need to be able to effectively communicate our views while keeping in mind the audience and their unique knowledge, point of view, and wants/needs.\n\nIn this activity, you will analyze the effectiveness of content and delivery with regard to a particular purpose and the speaker's intended audience.\n\nEstimated Completion Time: 15-20 min.",
    "imageURL": "https://uploads-ssl.webflow.com/5ead22f7b41a94042ab113cd/623a0f01f2c0f77af763932c_publicSpeaking.png",
    "eta": "30m",
    "items": [
        {
            "itemId": "2d8ea25f-cb7b-49c7-a67d-5882b907a7a3",
            "displayName": "Choose ONE of the 5-min. videos below and respond to the questions that follow.",
            "description": "You may wish to scroll down and preview the questions so you know what you are looking for in the video!",
            "format": "text"
        },
        {
            "itemId": "32e327f0-2b07-4524-b302-ce43ba5f1fe2",
            "displayName": "Graduation Speech at Harvard Graduate School of Education — Donovan Livingston",
            "format": "embed",
            "url": "https://www.youtube.com/embed/9XGUpKITeJM"
        },
        {
            "itemId": "08b40fa4-5baf-465c-ad32-90f7a93aa843",
            "displayName": "Speech at the United Nations — Severn Suzuki",
            "format": "embed",
            "url": "https://www.youtube.com/embed/d1I6ljzaY9k"
        },
        {
            "itemId": "967b43f1-31ba-4745-856b-2c8d4ff6944c",
            "displayName": "Virgin Island History Month Speech at the U.S. House of Representatives — Congresswoman Stacey Plaskett",
            "format": "embed",
            "url": "https://www.youtube.com/embed/kQTPT9BFaSU"
        },
        {
            "itemId": "6f2d63e8-cd08-4fad-ab6f-f7b06c4bbd44",
            "displayName": "Write a brief overview of the speech you chose. Who is the speaker? What is the purpose of their speech? Where and when is the speech being given?",
            "description": "(2-3 sentences)",
            "format": "question",
            "questionType": "text",
            "paragraph": true,
            "required": true
        },
        {
            "itemId": "a78fbdf6-640d-458e-ab0b-0d4ff963260c",
            "displayName": "Who is the *audience* for this speech? What are their \"needs\"/what type of message are they expecting to hear in this space?",
            "description": "(1-2 sentences)",
            "format": "question",
            "questionType": "text",
            "paragraph": true,
            "required": true
        },
        {
            "itemId": "7d829693-2fed-4281-b095-666b98b5a697",
            "displayName": "Which of the following verbal techniques did you hear the speaker use?",
            "description": "(Select all that apply!)",
            "format": "question",
            "questionType": "checkbox",
            "options": [
                "Proper volume/loudness",
                "Proper speed/pace (not too fast or too slow)",
                "Avoid filler words (few \"ums,\" \"uhs,\" \"ya knows,\" etc.)",
                "Good voice quality (not breathy, not nasally, not too harsh or raspy)",
                "Correct pronunciation (saying the words correctly)",
                "Clear articulation (each word is clear and words do not mix together)",
                "Expressive (uses emphasis and pauses to highlight important moments)",
                "Energetic (shows passion and excitement to increase audience engagement)"
            ],
            "required": true
        },
        {
            "itemId": "a881cee9-72c1-4015-84cc-bb4443f5edde",
            "displayName": "Which of the following non-verbal techniques did you see the speaker use?",
            "description": "(Select all that apply!)",
            "format": "question",
            "questionType": "checkbox",
            "options": [
                "Eye contact (does not read from notes the entire time)",
                "Hand gestures (without being too distracting!)",
                "Facial expression (without being too distracting!)",
                "Correct posture (stands tall and does not hunch or fidget)",
                "Professional appearance (looks appropriately dressed for the event)"
            ],
            "required": true
        },
        {
            "itemId": "11fe271a-afc7-45b7-a45c-1c4c92fc1020",
            "displayName": "Overall, do you think the speaker was *effective* in this speech? Why or why not?",
            "description": "(2-3 sentences)",
            "format": "question",
            "questionType": "text",
            "paragraph": true,
            "required": true
        },
        {
            "itemId": "658834a6-996e-4df7-b608-f7400e16f43e",
            "displayName": "How could the speaker have *improved* their speech? Think about both verbal and non-verbal techniques, as well as the actual content.",
            "description": "(2-3 sentences)",
            "format": "question",
            "questionType": "text",
            "paragraph": true,
            "required": true
        },
        {
            "itemId": "3903a359-dd04-4789-b659-86e88f6757c4",
            "displayName": "REFLECTION: What are some public speaking techniques (both verbal & non-verbal) that YOU want to practice? How would practicing those skills improve your confidence and abilities speaking publicly?",
            "description": "(1-2 sentences)",
            "format": "question",
            "questionType": "text",
            "paragraph": true,
            "required": true
        },
        {
            "itemId": "e14dab06-d5e9-4da3-b5c2-a6029d02d0f5",
            "displayName": "After you press \"Submit,\" be sure to submit a reflection and rating for this activity.",
            "description": "Tell us a bit about what you learned, how this activity helped you on your civic leadership journey, or share any feedback/questions in your reflection!",
            "format": "text"
        }
    ]
}

/**
 * Component storybook template
 */
const Template: Story<LearningFormProps> = (args) => (
  <div className="font-proxima m-auto">
    <LearningForm
      {...publicSpeakingForm}
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
