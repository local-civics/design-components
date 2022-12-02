import React from "react";
import {Card } from "../../../components/Card/Card";
import { Button } from "../../../components/Button";
import { Icon } from "../../../components/Icon";
import { Overlay } from "../../../components/Overlay/Overlay";
import { FormInput } from "../FormInput/FormInput";
import { FormExitDialog } from "../FormExitDialog/FormExitDialog";
import { FormSubmitDialog } from "../FormSubmitDialog/FormSubmitDialog";

/**
 * FormProps
 */
export type FormProps = {
  inReview?: boolean;
  showSubmitDialogue?: boolean;
  showExitDialogue?: boolean;
  children?: React.ReactNode;

  onSubmit?: (responses: any) => Promise<any>;
  onClose?: () => void;
};

/**
 * Form
 * @param props
 * @constructor
 */
export const Form = (props: FormProps) => {
  const [showExitDialogue, setShowExitDialogue] = React.useState(!!props.showExitDialogue);
  const [showSubmitDialogue, setShowSubmitDialogue] = React.useState(!!props.showSubmitDialogue);
  const [responses, setResponses] = React.useState({} as any);
  const [inReview, setInReview] = React.useState(!!props.inReview);
  const setResponse = (key: string, value: string) => {
    setResponses({ ...responses, [key]: value });
  };
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inReview) {
      setInReview(true);
    } else if (inReview && props.onSubmit) {
      props.onSubmit(responses).then((err) => {
        if (!err) {
          setShowSubmitDialogue(true);
        }
      });
    }
  };

  React.useEffect(() => setInReview(!!props.inReview), [props.inReview]);
  React.useEffect(() => setShowExitDialogue(!!props.showExitDialogue), [props.showExitDialogue]);
  React.useEffect(() => setShowSubmitDialogue(!!props.showSubmitDialogue), [props.showSubmitDialogue]);

  return (
    <>
      <Overlay>
        <div className="flex overflow-auto md:w-max h-screen gap-x-2 justify-items-center content-center m-auto">
          <Card onClose={() => setShowExitDialogue(true)}>
            <div className="h-max w-max overflow-x-hidden md:w-[50rem] px-16 py-4 grid grid-cols-1 gap-y-12">
              <div className="flex gap-x-2 items-center">
                <div className="text-sky-500 w-14 h-14">
                  <Icon name="service-tracking" />
                </div>
                <div className="text-slate-600">
                  <p className="font-bold text-xl">Service Log</p>
                  <p className="text-sm">
                    {inReview ? "Please review your submission." : "Tell us about your service below."}
                  </p>
                </div>
              </div>
              <form className="w-full m-auto grid grid-cols-1 gap-y-12 pb-8" onSubmit={onSubmit}>
                {props.children}

                {!props.children && (
                  <>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-6 gap-y-8 items-start max-h-96 overflow-auto">
                      <FormInput
                        required
                        readonly={inReview}
                        headline="Organization Name"
                        value={responses["organizationName"]}
                        onChange={(value) => setResponse("organizationName", value)}
                      />

                      <FormInput
                        readonly={inReview}
                        headline="Contact Person"
                        value={responses["contactPerson"]}
                        onChange={(value) => setResponse("contactPerson", value)}
                      />

                      <FormInput
                        readonly={inReview}
                        headline="Contact Phone Number"
                        type="tel"
                        value={responses["contactPhoneNumber"]}
                        onChange={(value) => setResponse("contactPhoneNumber", value)}
                      />

                      <FormInput
                        readonly={inReview}
                        headline="Contact Email"
                        type="email"
                        value={responses["contactEmail"]}
                        onChange={(value) => setResponse("contactEmail", value)}
                      />

                      <div className="grid lg:grid-cols-2 gap-y-8 gap-x-2">
                        <FormInput
                          required
                          readonly={inReview}
                          headline="Service Date"
                          type="date"
                          value={responses["date"]}
                          onChange={(value) => setResponse("date", value)}
                        />

                        <FormInput
                          required
                          readonly={inReview}
                          headline="Service Hours"
                          min={0}
                          max={24}
                          type="number"
                          value={responses["totalHours"]}
                          onChange={(value) => setResponse("totalHours", value)}
                        />
                      </div>

                      <FormInput
                        required
                        readonly={inReview}
                        headline="Service Type"
                        type="dropdown"
                        value={responses["type"]}
                        options={["Community Service", "Capstone", "Internship", "Project", "Other"]}
                        onChange={(value) => setResponse("type", value)}
                      />

                      <div className="lg:col-span-2">
                        <FormInput
                          required
                          readonly={inReview}
                          headline="Tell us about your experience"
                          paragraph
                          value={responses["description"]}
                          onChange={(value) => setResponse("description", value)}
                        />
                      </div>
                    </div>

                    <div className="flex gap-x-4 w-max m-auto">
                      {inReview && (
                        <Button
                          onClick={() => setInReview(false)}
                          color="dark-blue"
                          size="md"
                          spacing="md"
                          border="rounded"
                          text="Edit"
                        />
                      )}
                      <Button
                        type="submit"
                        color="dark-blue"
                        size="md"
                        spacing="md"
                        border="rounded"
                        theme="dark"
                        text={inReview ? "Submit" : "Continue"}
                      />
                    </div>
                  </>
                )}
              </form>
            </div>
          </Card>
        </div>
      </Overlay>

      {showExitDialogue && (
        <div className="fixed top-0 left-0 px-4 md:px-2 w-screen h-screen py-5 transition ease-in-out duration-400 bg-gray-200/75 z-40">
          <div className="flex md:w-max h-screen gap-x-2 justify-items-center content-center m-auto">
            <FormExitDialog onYes={props.onClose} onNo={() => setShowExitDialogue(false)} />
          </div>
        </div>
      )}

      {showSubmitDialogue && (
        <div className="fixed top-0 left-0 px-4 md:px-2 w-screen h-screen py-5 transition ease-in-out duration-400 bg-gray-200/75 z-40">
          <div className="flex md:w-max h-screen gap-x-2 justify-items-center content-center m-auto">
            <FormSubmitDialog onGoBack={() => setShowSubmitDialogue(false)} onContinue={props.onClose} />
          </div>
        </div>
      )}
    </>
  );
};
