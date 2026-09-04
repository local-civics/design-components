import React from "react";
import { Button } from "../../../components/Button";
import { Icon } from "../../../components/Icon";
import { Modal } from "../../../components/Modal";

/**
 * FormExitDialogProps
 */
export type FormExitDialogProps = {
  onYes?: () => void;
  onNo?: () => void;
  onLeaveWithoutSaving?: () => void;
};

/**
 * FormExitDialog
 * @param props
 * @constructor
 */
export const FormExitDialog = (props: FormExitDialogProps) => {
  return (
    <Modal visible transparent onClose={props.onNo}>
      <div className="w-full md:w-[24rem] px-8 py-5 shadow-sm grid grid-cols-1 gap-4 content-center justify-items-center">
        <div className="text-slate-500 w-14 h-14">
          <Icon name="edit" />
        </div>

        <div className="text-slate-600 text-center">
          <div className="font-bold text-lg">
            <span>Leave this lesson?</span>
          </div>
          <p className="text-sm max-w-[16rem]">You can save your progress first, or leave without saving.</p>
        </div>

        <div className="my-5 grid grid-cols-2 gap-4">
          <Button
            wide
            spacing="md"
            border="rounded"
            color="blue"
            theme="dark"
            text="Save & Leave"
            size="md"
            onClick={props.onYes}
          />

          <Button
            wide
            spacing="md"
            border="rounded"
            color="secondary"
            theme="dark"
            text="Cancel"
            size="md"
            onClick={props.onNo}
          />
        </div>

        <button
          type="button"
          onClick={props.onLeaveWithoutSaving}
          className="text-xs font-bold text-slate-400 underline underline-offset-2 hover:text-slate-600"
        >
          Leave without saving
        </button>
      </div>
    </Modal>
  );
};
