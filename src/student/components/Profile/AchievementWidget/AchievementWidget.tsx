import React                                                               from "react";
import { compact }                                                         from "../../../../utils/number";
import { Widget, WidgetBody, WidgetHeader, WidgetHeaderLink, WidgetTitle } from "../../../../components/Widget";
import { Icon, IconName }                                                  from "../../../../components/Icon";

/**
 * The properties for the achievement widget.
 */
export interface AchievementWidgetProps {
  isLoading?: boolean;
  lessonsCompleted?: number;
  badgesEarned?: number;
  civicMilestones?: number;
  serviceHours?: number;
  openDisabled?: boolean;
  openIcon?: IconName;

  onOpen?: () => void;
}

/**
 * A widget for displaying resident a achievement report.
 * @param props
 * @constructor
 */
export const AchievementWidget = (props: AchievementWidgetProps) => {
  return (
    <Widget isLoading={props.isLoading}>
      <WidgetHeader>
        <WidgetTitle icon="achievements">My Achievements</WidgetTitle>
        <WidgetHeaderLink size="sm" onClick={props.onOpen} disabled={props.openDisabled} display>
          <Icon name={props.openIcon || "export"} />
        </WidgetHeaderLink>
      </WidgetHeader>
      <WidgetBody>
        <div className="flex justify-between gap-x-2 justify-items-center">
          <div>
            <p className="font-bold text-3xl w-max m-auto text-green-500">{compact(props.lessonsCompleted || 0)}</p>
            <p className="text-xs text-center w-max m-auto text-slate-500">
              Lessons
              <br />
              Completed
            </p>
          </div>

          <div>
            <p className="font-bold text-3xl w-max m-auto text-green-500">{compact((props.badgesEarned || 0) + 1)}</p>
            <p className="text-xs text-center w-max m-auto text-slate-500">
              Badges
              <br />
              Earned
            </p>
          </div>

          <div>
            <p className="font-bold text-3xl w-max m-auto text-green-500">{compact(props.civicMilestones || 0)}</p>
            <p className="text-xs text-center w-max m-auto text-slate-500">
              Civic
              <br />
              Milestones
            </p>
          </div>

          <div>
            <p className="font-bold text-3xl w-max m-auto text-green-500">{compact(props.serviceHours || 0)}</p>
            <p className="text-xs text-center w-max m-auto text-slate-500">
              Service
              <br />
              Hours
            </p>
          </div>
        </div>
      </WidgetBody>
    </Widget>
  );
};
