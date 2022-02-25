import React from "react";
import { Icon, Widget, WidgetBody, WidgetHeader, WidgetTitle } from "../../../../components";
import { builder } from "../../../../utils/classname/classname";

/**
 * DateSelection component props.
 */
export type DateSelectionProps = {
  resolving?: boolean;
  date?: Date | null;
  setDate: (date: Date | null) => void;
};

/**
 * DateSelection component.
 * @param props
 * @constructor
 */
export const DateSelection = (props: DateSelectionProps) => {
  const today = new Date();
  const [month, setMonth] = React.useState(calend(props.date || today));

  return (
    <Widget resolving={props.resolving}>
      <WidgetHeader divide>
        <WidgetTitle icon="calendar">Calendar</WidgetTitle>
      </WidgetHeader>
      <WidgetBody>
        <MonthSelection month={month} setMonth={setMonth} />
        <DaySelection date={props.date} month={month} setDate={props.setDate} />
      </WidgetBody>
    </Widget>
  );
};

type MonthSelectionProps = {
  month: Date;
  setMonth: (date: Date) => void;
};

const MonthSelection = (props: MonthSelectionProps) => {
  const month = props.month;
  const previousMonth = () => props.setMonth(new Date(month.getFullYear(), month.getMonth() - 1, 1));
  const nextMonth = () => props.setMonth(new Date(month.getFullYear(), month.getMonth() + 1, 1));

  return (
    <div className="flex items-center">
      <div className="grow">
        <span className="font-semibold text-md text-slate-300">{formatDate(month, { month: "long" })}</span>
        <span className="text-md ml-1 text-slate-300">{formatDate(month, { year: "numeric" })}</span>
      </div>
      <div onClick={previousMonth} className="cursor-pointer w-3 h-3 min-w-3 text-slate-300 hover:text-slate-500">
        <Icon name="leftArrow" />
      </div>
      <div onClick={nextMonth} className="cursor-pointer ml-2 w-3 h-3 min-w-3 text-slate-300 hover:text-slate-500">
        <Icon name="rightArrow" />
      </div>
    </div>
  );
};

type DaySelectionProps = {
  date?: Date | null;
  month: Date;
  setDate: (date: Date | null) => void;
};

const DaySelection = (props: DaySelectionProps) => {
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
const DaySelectionOption = (props: DaySelectionOptionProps) => {
  const className = builder("w-8 h-8 text-center cursor-pointer p-2")
    .append("hover:text-white hover:font-semibold hover:bg-sky-400")
    .if(props.active, "text-white font-semibold bg-sky-400")
    .if(!props.active && props.today, "font-semibold bg-slate-100 rounded-full")
    .if(!props.active && !props.today && props.currentMonth, "text-slate-500 font-semibold")
    .if(!props.active && !props.today && !props.currentMonth, "text-slate-400")
    .build();

  return (
    <span onClick={props.onClick} className={className}>
      {props.children}
    </span>
  );
};

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

/**
 * A utility to calculate a date range for the specified number of weeks.
 * @param date
 * @param weeks
 */
const weeks = (date: Date, weeks: number) => {
  const start = new Date(date.getFullYear(), date.getMonth(), date.getDate() - date.getDay());
  const end = new Date(start.getFullYear(), start.getMonth(), start.getDate() + weeks * 7 - 1);
  return [start, end];
};

/**
 * A utility to calculate the first day of the month.
 * https://en.wikipedia.org/wiki/Calends
 */
const calend = (date: Date) => {
  return new Date(date.getFullYear(), date.getMonth(), 1);
};

/**
 * A helper utility to check if two date operands are equal.
 * @param left
 * @param right
 * @return {boolean}
 */
const isSameDate = (left?: Date | null, right?: Date) => {
  return (
    left === right ||
    (!!(left && right) &&
      left.getFullYear() === right.getFullYear() &&
      left.getMonth() === right.getMonth() &&
      left.getDate() === right.getDate())
  );
};

/**
 * A utility to format dates.
 * @param date
 * @param options
 */
const formatDate = (date: Date, options: Intl.DateTimeFormatOptions) => {
  return Intl.DateTimeFormat("en-US", options).format(date);
};

/**
 * A utility to determine the next date.
 * @param date
 */
const nextDate = (date: Date) => {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1);
};
