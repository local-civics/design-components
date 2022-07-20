import React from "react";
import { Button } from "../../Button";
import { Icon } from "../../Icon";
import { Modal } from "../../Modal";

/**
 * FormSubmitDialogProps
 */
export type FormSubmitDialogProps = {
  onGoBack?: () => void;
  onContinue?: () => void;
};

/**
 * FormSubmitDialog
 * @param props
 * @constructor
 */
export const FormSubmitDialog = (props: FormSubmitDialogProps) => {
  return (
    <Modal visible transparent onClose={props.onGoBack}>
      <div className="w-full md:w-[24rem] px-8 py-5 shadow-sm grid grid-cols-1 gap-10 content-center justify-items-center">
        <div className="grid grid-cols-1 gap-4 content-center justify-items-center">
          <div className="text-sky-500 w-14 h-14">
            <Icon name="service-tracking" />
          </div>

          <div className="text-slate-700 text-center">
            <div className="font-bold text-lg">
              <span>Your hours are logged!</span>
            </div>
            <p className="text-sm max-w-[16rem]">Click continue to go back home.</p>
          </div>
        </div>

        <div className="px-16 w-full">
          <Button
              wide
              spacing="md"
              border="rounded"
              color="dark-blue"
              theme="dark"
              text="Continue"
              size="full:md"
              onClick={props.onContinue}
          />
        </div>
      </div>
    </Modal>
  );
};
