import React from "react";
import { Widget } from "../../../../components";
import { WidgetBody } from "../../../../components";
import { WidgetHeader } from "../../../../components";
import { WidgetTitle } from "../../../../components";
import { calend } from "../../../../utils";
import { DaySelection } from "./DaySelection/DaySelection";
import { MonthSelection } from "./MonthSelection/MonthSelection";

/**
 * The properties for the date selection widget.
 */
export type DateSelectionWidgetProps = {
  date: Date | null;
  setDate: (date: Date | null) => void;
};

/**
 * A widget for selecting a date.
 */
export const DateSelectionWidget = (props: DateSelectionWidgetProps) => {
  const today = new Date();
  const [month, setMonth] = React.useState(calend(props.date || today));
  return (
    <Widget>
      <WidgetHeader divide>
        <WidgetTitle>Calendar</WidgetTitle>
      </WidgetHeader>
      <WidgetBody>
        <MonthSelection month={month} setMonth={setMonth} />
        <DaySelection date={props.date} month={month} setDate={props.setDate} />
      </WidgetBody>
    </Widget>
  );
};
