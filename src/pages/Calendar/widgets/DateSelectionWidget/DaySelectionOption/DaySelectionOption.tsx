import React from "react";
import { classname } from "../../../../../utils/classname/classname";

/**
 * The properties for the day selection option.
 */
export type DaySelectionOptionProps = {
  today: boolean;
  active: boolean;
  currentMonth: boolean;
  children: number;
  onClick: () => void;
};

/**
 * A component to for a day selection option.
 * @param props
 * @constructor
 */
export const DaySelectionOption = (props: DaySelectionOptionProps) => {
  const className = classname("w-8 h-8 text-center cursor-pointer p-2")
    .append("hover:text-white hover:font-semibold hover:bg-sky-400")
    .if(props.active, "text-white font-semibold bg-sky-400")
    .elseIf(props.today, "font-semibold bg-slate-100 rounded-full")
    .elseIf(props.currentMonth, "text-slate-500 font-semibold")
    .else("text-slate-400")
    .build();

  return (
    <span onClick={props.onClick} className={className}>
      {props.children}
    </span>
  );
};
