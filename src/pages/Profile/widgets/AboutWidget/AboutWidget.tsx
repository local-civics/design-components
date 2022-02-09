import React from "react";
import { Icon, Widget, WidgetBody, WidgetHeader, WidgetHeaderLink, WidgetTitle } from "../../../../components";

/**
 * The properties for the about widget.
 */
export type AboutWidgetProps = {
  resolving?: boolean;
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
    <div className="grow">
      <Widget resolving={props.resolving}>
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
              <div className="mt-2 flex gap-x-2 items-center">
                <div className="w-4 h-4 text-slate-600 inline-block">
                  <Icon name="pin" />
                </div>
                <h4 className="grow capitalize text-xs text-slate-500">{props.placeName}</h4>
              </div>
              <div className="mt-2 flex gap-x-2 items-center">
                <div className="w-4 h-4 text-slate-600 inline-block">
                  <Icon name="college & career" />
                </div>
                <h4 className="grow capitalize text-xs text-slate-500">{props.communityName}</h4>
              </div>
            </div>
          )}
        </WidgetBody>
      </Widget>
    </div>
  );
};
