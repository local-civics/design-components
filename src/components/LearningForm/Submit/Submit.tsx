import { Icon } from "../../Icon/Icon";
import { Button } from "../../Button/Button";
import React from "react";
import { Modal } from "../../Modal/Modal";

/**
 * Submit props
 */
export type SubmitProps = {
  isLoading?: boolean;
  onSubmit?: () => void;
  onClose?: () => void;
};

/**
 * Submit component
 * @param props
 * @constructor
 */
export const Submit = (props: SubmitProps) => {
  return (
    <Modal visible transparent isLoading={props.isLoading} onClose={props.onClose}>
      <div className="w-full md:w-[24rem] px-8 py-5 shadow-sm grid grid-cols-1 gap-4 content-center justify-items-center">
        <div className="text-green-500 w-14 h-14">
          <Icon name="positive" />
        </div>

        <div className="text-slate-600 text-center">
          <div className="font-bold text-lg">
            <span>You're all set!</span>
          </div>
          <p className="text-sm max-w-[16rem]">Click Submit to earn your points.</p>
        </div>

        <div className="my-5 grid grid-cols-1">
          <Button
            wide
            spacing="md"
            border="rounded"
            color="blue"
            theme="dark"
            text="Submit"
            size="md"
            onClick={props.onSubmit}
          />
        </div>
      </div>
    </Modal>
  );
};
