import React            from "react";
import {Icon, IconName} from "../../../components/Icon/Icon";
import { Card }         from "../../../components";

/**
 * DialogProps
 */
export type DialogProps = {
  title: string;
  icon: IconName
  description?: string
  onClose?: () => void;
};

/**
 * Dialog
 * @param props
 * @constructor
 */
export const Dialog = (props: DialogProps) => {
  return (
    <Card onClose={props.onClose}>
      <div className="w-full px-8 pt-5 pb-12 min-w-[20rem] shadow-sm grid grid-cols-1 gap-4 content-center justify-items-center">
        <div className="text-gray-600 w-16 h-16">
          <Icon title={props.title} name={props.icon} />
        </div>

        <div className="text-gray-600 text-center">
          <div className="font-bold text-lg">
            <span>{props.title}</span>
          </div>

          <div className="max-w-[22rem]">
            {!!props.description && (
              <div className="mt-2 text-sm">
                <span>{props.description}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
};
