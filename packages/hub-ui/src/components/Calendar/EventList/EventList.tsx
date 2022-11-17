import React from "react";
import { Icon } from "../../Icon";
import { Loader } from "../../Loader";
import { Widget, WidgetBody, WidgetHeader, WidgetHeaderLink, WidgetTitle } from "../../Widget";

/**
 * EventList props.
 */
export type EventListProps = {
  isLoading?: boolean;
  date: Date | null;
  onSetDate: (date: Date | null) => void;
  children?: React.ReactNode;
};

/**
 * EventList component.
 * @param props
 * @constructor
 */
export const EventList = (props: EventListProps) => {
  const date = props.date || new Date();
  const hasChildren = props.children && React.Children.count(props.children) > 0;

  return (
    <Widget>
      <WidgetHeader divide>
        <WidgetTitle>
          <DateTitle>{date}</DateTitle>
        </WidgetTitle>
        <WidgetHeaderLink onClick={() => props.onSetDate(previousDate(date))} display={!!props.date}>
          <Icon name="leftArrow" />
        </WidgetHeaderLink>
        <WidgetHeaderLink onClick={() => props.onSetDate(nextDate(date))} display={!!props.date}>
          <Icon name="rightArrow" />
        </WidgetHeaderLink>
      </WidgetHeader>
      <WidgetBody>
        <Loader isLoading={props.isLoading}>
          {hasChildren && <div className="grid grid-cols-1 max-h-[30rem] overflow-auto gap-2">{props.children}</div>}
          {!hasChildren && (
            <div className="grid justify-items-center content-center h-[16rem] lg:h-[22rem]">
              <p className="text-sm text-center align-middle leading-6 font-semibold text-slate-300">
                No events for the day.
              </p>
            </div>
          )}
        </Loader>
      </WidgetBody>
    </Widget>
  );
};

/**
 * The properties for the date title.
 */
type DateTitleProps = {
  children: Date;
};

/**
 * A component for displaying date titles.
 * @constructor
 */
const DateTitle = (props: DateTitleProps) => {
  return (
    <>
      <span className="font-semibold text-3xl text-slate-600">{formatDate(props.children, { month: "long" })}</span>
      <span className="font-semibold ml-2 text-3xl text-slate-600">{ordNumber(props.children.getDate())}</span>
      <span className="text-3xl ml-2 text-slate-600">{formatDate(props.children, { year: "numeric" })}</span>
    </>
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
 * A utility to determine the previous date.
 * @param date
 */
const previousDate = (date: Date) => {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() - 1);
};

/**
 * A utility to determine the next date.
 * @param date
 */
const nextDate = (date: Date) => {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1);
};

/**
 * A utility to get a number as its ordinal representation.
 * https://community.shopify.com/c/shopify-design/ordinal-number-in-javascript-1st-2nd-3rd-4th/m-p/72156
 * @param n
 */
const ordNumber = (n: number) => {
  const s = ["th", "st", "nd", "rd"],
    v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
};
