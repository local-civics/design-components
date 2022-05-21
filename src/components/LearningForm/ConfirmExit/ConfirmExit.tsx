import { Icon } from "../../Icon/Icon";
import { Button } from "../../Button/Button";
import React from "react";
import { Modal } from "../../Modal/Modal";

/**
 * Confirm exit props
 */
export type ConfirmExitProps = {
  onYes?: () => void;
  onNo?: () => void;
  onClose?: () => void;
};

/**
 * ConfirmExit component
 * @param props
 * @constructor
 */
export const ConfirmExit = (props: ConfirmExitProps) => {
  return (
    <Modal visible transparent onClose={props.onClose}>
      <div className="w-full md:w-[24rem] px-8 py-5 shadow-sm grid grid-cols-1 gap-4 content-center justify-items-center">
        <div className="text-slate-500 w-14 h-14">
          <Icon name="edit" />
        </div>

        <div className="text-slate-600 text-center">
          <div className="font-bold text-lg">
            <span>Are you sure you want to leave?</span>
          </div>
          <p className="text-sm max-w-[16rem]">Your progress will be saved.</p>
        </div>

        <div className="my-5 grid grid-cols-2 gap-4">
          <Button
            wide
            spacing="md"
            border="rounded"
            color="blue"
            theme="dark"
            text="Yes"
            size="md"
            onClick={props.onYes}
          />

          <Button
            wide
            spacing="md"
            border="rounded"
            color="secondary"
            theme="dark"
            text="No"
            size="md"
            onClick={props.onNo}
          />
        </div>
      </div>
    </Modal>
  );
};
