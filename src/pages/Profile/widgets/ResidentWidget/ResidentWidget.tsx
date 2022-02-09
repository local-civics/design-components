import React from "react";
import { Widget, WidgetBody } from "../../../../components";

/**
 * The properties for the resident.
 */
export type ResidentWidgetProps = {
  resolving?: boolean;
  avatarURL?: string;
  residentName?: string;
  givenName?: string;
  familyName?: string;
  createdAt?: string;
  online?: boolean;
};

/**
 * A component for displaying a resident.
 * @param props
 * @constructor
 */
export const ResidentWidget = (props: ResidentWidgetProps) => {
  const hasContent = props.givenName || props.familyName;

  return (
    <Widget resolving={props.resolving}>
      <WidgetBody>
        {hasContent && (
          <div className="p-2 lg:h-[9.5rem] ml-2 lg:ml-40">
            <div className="flex h-full gap-x-4 items-center">
              <div className="w-max lg:absolute lg:mt-3 top-1/2 lg:top-0 left-2">
                <div className="w-max relative">
                  <img
                    src={props.avatarURL || "https://cdn.localcivics.io/hub/avatar.jpg"}
                    alt="avatar"
                    className="border border-gray-200 shadow-sm w-16 h-16 lg:w-36 lg:h-36 rounded-full object-cover"
                  />
                  {props.online && (
                    <span className="absolute h-4 w-4 lg:w-5 lg:h-5 top-0 right-0 lg:top-3 lg:right-3 rounded-full bg-green-500 border-4 border-white" />
                  )}
                </div>
              </div>
              <div className="grow grid grid-cols-1 lg:gap-1 content-center h-full align-middle">
                <div className="grid w-max">
                  {props.residentName && <span className="text-slate-300 text-xs">@{props.residentName}</span>}
                  <h4 className="inline-block font-semibold capitalize text-2xl lg:text-3xl text-slate-600">
                    {props.givenName} {props.familyName}
                  </h4>
                </div>
                {props.createdAt && (
                  <p className="text-xs text-slate-300">Resident since {new Date(props.createdAt).getFullYear()}.</p>
                )}
              </div>
            </div>
          </div>
        )}
      </WidgetBody>
    </Widget>
  );
};
