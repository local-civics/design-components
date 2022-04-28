import React from "react";
import { Widget, WidgetBody } from "../../../../components";

/**
 * The properties for the resident.
 */
export type ResidentWidgetProps = {
  isLoading?: boolean;
  avatarURL?: string;
  tenantName?: string;
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
    <Widget isLoading={props.isLoading}>
      <WidgetBody>
        {hasContent && (
          <div className="p-2">
            <div className="flex gap-x-4 items-center">
              <div className="relative">
                <img
                  src={props.avatarURL || "https://cdn.localcivics.io/hub/avatar.jpg"}
                  alt="avatar"
                  className="border border-gray-200 shadow-sm w-16 h-16 lg:w-32 lg:h-32 rounded-full object-cover"
                />
                {props.online && (
                  <span className="absolute h-3.5 w-3.5 lg:w-4 lg:h-4 top-0 right-0 lg:top-2 lg:right-3 rounded-full bg-green-500 border-4 border-white" />
                )}
              </div>
              <div className="grid grid-cols-1 content-center align-middle">
                <div className="grid lg:gap-1">
                  <div className="grid grid-cols-1">
                    {props.tenantName && <span className="text-slate-300 text-sm">@{props.tenantName}</span>}
                    <h4 className="inline-block font-semibold capitalize text-2xl lg:text-4xl text-slate-600">
                      {props.givenName} {props.familyName}
                    </h4>
                  </div>
                  {props.createdAt && (
                    <p className="text-sm text-slate-300">Member since {new Date(props.createdAt).getFullYear()}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </WidgetBody>
    </Widget>
  );
};
