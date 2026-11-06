import React from "react";
import {Card } from "../../../components/Card/Card";
import { Button } from "../../../components/Button";
import { Icon } from "../../../components/Icon";
import { Overlay } from "../../../components/Overlay/Overlay";
import { FormInput } from "../FormInput/FormInput";
import { FormExitDialog } from "../FormExitDialog/FormExitDialog";
import { FormSubmitDialog } from "../FormSubmitDialog/FormSubmitDialog";

/**
 * A pathway an hours entry can count toward. Categories are optional: the caller may load them only
 * once a pathway is picked (see onPathwayChange).
 */
export type FormPathwayOption = {
  pathwayId: string;
  title: string;
  categories?: { categoryId: string; name: string }[];
};

/**
 * FormProps
 */
export type FormProps = {
  inReview?: boolean;
  showSubmitDialogue?: boolean;
  showExitDialogue?: boolean;
  children?: React.ReactNode;

  /** Heading, default "Hours Log". Editing an entry says so. */
  title?: string;
  /** The line under the heading while filling in (the review step has its own). */
  subtitle?: string;
  /** Present when editing: the form opens filled in. Keys are the form's own response keys. */
  initialValues?: Record<string, string>;
  /** The kinds of hours the Type dropdown offers. Defaults to DEFAULT_HOUR_TYPES. */
  types?: string[];
  /** When given, the form offers the optional pathway (and, once one is picked, category) link. */
  pathways?: FormPathwayOption[];
  /** Fires when a pathway is picked, so the caller can load that pathway's categories. */
  onPathwayChange?: (pathwayId: string) => void;
  /** Shown in the confirmation dialog. Defaults to the original "Your hours are logged!" text. */
  successTitle?: string;
  successMessage?: string;

  /**
   * Submits the responses. When logging (no initialValues) they include a `clientEntryId`, fixed for
   * the life of the form so a retry after a failed request cannot log the entry twice.
   */
  onSubmit?: (responses: any) => Promise<any>;
  onClose?: () => void;
};

/**
 * The kinds of hours the Type dropdown offers unless the caller passes its own list. "Composition" is a
 * performance or recital.
 */
export const DEFAULT_HOUR_TYPES = [
  "Community Service",
  "Composition",
  "Training",
  "Capstone",
  "Internship",
  "Project",
  "Other",
];

const newClientEntryId = () =>
  typeof crypto !== "undefined" && typeof (crypto as any).randomUUID === "function"
    ? (crypto as any).randomUUID()
    : `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 12)}`;

const today = () => {
  const now = new Date();
  const pad = (n: number) => (n < 10 ? `0${n}` : `${n}`);
  return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;
};

/**
 * Form
 * @param props
 * @constructor
 */
export const Form = (props: FormProps) => {
  const [showExitDialogue, setShowExitDialogue] = React.useState(!!props.showExitDialogue);
  const [showSubmitDialogue, setShowSubmitDialogue] = React.useState(!!props.showSubmitDialogue);
  const [responses, setResponses] = React.useState((props.initialValues || {}) as any);
  const [clientEntryId] = React.useState(newClientEntryId);
  const [inReview, setInReview] = React.useState(!!props.inReview);
  const setResponse = (key: string, value: string) => {
    setResponses({ ...responses, [key]: value });
  };
  const setPathway = (pathwayId: string) => {
    // A category belongs to its pathway, so changing the pathway clears it.
    setResponses({ ...responses, pathwayId, categoryId: "" });
    if (pathwayId && props.onPathwayChange) {
      props.onPathwayChange(pathwayId);
    }
  };
  const baseTypes = props.types || DEFAULT_HOUR_TYPES;
  // An entry whose stored type is not in the list keeps it, instead of the dropdown showing (and
  // saving) the first option.
  const typeOptions =
    responses["type"] && baseTypes.indexOf(responses["type"]) === -1 ? [...baseTypes, responses["type"]] : baseTypes;
  const pathway = (props.pathways || []).find((p) => p.pathwayId === responses["pathwayId"]);
  const categories = (pathway && pathway.categories) || [];
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inReview) {
      setInReview(true);
    } else if (inReview && props.onSubmit) {
      props.onSubmit(props.initialValues ? responses : { ...responses, clientEntryId }).then((err) => {
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
                  <p className="font-bold text-xl">{props.title || "Hours Log"}</p>
                  <p className="text-sm">
                    {inReview
                      ? "Please review your submission."
                      : props.subtitle || "Tell us about your hours below."}
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
                          headline="Activity Date"
                          type="date"
                          max={today()}
                          value={responses["date"]}
                          onChange={(value) => setResponse("date", value)}
                        />

                        <FormInput
                          required
                          readonly={inReview}
                          headline="Hours"
                          min={1}
                          max={24}
                          type="number"
                          value={responses["totalHours"]}
                          onChange={(value) => setResponse("totalHours", value)}
                        />
                      </div>

                      <FormInput
                        required
                        readonly={inReview}
                        headline="Type"
                        type="dropdown"
                        value={responses["type"]}
                        options={typeOptions}
                        onChange={(value) => setResponse("type", value)}
                      />

                      {!!props.pathways && props.pathways.length > 0 && (
                        <FormInput
                          readonly={inReview}
                          headline="Pathway (optional)"
                          summary="The pathway these hours count toward."
                          type="dropdown"
                          placeholder="None"
                          value={responses["pathwayId"]}
                          options={props.pathways.map((p) => ({ value: p.pathwayId, label: p.title }))}
                          onChange={setPathway}
                        />
                      )}

                      {!!props.pathways && props.pathways.length > 0 && categories.length > 0 && (
                        <FormInput
                          readonly={inReview}
                          headline="Requirement (optional)"
                          summary="The part of the pathway it counts toward."
                          type="dropdown"
                          placeholder="None"
                          value={responses["categoryId"]}
                          options={categories.map((c) => ({ value: c.categoryId, label: c.name }))}
                          onChange={(value) => setResponse("categoryId", value)}
                        />
                      )}

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

                      <div className="lg:col-span-2">
                        <FormInput
                          readonly={inReview}
                          headline="Evidence link (optional)"
                          summary="An https link an educator can open, such as a photo, letter or document. Anyone with the link can open it, so don't share another person's ID or home address."
                          type="url"
                          placeholder="https://"
                          value={responses["evidenceUrl"]}
                          onChange={(value) => setResponse("evidenceUrl", value)}
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
            <FormSubmitDialog
              title={props.successTitle}
              message={props.successMessage}
              onGoBack={() => setShowSubmitDialogue(false)}
              onContinue={props.onClose}
            />
          </div>
        </div>
      )}
    </>
  );
};
