import React from "react";
import { Button } from "../Button";
import { Modal } from "../Modal";

/**
 * NotFoundProps
 */
export type NotFoundProps = {
  visible?: boolean;
  onHome?: () => void;
};

/**
 * NotFound
 * @param props
 * @constructor
 */
export const NotFound = (props: NotFoundProps) => {
  return (
    <>
      <img
        className="object-cover w-screen h-screen -z-10"
        alt="landing"
        src="https://cdn.localcivics.io/hub/landing.jpg"
      />
      <Modal onClose={props.onHome} visible={props.visible}>
        <div className="grid grid-cols-1 p-8 justify-items-center text-slate-500 gap-y-4">
          <div className="grid grid-cols-1 justify-items-center gap-y-2">
            <p className="text-sm font-semibold">Not found</p>
          </div>

          <p className="text-sm text-center text-slate-500 max-w-[12rem]">The page you've landed on does not exist.</p>

          <div className="mt-2">
            <Button spacing="sm" border="rounded" color="slate" theme="dark" text="Go home" onClick={props.onHome} />
          </div>
        </div>
      </Modal>
    </>
  );
};
