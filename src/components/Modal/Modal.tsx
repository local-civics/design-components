import React from "react";
import { builder } from "../../utils/classname/classname";
import { Button } from "../Button/Button";
import { Loader } from "../Loader/Loader";

/**
 * The properties for the modal.
 */
export type ModalProps = {
  isLoading?: boolean;
  visible?: boolean;
  top?: boolean;
  plain?: boolean;
  transparent?: boolean
  children?: React.ReactNode;
  onClose?: () => void;
};

/**
 * A component for displaying modals
 */
export const Modal = (props: ModalProps) => {
  const className = builder(
    "font-proxima grid grid-cols-1 overscroll-contain justify-items-center px-4 md:px-2"
  )
    .append("py-5")
    .append("transition ease-in-out duration-400")
    .if(!props.transparent, "bg-gray-500/75 fixed w-screen h-screen top-0 left-0")
    .if(!props.transparent && !!props.visible, "z-30")
    .if(!!props.visible, "visible opacity-full")
    .if(!props.transparent && !props.visible, "-z-30 invisible opacity-0")
    .if(!props.top, "content-center")
    .if(!!props.top, "content-start")
    .build();

  const contentClassName = builder().if(!props.plain, "shadow-md bg-white overflow-hidden rounded-md relative").build();

  const close = () => {
    if (props.onClose) {
      props.onClose();
    }
  };

  return (
    <div className={className}>
      <div className={contentClassName}>
        <div className="grid grid-cols-1 gap-y-2">
          {!props.isLoading && props.onClose && (
            <div className="justify-self-end mx-2 mt-2 z-30">
              <Button size="xs" filter="none" icon="menu-close" onClick={close} />
            </div>
          )}

          <Loader isLoading={props.isLoading}>{props.children}</Loader>
        </div>
      </div>
    </div>
  );
};
