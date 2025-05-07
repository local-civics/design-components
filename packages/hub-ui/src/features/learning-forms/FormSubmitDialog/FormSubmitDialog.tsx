import React from "react";
import { Button } from "../../../components/Button";
import { Icon } from "../../../components/Icon";
import { Modal } from "../../../components/Modal";

/**
 * FormSubmitDialogProps
 */
export type FormSubmitDialogProps = {
  onEditLesson?: () => void;
  onBackToBadge?: () => void;
};

/**
 * FormSubmitDialog
 * @param props
 * @constructor
 */
export const FormSubmitDialog = (props: FormSubmitDialogProps) => {
  return (
    <Modal visible transparent onClose={props.onEditLesson}>
      <div className="w-full md:w-[24rem] px-8 py-5 shadow-sm grid grid-cols-1 gap-4 content-center justify-items-center">
        <div className="text-green-500 w-14 h-14">
          <Icon name="positive" />
        </div>

        <div className="text-slate-600 text-center">
          <div className="font-bold text-lg">
            <span>Great Job!</span>
          </div>
          <p className="text-sm max-w-[16rem]">Your responses have been submitted.</p>
        </div>

        <div className="my-5 grid grid-cols-2 gap-4">
          <Button
            wide
            spacing="md"
            border="rounded"
            color="blue"
            theme="dark"
            text="Edit Lesson"
            size="md"
            onClick={props.onEditLesson}
          />

          <Button
            wide
            spacing="md"
            border="rounded"
            color="blue"
            theme="dark"
            text="Back to Badge"
            size="md"
            onClick={props.onBackToBadge}
          />
        </div>
      </div>
    </Modal>
  );
};
