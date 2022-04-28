import React from "react";
import { WidgetHeader, WidgetTitle, WidgetBody, Widget } from "../../index";
import { PathwayProgress } from "../../Pathway/PathwayProgress/PathwayProgress";

/**
 * The properties for the impact score widget.
 */
export type ImpactWidgetProps = {
  level?: number
  xp?: number
  nextXP?: number
  isLoading?: boolean;
};

/**
 * A widget for displaying the impact score.
 * @param props
 * @constructor
 */
export const ImpactWidget = (props: ImpactWidgetProps) => {
  return (
    <Widget height="sm" color="sky" borderless headless isLoading={props.isLoading}>
      <WidgetHeader>
        <WidgetTitle icon="objective">Impact Score</WidgetTitle>
      </WidgetHeader>
      <WidgetBody>
        <PathwayProgress height="md" level={props.level} xp={props.xp} nextXP={props.nextXP} />
      </WidgetBody>
    </Widget>
  );
};
