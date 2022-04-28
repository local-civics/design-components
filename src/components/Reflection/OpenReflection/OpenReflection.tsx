import React from "react";
import { Button, Icon, IconName, Modal } from "../../index";
import { useMessage } from "../../../contexts/Message";
import { builder } from "../../../utils/classname/classname";

export type OpenReflectionProps = {
  visible?: boolean;
  isLoading?: boolean;

  startTime?: string
  reflection?: string
  pathway?: string
  rating?: number
  xp?: number
  headline?: string
  imageURL?: string
  canReflect?: boolean

  onClose?: () => void;
  onSave?: (reflection: string, rating: number) => Promise<void>;
};

export const OpenReflection = (props: OpenReflectionProps) => {
  const className = builder("w-full md:w-[40rem]").if(!!props.isLoading, "min-h-[20rem]").build();
  const message = useMessage();
  const [reaction, setReaction] = React.useState({
    rating: props.rating,
    reflection: props.reflection,
  });
  const hasChanges =
    props.canReflect && (props.rating !== reaction.rating || props.reflection !== reaction.reflection);
  const setFeedback = (feedback: string) => setReaction({ ...reaction, reflection: feedback });
  const setConfidence = (confidence: number) => setReaction({ ...reaction, rating: confidence });

  React.useEffect(() => {
    setReaction({
      rating: props.rating,
      reflection: props.reflection,
    });
  }, [props.reflection]);

  return (
    <Modal isLoading={props.isLoading} visible={props.visible} onClose={props.onClose}>
      <div className={className}>
        <img className="w-full h-60 object-cover" alt={props.headline} src={props.imageURL} />
        <div className="w-full grid grid-cols-1 gap-2 sm:flex p-5 border-b border-gray-200">
          <div className="flex items-start grow">
            <div className="inline-block min-w-6 w-6 h-6 text-slate-600">
              <Icon name={(props.pathway as IconName) || "explore"} />
            </div>

            <div className="grow align-top ml-2 inline-block leading-none">
              <p className="font-semibold capitalize text-slate-600 text-lg -mt-1.5">{props.headline}</p>
              <div>
                <p className="text-sm inline-block capitalize text-slate-600">{props.pathway}</p>
                {props.xp && <p className="ml-1 font-semibold inline-block text-sm text-green-500">{props.xp} pts</p>}
              </div>
            </div>
          </div>

          {hasChanges && (
            <Button
              onClick={() =>
                props.onSave &&
                props.onSave(reaction.reflection || "", reaction.rating || 0).then(() => {
                  if (reaction.reflection && !props.reflection) {
                    message.send(`You've successfully submitted your reflection and earned your points.`, {
                      severity: "success",
                      icon: "reflection",
                      title: "Nice Work!",
                    });
                  }
                })
              }
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
              <p className="font-semibold text-sm">Write a short reflection on your experience.</p>

              <textarea
                disabled={!props.canReflect}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="Describe your experience in 20 words or more. Then rate your experience."
                defaultValue={props.reflection}
                className="resize-none text-slate-500 focus:text-slate-600 h-24 mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
      focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
      disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
      invalid:border-pink-500 invalid:text-pink-600
      focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
              />

              {props.canReflect && <Confidence {...props} {...reaction} setConfidence={setConfidence} />}
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
const Confidence = (props: OpenReflectionProps & { setConfidence?: (confidence: number) => void }) => {
  /**
   * Max points for reflection.
   */
  const maxPoints = 5;
  const [confidence, setConfidence] = React.useState(props.rating || -1);
  const buttons = Array.from({ length: maxPoints }, (_, i) => {
    const color = i < confidence ? "text-sky-200" : "text-slate-200";
    return (
      <div
        key={i}
        onMouseEnter={() => setConfidence(i + 1)}
        onMouseLeave={() => setConfidence(props.rating || -1)}
      >
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
      return <p className="inline-block text-sm text-monochrome-500">Poor</p>;
    }

    if (i === maxPoints - 1) {
      return <p className="inline-block text-sm text-monochrome-500">Amazing</p>;
    }

    return <p className="inline-block text-monochrome-500" />;
  });

  React.useEffect(() => {
    if (props.rating && props.rating !== confidence) {
      setConfidence(props.rating);
    }
  }, [props.rating]);

  return (
    <div className="inline-block mt-2">
      <h6 className="font-bold pb-2 text-md"> Rate your experience from poor to amazing</h6>
      <div className={`w-[17.7rem] grid grid-cols-5 justify-self-center items-center gap-7 mb-2`}>{buttons}</div>
      <div className={`w-[16.7rem] text-[0.5rem] grid grid-cols-5 justify-self-center items-center`}>{labels}</div>
    </div>
  );
};
