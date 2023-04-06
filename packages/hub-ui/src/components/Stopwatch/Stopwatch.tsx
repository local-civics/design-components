import React, { useCallback } from "react";
import { Button } from "../Button/Button";

export type CtaListProps = {
  readOnly?: boolean;
  ctaLabel?: string;
};
export type StopwatchProps = {
  time?: string;
  ctaList?: CtaListProps[];
  onCTAClick?: (ctaLabel: string) => void;
};

export const Stopwatch = (props: StopwatchProps) => {
  const ctaList = props.ctaList || [];
  const getColor = (label: string) => {
    if (label.toLowerCase() === "start") {
      return "green";
    } else if (label.toLowerCase() === "stop") {
      return "rose";
    }
    return "blue";
  };
  return (
    <>
      <div className="shadow-2xl shadow-gray-400 h-30 w-48 grid grid-cols-1 justify-items-center text-slate-600 text-md gap-4 p-4 box-border">
        <div className="shadow-xl w-36 text-center text-lg p-2">{props.time}</div>
        <div className="grid grid-cols-3 gap-2">
          {ctaList &&
            ctaList.length &&
            ctaList.map((ctaObj, i) => {
              const color = getColor(ctaObj.ctaLabel || "");
              return (
                <Button
                  key={i}
                  onClick={() => props.onCTAClick && props.onCTAClick(ctaObj.ctaLabel || "")}
                  theme="dark"
                  border="rounded"
                  size="sm"
                  spacing="xs"
                  color={color}
                  text={ctaObj.ctaLabel}
                  active={false}
                  disabled={ctaObj.readOnly}
                />
              );
            })}
        </div>
      </div>
    </>
  );
};
