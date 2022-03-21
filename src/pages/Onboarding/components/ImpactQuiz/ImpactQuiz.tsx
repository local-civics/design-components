import React from "react";
import { Button, Icon, IconName } from "../../../../components";

export type ImpactQuizProps = {
  role?: string;
  interests?: string[];
  onFinish?: (interests: string[]) => void;
};

export const ImpactQuiz = (props: ImpactQuizProps) => {
  const [started, setStarted] = React.useState(false);
  const [question, setQuestion] = React.useState(0);
  const initialAnswers: { [key: string]: undefined | boolean } = {};
  props.interests && props.interests.map((interest) => {
    initialAnswers[interest] = true;
  });
  const [answers, setAnswers] = React.useState(initialAnswers);
  const setAnswer = (key: string, interest: boolean) => {
    setAnswers({ ...answers, [key]: interest });
    next();
  };

  const questions = (() => {
    const questions: React.ReactNode[] = [];
    switch (props.role) {
      case "student":
        questions.push(
          <Question
            key="policy & government"
            visible={question === 0}
            answer={answers["policy & government"]}
            imageURL="https://cdn.localcivics.io/rc/event/politics.jpg"
            icon="policy & government"
            headline="Voter Registration Assistance"
            summary="Gain the knowledge and technological skills to help friends and family navigate the voter registration process. You can have a civic impact in your immediate circle — every vote counts!"
            onAnswer={(interest) => setAnswer("policy & government", interest)}
          />,
          <Question
            key="recreation"
            visible={question === 1}
            answer={answers["recreation"]}
            imageURL="https://cdn.localcivics.io/rc/event/recreation.jpg"
            icon="recreation"
            headline="Yin Yoga & Social Justice w/ Shayna Johnson"
            summary="Get in the flow and foster courage in the face of fear. Learn to work through physical and emotional discomfort as you practice balance, meditation, and relaxation."
            onAnswer={(interest) => setAnswer("recreation", interest)}
          />,
          <Question
            key="volunteer"
            visible={question === 2}
            answer={answers["volunteer"]}
            imageURL="https://cdn.localcivics.io/rc/event/volunteer.jpg"
            icon="volunteer"
            headline="Harlem Grown Harvest Volunteer"
            summary="Don’t mind getting your hands dirty? Lend one and learn about the benefits of farming organic at one of the many community gardens in the Harlem area."
            onAnswer={(interest) => setAnswer("volunteer", interest)}
          />,
          <Question
            key="arts & culture"
            visible={question === 3}
            answer={answers["arts & culture"]}
            imageURL="https://cdn.localcivics.io/rc/event/culture.jpg"
            icon="arts & culture"
            headline="#CreateSeries: Introduction to Drawing & Painting"
            summary="Flex your creative muscles and pick up some new skills! In our #CreateSeries, learn directly from experienced artists and connect with like-minded students."
            onAnswer={(interest) => setAnswer("arts & culture", interest)}
          />,
          <Question
            key="college & career"
            visible={question === 4}
            answer={answers["college & career"]}
            imageURL="https://cdn.localcivics.io/rc/event/college.jpg"
            icon="college & career"
            headline="Career Journeys: Tech, Law, & Healthcare"
            summary="Join us each week and meet diverse professionals representing a wide range of careers. Get all your interests answered and explore your dream jobs with the people who know them best!"
            onAnswer={(interest) => setAnswer("college & career", interest)}
          />,
          <Question
            key="sponsored"
            visible={question === 5}
            answer={answers["sponsored"]}
            imageURL="https://cdn.localcivics.io/rc/event/sponsored.jpg"
            icon="sponsored"
            headline="Social Entrepreneurship & Design Thinking"
            summary="Learn about leaders who have pursued positive social change instead of profits. Then, follow in their footsteps with a design thinking framework to brainstorm innovative solutions for community needs."
            onAnswer={(interest) => setAnswer("sponsored", interest)}
          />
        );
        break;
      case "educator":
        questions.push(
          <Question
            key="policy & government"
            visible={question === 0}
            answer={answers["policy & government"]}
            imageURL="https://cdn.localcivics.io/rc/event/politics.jpg"
            icon="policy & government"
            headline="Voter Registration Assistance"
            summary="Gain the knowledge and technological skills to help friends and family navigate the voter registration process. You can have a civic impact in your immediate circle — every vote counts!"
            onAnswer={(interest) => setAnswer("policy & government", interest)}
          />,
          <Question
            key="arts & culture"
            visible={question === 1}
            answer={answers["arts & culture"]}
            imageURL="https://cdn.localcivics.io/rc/event/culture.jpg"
            icon="arts & culture"
            headline="#CreateSeries: Introduction to Drawing & Painting"
            summary="In our #CreateSeries, students learn directly from experienced artists and connect with like-minded students. Encourage them to flex their creative muscles and pick up some new skills!"
            onAnswer={(interest) => setAnswer("arts & culture", interest)}
          />,
          <Question
            key="sponsored"
            visible={question === 2}
            answer={answers["sponsored"]}
            imageURL="https://cdn.localcivics.io/rc/event/sponsored.jpg"
            icon="sponsored"
            headline="Social Entrepreneurship & Design Thinking"
            summary="Learn about leaders who have pursued positive social change instead of profits. Then, follow in their footsteps with a design thinking framework to brainstorm innovative solutions for community needs."
            onAnswer={(interest) => setAnswer("sponsored", interest)}
          />
        );
        break;
    }
    return questions;
  })();

  const asked = questions.length;
  const [finished, setFinished] = React.useState(asked === 0);
  const start = () => {
    setFinished(asked === 0);
    setStarted(true);
    setQuestion(0);
  };
  const next = () => {
    if (finished) {
      return;
    }

    if (question === asked - 1) {
      setFinished(true);
      return;
    }

    setQuestion(question + 1);
  };

  const restart = () => {
    setQuestion(0);
    setFinished(asked === 0);
    setStarted(false);
  };

  if (!started) {
    return (
      <div className="w-full md:w-[20rem] bg-white rounded-md border border-slate-100 px-8 py-5 shadow-sm grid grid-cols-1 gap-2 content-center justify-items-center">
        <div className="text-slate-600 w-14 h-14">
          <Icon name="goal" />
        </div>

        <div className="text-slate-600 text-center">
          <p className="font-bold text-2xl">Impact Quiz</p>
          <p className="text-sm max-w-[16rem]">Choose the experiences (if any) that interest you.</p>
        </div>

        <div className="my-5">
          <Button spacing="md" border="rounded" color="sky" theme="dark" text="Start" size="md" onClick={start} />
        </div>
      </div>
    );
  }

  const interests: string[] = [];
  Object.entries(answers).map(([v, interest]) => {
    if (interest) {
      interests.push(v);
    }
  });

  if (finished) {
    return (
      <div className="w-full md:w-[24rem] rounded-md bg-white border border-slate-100 px-8 py-5 shadow-sm grid grid-cols-1 gap-4 content-center justify-items-center">
        <div className="text-green-600 w-14 h-14">
          <Icon name="positive" />
        </div>

        <div className="text-slate-600 text-center">
          <p className="font-bold text-2xl">Done! Nice work.</p>
          <p className="text-sm max-w-[16rem]">You may continue on or go back to change your answers.</p>
        </div>

        <div className="my-5 grid grid-cols-1 md:grid-cols-2 gap-y-2 gap-x-8 justify-between">
          <Button spacing="md" border="rounded" color="slate" theme="dark" text="Restart" size="md" onClick={restart} />
          <Button
            spacing="md"
            border="rounded"
            color="sky"
            theme="dark"
            text="Continue"
            size="md"
            onClick={() => props.onFinish && props.onFinish(interests)}
          />
        </div>
      </div>
    );
  }

  return <>{questions}</>;
};

type QuestionProps = {
  visible?: boolean;
  answer?: boolean;
  imageURL: string;
  icon: IconName;
  headline: string;
  summary: string;
  onAnswer?: (interest: boolean) => void;
};

const Question = (props: QuestionProps) => {
  if (!props.visible) {
    return null;
  }

  return (
    <div className="grid grid-cols-1 gap-8 content-center">
      <div className="w-full overflow-hidden max-w-[18rem] md:max-w-[30rem] md:w-[30rem] rounded-md bg-white shadow-sm grid grid-cols-1 md:grid-cols-2">
        <img alt={props.headline} className="w-full h-full object-cover" src={props.imageURL} />
        <div className="p-5">
          <div className="flex">
            <div className="h-8 w-8 text-slate-500">
              <Icon name={props.icon} />
            </div>
          </div>

          <div className="grid grid-cols-1 text-slate-500">
            <p className="font-semibold text-lg">{props.headline}</p>
            <p className="text-sm">{props.summary}</p>
          </div>
        </div>
      </div>

      <div className="m-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
          <Button
            spacing="md"
            border="rounded"
            color="rose"
            theme="dark"
            text="Not interested"
            size="md"
            onClick={() => props.onAnswer && props.onAnswer(false)}
          />
          <Button
            icon="accept"
            spacing="md"
            border="rounded"
            color="green"
            theme="dark"
            text="Looks cool"
            size="md"
            onClick={() => props.onAnswer && props.onAnswer(true)}
          />
        </div>
      </div>
    </div>
  );
};
