import React      from "react";
import {compact}  from "../../utils/numbers";
import { Button } from "../Button/Button";

/**
 * StopwatchProps
 */
export type CtaListProps = {
  readOnly?: boolean;
  ctaLabel?: string;
};
export type StopwatchProps = {
  secondsElapsed: number;
  ctaList?: CtaListProps[];
  onCTAClick?: (ctaLabel: string) => void;
};

/**
 * A component for Stopwatch.
 * @param props
 * @constructor
 */
export const Stopwatch = (props: StopwatchProps) => {
  const ctaList = props?.ctaList || [];
  const [hours, minutes, seconds] = parseSeconds(props.secondsElapsed)
  return (
    <>
      <div className="h-30 w-60 bg-white grid grid-cols-1 justify-items-center text-slate-600 text-md gap-4 p-4 rounded-md border border-slate-300">
        <div className="text-center text-lg p-2 grid grid-cols-3 gap-2 font-bold">
          <div>
            <div className="text-md p-1 bg-gray-50">{hours}</div>
            <div className="font-bold text-xs">Hours</div>
          </div>
          <div>
            <div className="text-md p-1 bg-gray-50">{minutes}</div>
            <div className="font-bold text-xs">Minutes</div>
          </div>
          <div>
            <div className="text-md p-1 bg-gray-50">{seconds}</div>
            <div className="font-bold text-xs">Seconds</div>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {ctaList &&
            ctaList.length &&
            ctaList.map((ctaObj, i) => {
              return (
                <Button
                  key={i}
                  type="button"
                  onClick={() => props.onCTAClick && props.onCTAClick(ctaObj.ctaLabel || "")}
                  theme="dark"
                  border="rounded"
                  size="sm"
                  spacing="xs"
                  color="secondary"
                  text={ctaObj.ctaLabel}
                  disabled={ctaObj.readOnly}
                />
              );
            })}
        </div>
      </div>
    </>
  );
};

const parseSeconds = (s: number) => {
  const hours = Math.floor((s || 0) / 3600)
  let remainder = (s || 0) - (hours * 3600)
  const minutes = Math.floor(remainder / 60)
  remainder -= minutes * 60
  const seconds = Math.floor(remainder)
  const formattedHours = hours < 100 ? hours.toLocaleString('en-US', {
    minimumIntegerDigits: 2,
    useGrouping: false
  }) : compact(hours)
  const formattedMinutes = minutes.toLocaleString('en-US', {
    minimumIntegerDigits: 2,
    useGrouping: false
  })
  const formattedSeconds = seconds.toLocaleString('en-US', {
    minimumIntegerDigits: 2,
    useGrouping: false
  })

  return [formattedHours, formattedMinutes, formattedSeconds]
}
