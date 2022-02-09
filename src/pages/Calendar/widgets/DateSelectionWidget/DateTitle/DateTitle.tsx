import React from "react";
import { formatDate } from "../../../../../utils";
import { ordNumber } from "../../../../../utils/number/number";

/**
 * The properties for the date title.
 */
export type DateTitleProps = {
  children: Date;
};

/**
 * A component for displaying date titles.
 * @constructor
 */
export const DateTitle = (props: DateTitleProps) => {
  return (
    <>
      <span className="font-semibold text-3xl text-slate-600">{formatDate(props.children, { month: "long" })}</span>
      <span className="font-semibold ml-2 text-3xl text-slate-600">{ordNumber(props.children.getDate())}</span>
      <span className="text-3xl ml-2 text-slate-600">{formatDate(props.children, { year: "numeric" })}</span>
    </>
  );
};
