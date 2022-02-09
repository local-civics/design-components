import React from "react";
import { Icon } from "../../../../../components";
import { formatDate } from "../../../../../utils";

/**
 * The properties for the month selection.
 */
export type MonthSelectionProps = {
  month: Date;
  setMonth: (date: Date) => void;
};

/**
 * A component to select months.
 * @constructor
 */
export const MonthSelection = (props: MonthSelectionProps) => {
  const month = props.month;
  const previousMonth = () => props.setMonth(new Date(month.getFullYear(), month.getMonth() - 1, 1));
  const nextMonth = () => props.setMonth(new Date(month.getFullYear(), month.getMonth() + 1, 1));

  return (
    <div className="flex items-center">
      <div className="grow">
        <span className="font-semibold text-md text-slate-300">{formatDate(month, { month: "long" })}</span>
        <span className="text-md ml-1 text-slate-300">{formatDate(month, { year: "numeric" })}</span>
      </div>
      <Icon
        onClick={previousMonth}
        className="cursor-pointer w-3 h-3 min-w-3 fill-slate-300 stroke-slate-300 hover:stroke-slate-500 hover:fill-slate-500"
        icon="leftArrow"
      />
      <Icon
        onClick={nextMonth}
        className="cursor-pointer ml-2 w-3 h-3 min-w-3 fill-slate-300 stroke-slate-300 hover:stroke-slate-500 hover:fill-slate-500"
        icon="rightArrow"
      />
    </div>
  );
};
