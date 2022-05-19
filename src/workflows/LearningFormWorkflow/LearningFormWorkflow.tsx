import React from "react";
import {Icon} from "../../components";
import {TitleSequence} from "../../components/LearningForm/TitleSequence/TitleSequence";
import {Topic} from "../../components/LearningForm/Topic/Topic";
import {Submit} from "../../components/LearningForm/Submit/Submit";
import {Question, QuestionProps} from "../../components/LearningForm/Question/Question";
import {ConfirmExit} from "../../components/LearningForm/ConfirmExit/ConfirmExit";

// Learning form stages
enum LearningFormStage {
    Start,
    Topic,
    Question,
    Submit,
}

/**
 * LearningFormWorkflow props
 */
export type LearningFormWorkflowProps = {
    stage?: LearningFormStage
    isLoading?: boolean;
    activityHeadline?: string
    imageURL?: string
    pathway?: string
    xp?: number
    contentURL?: string
    headline?: string
    questions?: QuestionProps[]
    onClose?: () => void;
    onSubmit?: () => void;
    onAnswerChange?: (answer: string | Blob) => void
}

/**
 * LearningFormWorkflow component
 * @param props
 * @constructor
 */
export const LearningFormWorkflow = (props: LearningFormWorkflowProps) => {
    const [stage, setStage] = React.useState(props.stage || LearningFormStage.Start)
    const [question, setQuestion] = React.useState(0)
    const prev = () => {
        switch (stage) {
            case LearningFormStage.Question:
                if(question === 0){
                    setStage(LearningFormStage.Topic)
                } else {
                    setQuestion(question - 1)
                }
                break
            case LearningFormStage.Submit:
                if(props.questions && props.questions.length > 0){
                    setStage(LearningFormStage.Question)
                } else {
                    setStage(LearningFormStage.Topic)
                }
                break
            default:
                setStage(stage - 1)
        }
    }

    const next = () => {
        switch (stage) {
            case LearningFormStage.Question:
                if(props.questions && props.questions.length > 0 && question === props.questions.length - 1){
                    setStage(LearningFormStage.Submit)
                } else {
                    setQuestion(question + 1)
                }
                break
            case LearningFormStage.Topic:
                if(props.questions && props.questions.length > 0){
                    setStage(LearningFormStage.Question)
                } else {
                    setStage(LearningFormStage.Submit)
                }
                break
            default:
                setStage(stage + 1)
        }
    }

    const [exit, setExit] = React.useState(false)
    console.log(exit)
    return <div>
        <div className="fixed top-0 left-0 px-4 md:px-2 w-screen h-screen py-5 transition ease-in-out duration-400 bg-gray-200/75 z-40">
            <div className="flex md:w-max h-screen gap-x-2 justify-items-center content-center m-auto">
                <div onClick={prev} className={`text-slate-300 hover:text-slate-500 w-8 h-8 md:w-14 md:h-14 cursor-pointer my-auto ${stage === LearningFormStage.Start ? "invisible" : ""}`}>
                    <Icon name="leftArrow" />
                </div>

                <div className="my-auto w-full md:w-[45rem]">
                    <Stage {...props} stage={stage} question={question} onClose={() => setExit(true)}/>
                </div>

                <div onClick={next} className={`text-slate-300 hover:text-slate-500 w-8 h-8 md:w-14 md:h-14 cursor-pointer my-auto ${stage === LearningFormStage.Submit ? "invisible" : ""}`}>
                    <Icon name="rightArrow" />
                </div>
            </div>
        </div>

        { exit && <div className="fixed top-0 left-0 px-4 md:px-2 w-screen h-screen py-5 transition ease-in-out duration-400 bg-gray-200/75 z-50">
            <div className="flex md:w-max h-screen gap-x-2 justify-items-center content-center m-auto">
                <ConfirmExit
                    onYes={props.onClose}
                    onNo={() => setExit(false)}
                    onClose={() => setExit(false)}
                />
            </div>
        </div>}
    </div>
}

const Stage = (props: LearningFormWorkflowProps & {stage: number, question: number }) => {
    const stage = props.stage;
    switch (stage){
        case LearningFormStage.Start:
            return <TitleSequence
                isLoading={props.isLoading}
                headline={props.activityHeadline}
                imageURL={props.imageURL}
                pathway={props.pathway}
                xp={props.xp}
                onClose={props.onClose}
            />
        case LearningFormStage.Topic:
            return <Topic
                isLoading={props.isLoading}
                contentURL={props.contentURL}
                headline={props.headline}
                onClose={props.onClose}
            />
        case LearningFormStage.Question:
            if(!props.questions || props.questions.length === 0){
                return null
            }

            const question = props.questions[props.question]
            return <div className="grid grid-cols-1 gap-4">
                <div className="text-lg text-slate-600 font-bold m-auto">
                    Question {props.question + 1}/{props.questions.length}
                </div>
                <Question
                    {...question}
                    isLoading={props.isLoading}
                    onClose={props.onClose}
                    onAnswerChange={props.onAnswerChange}
                />
            </div>
        case LearningFormStage.Submit:
            return <Submit
                isLoading={props.isLoading}
                onClose={props.onClose}
                onSubmit={props.onSubmit}
            />
    }

    return null
}