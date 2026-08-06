import React from "react";

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
  const isPrimary = (label: string) => label.toLowerCase() === "start";

  const visibility = hide ? "opacity-0 invisible" : "visible"
  return (
    <div className="w-[168px] rounded-2xl border border-sky-blue-400/30 bg-white p-3.5 shadow-[0_4px_20px_rgba(59,208,242,0.12)]">
      <label className="flex cursor-pointer items-center gap-2.5">
        <input
          type="checkbox"
          value=""
          className="peer sr-only"
          checked={hide}
          onChange={() => setHide(!hide)}
        />
        <div className="relative h-3.5 w-7 shrink-0 rounded-full bg-slate-200 transition-colors after:absolute after:left-0.5 after:top-0.5 after:h-2.5 after:w-2.5 after:rounded-full after:bg-white after:shadow-sm after:transition-all peer-checked:bg-sky-blue-400 peer-checked:after:translate-x-3.5" />
        <span className="text-[10.5px] font-semibold text-slate-500">Hide Stopwatch?</span>
      </label>

      <div className={visibility}>
        <div className="mt-2.5 text-center font-mono text-xl font-extrabold text-dark-blue-400">{props.time}</div>
        <div className="mt-2.5 grid grid-cols-2 gap-1.5">
          {ctaList.map((ctaObj, i) => (
            <button
              key={i}
              type="button"
              disabled={ctaObj.readOnly}
              onClick={() => props.onCTAClick && props.onCTAClick(ctaObj.ctaLabel || "")}
              className={`rounded-lg py-1.5 text-[11px] font-bold text-white disabled:cursor-not-allowed disabled:opacity-40 ${
                isPrimary(ctaObj.ctaLabel || "")
                  ? "bg-mint-400 hover:bg-mint-400/90"
                  : "bg-sky-blue-400 hover:bg-sky-blue-400/90"
              }`}
            >
              {ctaObj.ctaLabel}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
