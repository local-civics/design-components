import * as React         from "react";
import { Card }           from "../../../components";
import { Icon, IconName } from "../../../components/Icon/Icon";

/**
 * BadgeActivityProps
 */
export type BadgeActivityProps = {
  activityId?: string;
  activityName?: string;
  criteriaName?: string;
  namespace?: string;
  imageURL?: string;
  xp?: number;
  formId?: string;
  milestone?: boolean;
  badgeId?: string;
  criterionId?: string;
  completedAt?: string;
  chosenAt?: string;
  tags?: string[];
  startTime?: string;
  isSelected?: boolean;

  onToggle?: () => void;
  onClick?: () => void;
};

/**
 * BadgeActivity
 * @param props
 * @constructor
 */
export const BadgeActivity = (props: BadgeActivityProps) => {
  const tags = props.tags || [];
  const [iconName, setIconName] = React.useState(props.isSelected ? "check & circle" : ("plus & circle" as IconName));
  const iconColor = props.isSelected ? "text-green-500 hover:text-rose-400" : "text-zinc-600 hover:text-green-500";
  const iconLabel = props.isSelected ? "Remove this activity" : "Select this activity";

  const onMouseEnter = () => {
    if (props.isSelected) {
      setIconName("x & circle");
    }
  };

  const onMouseLeave = () => {
    if (props.isSelected) {
      setIconName("check & circle");
    }
  };

  React.useEffect(() => {
    setIconName(props.isSelected ? "check & circle" : "plus & circle");
  }, [props.isSelected]);

  return (
    <Card>
      <div className="w-[18rem] border border-zinc-100">
        <div className="h-[12rem]">
          <img className="object-cover w-full h-full" src={props.imageURL} alt={props.activityName} />
        </div>
        <div className="px-2 pt-5 pb-5 text-zinc-600 grid grid-cols-1 gap-y-5">
          <div className="flex gap-x-2">
            <div className="shrink-0 h-8 w-8 text-zinc-600">
              <Icon name="pen & paper" />
            </div>
            <div className="grow">
              <p className="font-semibold text-sm">{props.activityName}</p>
              <p className="text-xs">{props.criteriaName}</p>
            </div>
            <div className="text-xs h-max py-2 px-4 rounded-md bg-sky-300 font-semibold">{props.xp}pts</div>
          </div>

          <div className="flex">
            <div className="ml-auto flex">
              <span className="my-auto h-max text-sm">{iconLabel}</span>
              <div
                onClick={props.onToggle}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
                className={`ml-2 inline-block cursor-pointer h-8 w-8 ${iconColor}`}
              >
                <Icon name={iconName} />
              </div>
            </div>
          </div>

          <div className="flex gap-x-2">
            {tags.map((tag, i) => {
              return (
                <div key={i} className="rounded-md shadow-sm py-2 px-3 bg-zinc-100 text-sm">
                  {tag}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Card>
  );
};
