import * as React from "react";
import { BadgeActivity, BadgeActivityProps } from "../BadgeActivity/BadgeActivity";
import { Icon } from "../../../components/Icon/Icon";
import { ordNumber } from "../../../utils/date";

/**
 * CriterionProps
 */
type CriterionProps = {
  criterionId?: string;
  displayName?: string;
  namespace?: string;
  options?: BadgeActivityProps[];

  onClick?: () => void;
};

/**
 * BadgeActivityMenuProps
 */
export type BadgeActivityMenuProps = {
  criteria?: CriterionProps[];

  onBack?: () => void;
};

/**
 * BadgeActivityMenu
 * @param props
 * @constructor
 */
export const BadgeActivityMenu = (props: BadgeActivityMenuProps) => {
  const criteria = props.criteria || [];

  return (
    <div className="grid grid-cols-1 gap-y-4 w-full text-zinc-600">
      <div className="py-8 px-10 grid grid-cols-1 gap-y-5 rounded-b-md border-b border-x border-zinc-100">
        <div
          onClick={props.onBack}
          className="w-max flex gap-x-2 text-sm text-zinc-400 hover:text-zinc-500 cursor-pointer"
        >
          <div className="m-auto w-4 h-4">
            <Icon name="caret left" />
          </div>
          <p>Back to Badge</p>
        </div>

        <div className="p-1">
          <p className="text-lg font-semibold">Badge Activities</p>
          <p className="text-sm">Choose activities from the categories below to customize your Badge experience.</p>
        </div>
      </div>

      <div className="py-8 px-5 grid grid-cols-1 gap-y-12">
        {criteria.map((c, i) => {
          const id = c.criterionId || i;
          const options = c.options || [];
          return (
            <div key={id} className="grid grid-cols-1 gap-y-8">
              <div>
                <p className="text-lg font-semibold">{c.displayName}</p>
                <p className="text-sm">Chose one activity to complete.</p>
              </div>

              <div className="grid grid-flow-col auto-cols-max gap-4 px-1 pt-1 pb-2 w-full overflow-x-auto">
                {options.map((o, i) => {
                  const id = o.activityId || i;
                  const date = o.startTime ? new Date(o.startTime) : null;
                  return (
                    <div key={id} className="grid grid-cols-1 gap-y-2">
                      {date && (
                        <p>
                          {Intl.DateTimeFormat("en-US", { month: "long" }).format(date)} {ordNumber(date.getDate())}
                        </p>
                      )}
                      {!date && <p className="invisible">Online</p>}
                      <BadgeActivity {...o} criteriaName={c.displayName} />
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
