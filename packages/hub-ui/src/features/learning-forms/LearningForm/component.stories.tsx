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

const parksAndGreenForm: LearningFormProps = {
  formId: "b4a4dfd7-83e7-4bda-b24d-55648f3e703a",
  displayName: "Apply the Parks & Green Spaces Civic Lens ",
  description:
    "Civic Lenses are filters we can use to closely examine our community by focusing deeply on one particular area. Applying different Civic Lenses can help shift our perspective around community issues and reveal assets/resources and connections to other aspects of community that maybe we didn't notice before!\n\nIn this activity, you will apply the parks & green spaces civic lens to your local neighborhood and community. This means you will consider strengths and areas of improvement for access to recreation and nature for all people.\n",
  imageURL:
    "https://uploads-ssl.webflow.com/5ead22f7b41a94042ab113cd/623b30c8692b05e095358eae_civicMilestone_parks.png",
  eta: "15m",
  items: [
    {
      itemId: "db038ce6-d961-44dc-8ad1-8ea5a352d60a",
      displayName: "Watch the following video on New York City's Central Park:",
      format: "embed",
      url: "https://www.youtube.com/embed/9GJD8bhFeaE",
    },
    {
      itemId: "a0d44064-57ef-4ae8-b97e-bdb55c02dd46",
      displayName:
        'Now use Google Maps to explore a new park near your home or school. You can click on the name for more information and even read reviews to learn more. In some parks, you can use Google Maps "Street View" to explore further. ',
      format: "image",
      url: "https://lh5.googleusercontent.com/_Iq88GX6PoEqCu3kBoQl5MFWVVuPtM_CxZdLNV5TQUbI51ciQdr2ZLl8O2sZXmr6BaaW5XQshGDx2gwMWuiaG0bdEw1SFsBlVhN-Mc5Y0b8VzQSpASzkjifROLpD_WOx5w",
    },
    {
      itemId: "f11f46ef-f98d-4031-8726-ff691c4560c3",
      displayName: "What types of assets/resources do you see in the park/green space you chose?",
      description: "Select all that apply!",
      format: "question",
      questionType: "checkbox",
      options: [
        "Trees/bushes & other plants",
        "Flowers",
        "Open spaces with grass",
        "Trash cans",
        "Recycling bins",
        "Sports fields",
        "Walking/biking paths",
        "Public restrooms",
        "Animals/insects",
        "Public Art (murals/sculptures)",
        "Benches",
        "",
      ],
      responses: [],
      required: true,
    },
  ],
};

const publicSpeakingForm: LearningFormProps = {
  formId: "5b0c2c0f-5f23-48ee-a0af-ed4f08ab23fc",
  displayName: "Public Speaking",
  description:
    "Public speaking is a huge part of getting the job done when it comes to enacting change in the world. We need to be able to effectively communicate our views while keeping in mind the audience and their unique knowledge, point of view, and wants/needs.\n\nIn this activity, you will analyze the effectiveness of content and delivery with regard to a particular purpose and the speaker's intended audience.\n\nEstimated Completion Time: 15-20 min.",
  imageURL: "https://uploads-ssl.webflow.com/5ead22f7b41a94042ab113cd/623a0f01f2c0f77af763932c_publicSpeaking.png",
  eta: "30m",
  items: [
    {
      itemId: "2d8ea25f-cb7b-49c7-a67d-5882b907a7a3",
      displayName: "Choose ONE of the 5-min. videos below and respond to the questions that follow.",
      description:
        "You may wish to scroll down and preview the questions so you know what you are looking for in the video!",
      format: "text",
    },
    {
      itemId: "32e327f0-2b07-4524-b302-ce43ba5f1fe2",
      displayName: "Graduation Speech at Harvard Graduate School of Education — Donovan Livingston",
      format: "embed",
      url: "https://www.youtube.com/embed/9XGUpKITeJM",
    },
    {
      itemId: "08b40fa4-5baf-465c-ad32-90f7a93aa843",
      displayName: "Speech at the United Nations — Severn Suzuki",
      format: "embed",
      url: "https://www.youtube.com/embed/d1I6ljzaY9k",
    },
    {
      itemId: "967b43f1-31ba-4745-856b-2c8d4ff6944c",
      displayName:
        "Virgin Island History Month Speech at the U.S. House of Representatives — Congresswoman Stacey Plaskett",
      format: "embed",
      url: "https://www.youtube.com/embed/kQTPT9BFaSU",
    },
    {
      itemId: "6f2d63e8-cd08-4fad-ab6f-f7b06c4bbd44",
      displayName:
        "Write a brief overview of the speech you chose. Who is the speaker? What is the purpose of their speech? Where and when is the speech being given?",
      description: "(2-3 sentences)",
      format: "question",
      questionType: "text",
      paragraph: true,
      required: true,
    },
    {
      itemId: "a78fbdf6-640d-458e-ab0b-0d4ff963260c",
      displayName:
        'Who is the *audience* for this speech? What are their "needs"/what type of message are they expecting to hear in this space?',
      description: "(1-2 sentences)",
      format: "question",
      questionType: "text",
      paragraph: true,
      required: true,
    },
    {
      itemId: "7d829693-2fed-4281-b095-666b98b5a697",
      displayName: "Which of the following verbal techniques did you hear the speaker use?",
      description: "(Select all that apply!)",
      format: "question",
      questionType: "checkbox",
      options: [
        "Proper volume/loudness",
        "Proper speed/pace (not too fast or too slow)",
        'Avoid filler words (few "ums," "uhs," "ya knows," etc.)',
        "Good voice quality (not breathy, not nasally, not too harsh or raspy)",
        "Correct pronunciation (saying the words correctly)",
        "Clear articulation (each word is clear and words do not mix together)",
        "Expressive (uses emphasis and pauses to highlight important moments)",
        "Energetic (shows passion and excitement to increase audience engagement)",
      ],
      required: true,
    },
    {
      itemId: "a881cee9-72c1-4015-84cc-bb4443f5edde",
      displayName: "Which of the following non-verbal techniques did you see the speaker use?",
      description: "(Select all that apply!)",
      format: "question",
      questionType: "checkbox",
      options: [
        "Eye contact (does not read from notes the entire time)",
        "Hand gestures (without being too distracting!)",
        "Facial expression (without being too distracting!)",
        "Correct posture (stands tall and does not hunch or fidget)",
        "Professional appearance (looks appropriately dressed for the event)",
      ],
      required: true,
    },
    {
      itemId: "11fe271a-afc7-45b7-a45c-1c4c92fc1020",
      displayName: "Overall, do you think the speaker was *effective* in this speech? Why or why not?",
      description: "(2-3 sentences)",
      format: "question",
      questionType: "text",
      paragraph: true,
      required: true,
    },
    {
      itemId: "658834a6-996e-4df7-b608-f7400e16f43e",
      displayName:
        "How could the speaker have *improved* their speech? Think about both verbal and non-verbal techniques, as well as the actual content.",
      description: "(2-3 sentences)",
      format: "question",
      questionType: "text",
      paragraph: true,
      required: true,
    },
    {
      itemId: "3903a359-dd04-4789-b659-86e88f6757c4",
      displayName:
        "REFLECTION: What are some public speaking techniques (both verbal & non-verbal) that YOU want to practice? How would practicing those skills improve your confidence and abilities speaking publicly?",
      description: "(1-2 sentences)",
      format: "question",
      questionType: "text",
      paragraph: true,
      required: true,
    },
    {
      itemId: "e14dab06-d5e9-4da3-b5c2-a6029d02d0f5",
      displayName: 'After you press "Submit," be sure to submit a reflection and rating for this activity.',
      description:
        "Tell us a bit about what you learned, how this activity helped you on your civic leadership journey, or share any feedback/questions in your reflection!",
      format: "text",
    },
  ],
};

/**
 * Component storybook template
 */
const Template: Story<LearningFormProps> = (args) => {
  const items = args.items || [];
  const [state, setState] = React.useState({} as any);
  return (
    <div className="font-proxima m-auto">
      <LearningForm
        {...args}
        onSaveDraft={async (items, reflection, rating) => {
          return args.onSaveDraft && args.onSaveDraft(items, reflection, rating);
        }}
        items={items.map((i: any) => {
          return {
            ...i,
            responses: state[i.itemId || ""] || i.responses,
            onResponseChange: (responses) => {
              setState({ ...state, [i.itemId || ""]: responses });
            },
          };
        })}
        onSubmit={async (reflection, rating) => {
          if (reflection.length < 100) {
            return "minimum characters errors";
          }
          args.onSubmit && (await args.onSubmit(reflection, rating));
        }}
      />
    </div>
  );
};

const communityMappingOfSelfForm: LearningFormProps = {
  formId: "dcdf7a8a-8d1d-436c-a33d-1e86d7839896",
  displayName: "Community Mapping of Self",
  description:
    "Knowing your personal strengths or assets can help you overcome challenges, grow, and achieve your goals. \n\nIn this activity, you will identify others’ personal assets, map your personal assets and share examples of how you have used or will use your assets.\n",
  imageURL:
    "https://uploads-ssl.webflow.com/5ead22f7b41a94042ab113cd/623a0f002dd6fe190044d4e8_policy%20power%20mapping.png",
  reflection:
    "Some example input to test out badge completion as well as ability to save form answers and well this. Some example input to test out badge completion as well as ability to save form answers and well this. ",
  rating: 4,
  eta: "30m",
  items: [
    {
      itemId: "56cf653f-b224-4864-8e1d-73161420d3ad",
      displayName:
        "WARM-UP: Watch the following videos about examples of civic engagement and answer the questions that follow. ",
      format: "text",
    },
    {
      itemId: "da969011-29a8-466a-b078-32a10c606eb9",
      displayName: "Watch the following video on character strengths and answer the following questions:",
      format: "embed",
      url: "https://www.youtube.com/embed/JLUOlLRbazA",
    },
    {
      itemId: "29224e86-6f23-46ec-a8c1-18294faed1b8",
      displayName:
        "You can also review the list of character strengths using this link: https://www.face.edu/site/handlers/filedownload.ashx?moduleinstanceid=39059&dataid=61397&FileName=24-Character-Strengths.pdf",
      format: "text",
    },
    {
      itemId: "aebaec52-fb60-444a-ae8c-c50ede373551",
      displayName: "The 24 positive character strengths are split into six virtue classes:",
      description:
        "1) WISDOM: Creativity, curiosity, open-mindedness, love of learning, perspective\n2) COURAGE: Honesty, bravery, persistence, zest\n3) HUMANITY: Kindness, love, social intelligence\n4) JUSTICE: Fairness, leadership, teamwork\n5) TEMPERANCE: Forgiveness, modesty, prudence, self-regulation\n6) TRANSCENDENCE: Appreciation of beauty, gratitude, hope, humor, religiousness",
      format: "text",
    },
    {
      itemId: "967cd9d9-c07d-4ca8-b129-9a7bda571e66",
      displayName:
        "1b. Not everyone is able to or feels comfortable with participating in a protest. What are some other ways community members can get involved?",
      description: "(1-2 sentences)",
      format: "question",
      questionType: "text",
      paragraph: true,
      required: true,
      answerId: "832774f6-8f68-4831-b9aa-0f2864e8ece2",
      responses: [
        "Some example input to test out badge completion as well as ability to s a Some example input to test out badge completion as well as ability to s a",
      ],
    },
    {
      itemId: "2ce9f376-5490-4f3b-8ba6-d6e1e74080c2",
      displayName:
        "1b. Are peoples’ strengths or assets “fixed” meaning they are born with certain assets and can’t change them?",
      description: "(1-2 sentences)",
      format: "question",
      questionType: "text",
      paragraph: true,
      required: true,
      answerId: "b15c53e1-0d85-4e3d-b041-585946d654b4",
      responses: [
        "Some example input to test out badge completion as well as ability to save form answers and well this.",
      ],
    },
    {
      itemId: "8fcf0b61-5e21-4c2d-94b6-9f00f1e62d70",
      displayName: "ACTIVITY: Check your knowledge by answering the questions below.",
      format: "text",
    },
    {
      itemId: "bb1f90b2-72f2-4ad0-8f95-b9bb576a3806",
      displayName: "1. Match the term with the correct definition",
      format: "text",
    },
    {
      itemId: "e4e2d324-8ab3-48b6-9ff9-471b4615c0cb",
      displayName: "How did you do? Check your answers:",
      description: "1. Hope — D. Forgiveness — C. Bravery — A. Grit — B. ",
      format: "text",
    },
    {
      itemId: "a0a3591f-5643-4011-8f06-6cb9defe4d86",
      displayName:
        "Listen to each of these stories and list the assets you believe each storyteller may have and why. ",
      format: "text",
    },
    {
      itemId: "235684ab-c634-4ca4-81cc-c72a91880e70",
      displayName: "Brandon Stanton (Humans of New York)",
      format: "embed",
      url: "https://www.youtube.com/embed/IEOfFzCcBU0",
    },
    {
      itemId: "dc3054ce-571f-450c-9fdb-38f61b4c162d",
      displayName: "2a. List the assets you believe this storyteller has and why. ",
      description: "(1-2 sentences)",
      format: "question",
      questionType: "text",
      paragraph: true,
      required: true,
      answerId: "ee25d4fc-2976-4a1c-b1be-cafeb0df5bbe",
      responses: [
        "Some example input to test out badge completion as well as ability to save form answers and well this.",
      ],
    },
    {
      itemId: "2d5abd10-961d-4792-9d84-d198db5d9c96",
      displayName: "Luvvie Ajayi Jones (Get comfortable with being uncomfortable) -- Listen to 5:00-10:54",
      format: "embed",
      url: "https://www.youtube.com/embed/QijH4UAqGD8",
    },
    {
      itemId: "8db71601-b083-439d-9073-16dc97a12bb1",
      displayName: "2b. List the assets you believe this storyteller has and why. ",
      description: "(1-2 sentences)",
      format: "question",
      questionType: "text",
      paragraph: true,
      required: true,
      answerId: "ec6b83f6-0e40-458e-9d53-d15ec3d3fab3",
      responses: [
        "Some example input to test out badge completion as well as ability to save form answers and well this.",
      ],
    },
    {
      itemId: "9555db7a-f1e8-49db-8a0f-dd3253e6fb56",
      displayName: "Mohammad Ashraf Faridi (immigration)",
      format: "embed",
      url: "https://www.youtube.com/embed/2BSN4Z6S0_k",
    },
    {
      itemId: "6aebda8b-d8bf-4006-82b5-5d5339f93125",
      displayName: "2c. List the assets you believe this storyteller has and why. ",
      description: "(1-2 sentences)",
      format: "question",
      questionType: "text",
      paragraph: true,
      required: true,
      answerId: "c6df12b3-3e3a-485f-8cd7-ca60f6274a5b",
      responses: [
        "Some example input to test out badge completion as well as ability to save form answers and well this.",
      ],
    },
    {
      itemId: "d294feca-278d-49a5-b25b-8b4ff8b36d21",
      displayName:
        "Assets or strengths can include specific knowledge or skills like language fluency or math skills or personality characteristics or traits like empathy or kindness. Watch the following video where Shayna shares a map of her assets and discusses how you can identify your assets. ",
      format: "embed",
      url: "https://www.youtube.com/embed/UuxD5lq8rNQ",
    },
    {
      itemId: "f7338c15-70b9-4104-8325-6b1044ac479b",
      displayName: "3a. What are some of the ways Shayna says you can identify your strengths?",
      description: "(1-2 sentences)",
      format: "question",
      questionType: "text",
      paragraph: true,
      required: true,
      answerId: "dbb2b781-0dbf-4ebc-914c-98f4f1d56d9b",
      responses: [
        "Some example input to test out badge completion as well as ability to save form answers and well this.",
      ],
    },
    {
      itemId: "74efd401-4186-4821-8f8e-99f923302243",
      displayName:
        "3b. Shayna's asset map mainly focused on her characteristics or traits. Which of the following is a skill she shared on her asset map? ",
      format: "question",
      questionType: "radio",
      options: ["A. Teaching", "B. Love", "C. Curiosity", "D. Enthusiasm"],
      required: true,
      answerId: "9ab355ee-8b85-4a3f-9632-67fe38c8332a",
      responses: ["A. Teaching"],
    },
    {
      itemId: "8ad733fe-9b6f-4da0-ab2d-081c0aeadb4d",
      displayName: "How did you do? Check your answers:",
      description: "3b. (A) Teaching",
      format: "text",
    },
    {
      itemId: "657ab21c-287b-4f62-9f87-d22aea79bd6e",
      displayName: "4a. Reflect on your personal assets and answer: Which assets do you think you possess? ",
      description: "(1-2 sentences)",
      format: "question",
      questionType: "text",
      paragraph: true,
      required: true,
      answerId: "e8845740-c6bf-4a6a-bb83-92f96d756c4f",
      responses: [
        "Some example input to test out badge completion as well as ability to save form answers and well this.",
      ],
    },
    {
      itemId: "760da3ce-262d-4ad7-8969-14893252e0d9",
      displayName: "4b. Which assets would your close friends and family members say you possess? ",
      description: "(1-2 sentences)",
      format: "question",
      questionType: "text",
      paragraph: true,
      required: true,
      answerId: "a3e3e6e1-2b84-4f2d-94e8-dbb9ecb980f3",
      responses: [
        "Some example input to test out badge completion as well as ability to save form answers and well this.",
      ],
    },
    {
      itemId: "9cd7d648-4ee2-47f0-a20b-b1cadf3505e0",
      displayName:
        "4c. Choose one asset and give an example of how you have used this asset. The asset can be a characteristics or a skill or knowledge you have. ",
      description: "(1-2 sentences)",
      format: "question",
      questionType: "text",
      paragraph: true,
      required: true,
      answerId: "1ae7faf1-b26a-4d3a-ab63-363e3eaf7de4",
      responses: [
        "Some example input to test out badge completion as well as ability to save form answers and well this.",
      ],
    },
    {
      itemId: "5c603a58-1a1b-446e-8783-c576b73ab3f1",
      displayName: "4d. How can you use this asset in the future? ",
      description: "(1-2 sentences)",
      format: "question",
      questionType: "text",
      paragraph: true,
      required: true,
      answerId: "09fa0695-f827-451e-a477-ad1b8833c9e0",
      responses: [
        "Some example input to test out badge completion as well as ability to save form answers and well this.",
      ],
    },
    {
      itemId: "a2f4cd6b-4f26-4bd9-923e-16abda5c4455",
      displayName:
        "5a. Take the following survey and share your results — https://www.viacharacter.org/survey/account/register?registerPageType=popup",
      format: "question",
      questionType: "file upload",
      required: true,
      answerId: "cceeb5b9-758a-46c7-b7e2-87e492414fa0",
      responses: [
        "https://cdn.localcivics.io/v1/store/76f84c4b-0b81-424c-bcdc-f2279dc548d6/answers/119599c9a0900af873f4b4d7ada2a622902e7d4d?version=4a8043c6-4700-4a59-b8d4-c67e9c715592",
      ],
    },
    {
      itemId: "3f11c2a4-51c8-419b-af77-97f77790b442",
      displayName: "5b. Did any of your results surprise you? Why?",
      description: "(1-2 sentences)",
      format: "question",
      questionType: "text",
      paragraph: true,
      required: true,
      answerId: "2af536fc-c7da-486a-bd95-61cb2693af7a",
      responses: [
        "Some example input to test out badge completion as well as ability to save form answers and well this.",
      ],
    },
    {
      itemId: "a2ec5236-82c5-454d-9b23-48a78211fe35",
      displayName: "WRAP-UP: Reflect on this lesson by answering the following questions.",
      format: "text",
    },
    {
      itemId: "6c31184b-441c-4202-b6c2-69d8cad30426",
      displayName: "How does it feel to be a part of the communities you are in?",
      description: "(1-2 sentences)",
      format: "question",
      questionType: "text",
      paragraph: true,
      required: true,
      answerId: "bf2e7a1f-2524-4544-bf31-e8b6e48d96cb",
      responses: [
        "Some example input to test out badge completion as well as ability to save form answers and well this.",
      ],
    },
    {
      itemId: "5960e62d-adbb-4913-bef9-c22d85ba4ca5",
      displayName: "What are some issues in your community that you feel passionate about? Why?",
      description: "(1-2 sentences)",
      format: "question",
      questionType: "text",
      paragraph: true,
      required: true,
      answerId: "e4bc7ad8-604d-4dee-ae8d-4673a2a8327f",
      responses: [
        "Some example input to test out badge completion as well as ability to save form answers and well this.",
      ],
    },
    {
      itemId: "346e8677-26aa-44d1-b0dc-d8c7d171c3a0",
      displayName: "What are some ways you can help make your community better?",
      description: "(1-2 sentences)",
      format: "question",
      questionType: "text",
      paragraph: true,
      required: true,
      answerId: "a4dbb4f3-3b2c-460a-9f8d-f3043a6655bb",
      responses: [
        "Some example input to test out badge completion as well as ability to save form answers and well this.",
      ],
    },
  ],
};

/**
 * Component stories
 */
export const ParksAndGreenForm: Story<LearningFormProps> = Template.bind({});
ParksAndGreenForm.args = { ...parksAndGreenForm };

/**
 * Component stories
 */
export const PublicSpeakingForm: Story<LearningFormProps> = Template.bind({});
PublicSpeakingForm.args = { ...publicSpeakingForm };

/**
 * Component stories
 */
export const CommunityMappingOfSelf: Story<LearningFormProps> = Template.bind({});
CommunityMappingOfSelf.args = { ...communityMappingOfSelfForm };