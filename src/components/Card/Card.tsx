import * as React from "react";
import { Loader } from "../Loader";
import { Icon } from "../Icon/Icon";

/**
 * CardProps
 */
export type CardProps = {
  isLoading?: boolean;
  children?: React.ReactNode;

  onClose?: () => void;
};

/**
 * Card
 * @param props
 * @constructor
 */
export const Card = (props: CardProps) => {
  return (
    <div className="font-proxima grid grid-cols-1 overscroll-contain justify-items-center transition ease-in-out duration-400">
      <div className="shadow-md bg-white overflow-hidden rounded-md relative">
        <div className="grid grid-cols-1 gap-y-2">
          {!props.isLoading && props.onClose && (
            <div
              onClick={props.onClose}
              className="justify-self-end mx-2 mt-2 h-5 w-5 cursor-pointer text-slate-300 hover:text-slate-400"
            >
              <Icon name="x & square" />
            </div>
          )}

          <Loader isLoading={props.isLoading}>{props.children}</Loader>
        </div>
      </div>
    </div>
  );
};
