import React from "react";
import { Icon } from "../../Icon";
import { Widget, WidgetBody, WidgetHeader, WidgetHeaderLink, WidgetTitle } from "../../Widget";

/**
 * The properties for the about widget.
 */
export type AboutWidgetProps = {
  isLoading?: boolean;
  edit?: boolean;
  impactStatement?: string;
  placeName?: string;
  communityName?: string;
  onEdit?: () => void;
};

/**
 * A widget for displaying additional info about the resident.
 * @param props
 * @constructor
 */
export const AboutWidget = (props: AboutWidgetProps) => {
  const hasContent = props.impactStatement || props.placeName || props.communityName;
  return (
    <Widget isLoading={props.isLoading}>
      <WidgetHeader>
        <WidgetTitle icon="profile">About Me</WidgetTitle>
        <WidgetHeaderLink onClick={props.onEdit} display={props.edit}>
          <Icon name="edit" />
        </WidgetHeaderLink>
      </WidgetHeader>
      <WidgetBody>
        {hasContent && (
          <div className="grid gap-2">
            <p className="line-clamp-10 text-sm text-slate-400">{props.impactStatement}</p>
            {!!props.placeName && (
              <div className="mt-2 flex gap-x-2 items-center">
                <div className="w-4 h-4 text-slate-600 inline-block">
                  <Icon name="pin" />
                </div>
                <h4 className="grow text-sm text-slate-500">{props.placeName}</h4>
              </div>
            )}
            {props.communityName && (
              <div className="mt-2 flex gap-x-2 items-center">
                <div className="w-4 h-4 text-slate-600 inline-block">
                  <Icon name="college & career" />
                </div>
                <h4 className="grow text-sm text-slate-500">{props.communityName}</h4>
              </div>
            )}
          </div>
        )}
      </WidgetBody>
    </Widget>
  );
};
