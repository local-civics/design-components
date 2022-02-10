import React from "react";
import { WidgetHeader, WidgetTitle, WidgetBody, Widget } from "../../../../components";
import { ActivityProgress } from "../../components/ActivityProgress/ActivityProgress";

/**
 * The properties for the impact score widget.
 */
export interface ImpactWidgetProps {
  resolving?: boolean;
  proficiency?: number;
  nextProficiency?: number;
  magnitude?: number;
}

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
        <ActivityProgress
          height="md"
          magnitude={props.magnitude}
          proficiency={props.proficiency}
          nextProficiency={props.nextProficiency}
        />
      </WidgetBody>
    </Widget>
  );
};
