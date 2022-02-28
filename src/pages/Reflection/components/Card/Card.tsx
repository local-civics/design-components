import { Experience, Reflection } from "@local-civics/js-client";
import React, {useEffect}         from "react";
import { Button, Icon, Modal }    from "../../../../components";
import { builder } from "../../../../utils/classname/classname";

export type CardProps = Reflection &
  Experience & {
    visible?: boolean;
    resolving?: boolean;
    onClose?: () => void;
    unavailable?: boolean;
    onSave?: (reflection: Reflection) => void;
  };

export const Card = (props: CardProps) => {
  const className = builder("w-full md:w-[40rem]").if(!!props.resolving, "min-h-[20rem]").build();

  const now = new Date();
  const available = !props.unavailable && (!props.notBefore || now >= new Date(props.notBefore));
  const [reflection, setReflection] = React.useState(props as Reflection);
  const hasChanges =
    available && (props.confidence !== reflection.confidence || props.feedback !== reflection.feedback);
  const setFeedback = (feedback: string) => setReflection({ ...reflection, feedback: feedback });
  const setConfidence = (confidence: number) => setReflection({ ...reflection, confidence: confidence });

  React.useEffect(() => {
    setReflection(props)
  }, [props.feedback, props.confidence])

  return (
    <Modal resolving={props.resolving} visible={props.visible} onClose={props.onClose}>
      <div className={className}>
        <img className="w-full h-60 object-cover" alt={props.displayName} src={props.imageURL} />
        <div className="w-full grid grid-cols-1 gap-2 sm:flex p-5 border-b border-gray-200">
          <div className="flex items-start grow">
            <div className="inline-block min-w-6 w-6 h-6 text-slate-600">
              <Icon name={props.pathway || "explore"} />
            </div>

            <div className="grow align-top ml-2 inline-block leading-none">
              <p className="font-semibold capitalize text-slate-600 text-lg -mt-1.5">{props.displayName}</p>
              <div>
                <p className="text-xs inline-block capitalize text-slate-600">{props.pathway}</p>
                {props.quality && (
                  <p className="ml-1 font-semibold inline-block text-xs text-green-500">{props.quality} pts</p>
                )}
              </div>
            </div>
          </div>

          {hasChanges && (
            <Button
              onClick={() => props.onSave && props.onSave(reflection)}
              theme="dark"
              border="rounded"
              size="sm"
              spacing="md"
              color="slate"
              text="Save"
            />
          )}
        </div>

        <div className="w-full max-h-[20rem] overflow-scroll">
          <div className="w-full p-5 border-b border-gray-200 grid grid-cols-1 gap-4">
            <div className="text-slate-600 grid grid-cols-1 gap-4">
              <p className="font-semibold text-lg">Almost there, share your reflection to earn your points!</p>
              <p className="font-semibold text-sm">Write a short reflection on your experience</p>

              <textarea
                disabled={!available}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="Describe your experience in 20 words or more. Then rate your experience."
                defaultValue={props.feedback}
                className="resize-none text-slate-500 focus:text-slate-600 h-24 mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
      focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
      disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
      invalid:border-pink-500 invalid:text-pink-600
      focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
              />

              {available && <Confidence {...props} {...reflection} setConfidence={setConfidence} />}
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

/**
 * Confidence.
 * @param props
 * @constructor
 */
const Confidence = (props: CardProps & { setConfidence?: (confidence: number) => void }) => {
  /**
   * Max points for reflection.
   */
  const maxPoints = 5;
  const [confidence, setConfidence] = React.useState(props.confidence || -1);
  const buttons = Array.from({ length: maxPoints }, (_, i) => {
    const color = i < confidence ? "text-sky-100" : "text-slate-100";
    return (
      <div key={i} onMouseEnter={() => setConfidence(i + 1)} onMouseLeave={() => setConfidence(props.confidence || -1)}>
        <div
          className={`cursor-pointer h-4 w-4 ${color}`}
          onClick={() => props.setConfidence && props.setConfidence(i + 1)}
        >
          <Icon name="circle" />
        </div>
      </div>
    );
  });
  const labels = Array.from({ length: maxPoints }, (_, i) => {
    if (i === 0) {
      return <p className="inline-block text-monochrome-500">Poor</p>;
    }

    if (i === maxPoints - 1) {
      return <p className="inline-block text-monochrome-500">Amazing</p>;
    }

    return <p className="inline-block text-monochrome-500" />;
  });

  React.useEffect(() => {
    if (props.confidence && props.confidence !== confidence) {
      setConfidence(props.confidence);
    }
  }, [props.confidence]);

  return (
    <div className="inline-block mt-2">
      <h6 className="font-bold pb-2 text-md"> Rate your experience from 1 - {maxPoints}</h6>
      <div className={`w-[14.7rem] grid grid-cols-5 justify-self-center items-center gap-7 mb-2`}>{buttons}</div>
      <div className={`w-[15.7rem] text-[0.5rem] grid grid-cols-5 justify-self-center items-center`}>{labels}</div>
    </div>
  );
};
