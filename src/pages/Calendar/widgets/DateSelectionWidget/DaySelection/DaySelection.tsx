import React from "react";
import { weeks, nextDate, isSameDate } from "../../../../../utils";
import { DaySelectionOption } from "../DaySelectionOption/DaySelectionOption";

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export type DaySelectionProps = {
  date: Date | null;
  month: Date;
  setDate: (date: Date | null) => void;
};

export const DaySelection = (props: DaySelectionProps) => {
  const today = new Date();
  const Days = [];
  const [start, end] = weeks(props.month, 6);
  for (let cur = start; cur <= end; cur = nextDate(cur)) {
    const isToday = isSameDate(today, cur);
    const isActive = isSameDate(props.date, cur);
    const isCurrentMonth = cur.getMonth() === props.month.getMonth();
    const onClick = () => props.setDate(isActive ? null : cur);
    Days.push(
      <DaySelectionOption
        key={cur.toString()}
        today={isToday}
        active={isActive}
        currentMonth={isCurrentMonth}
        onClick={onClick}
      >
        {cur.getDate()}
      </DaySelectionOption>
    );
  }

  return (
    <div className="mt-4 grid grid-cols-7 gap-1 text-xs justify-items-center">
      {WEEKDAYS.map((date, i) => {
        return (
          <span key={date + i} className="w-8 text-center text-slate-400">
            {date}
          </span>
        );
      })}
      {Days}
    </div>
  );
};
