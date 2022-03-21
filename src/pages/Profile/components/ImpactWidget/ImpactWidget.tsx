import { ImpactView, WorkspaceView } from "@local-civics/js-client";
import React from "react";
import { WidgetHeader, WidgetTitle, WidgetBody, Widget } from "../../../../components";
import { ActivityProgress } from "../ActivityProgress/ActivityProgress";

/**
 * The properties for the impact score widget.
 */
export type ImpactWidgetProps = ImpactView & {
  resolving?: boolean;
};

/**
 * A widget for displaying the impact score.
 * @param props
 * @constructor
 */
export const ImpactWidget = (props: ImpactWidgetProps) => {
  return (
    <Widget height="sm" color="sky" borderless headless resolving={props.resolving}>
      <WidgetHeader>
        <WidgetTitle icon="objective">Impact Score</WidgetTitle>
      </WidgetHeader>
      <WidgetBody>
        <ActivityProgress height="md" level={props.level} xp={props.xp} nextXP={props.nextXP} />
      </WidgetBody>
    </Widget>
  );
};
