import React from "react";
import { Button } from "../Button/Button";

/**
 * StopwatchProps
 */
export type CtaListProps = {
  readOnly?: boolean;
  ctaLabel?: string;
};
export type StopwatchProps = {
  time?: string;
  ctaList?: CtaListProps[];
  onCTAClick?: (ctaLabel: string) => void;
  hide?: boolean
};

/**
 * A component for Stopwatch.
 * @param props
 * @constructor
 */
export const Stopwatch = (props: StopwatchProps) => {
  const [hide, setHide] = React.useState(props.hide)
  React.useEffect(() => {
    setHide(props.hide)
  }, [props.hide])

  const ctaList = props?.ctaList || [];
  const getColor = (label: string) => {
    if (label.toLowerCase() === "start") {
      return "green";
    } else if (label.toLowerCase() === "stop") {
      return "rose";
    }
    return "blue";
  };

  const visibility = hide ? "opacity-0 invisible" : "visible"
  return (
    <>
      <div>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            value=""
            className="sr-only peer"
            checked={hide}
            onChange={() => setHide(!hide)}
          />
          <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
          <span
            className="ml-3 text-sm font-bold text-gray-700"
            onChange={() => setHide(!hide)}
          >
            Hide Stopwatch?
          </span>
        </label>
      </div>
      <div className={`shadow-2xl shadow-gray-400 h-30 w-48 grid grid-cols-1 justify-items-center text-slate-600 text-md gap-4 p-4 box-border ${visibility}`}>
        <div className="shadow-xl w-36 text-center text-lg p-2">{props.time}</div>
        <div className="grid grid-cols-2 gap-2">
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
      </div >
    </>
  );
};
