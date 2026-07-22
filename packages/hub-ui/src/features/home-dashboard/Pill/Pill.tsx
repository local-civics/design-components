import * as React from "react";

/**
 * The accent cycled across dashboard pills.
 */
export type PillAccent = "cyan" | "mint" | "gold" | "slate";

/**
 * PillProps
 */
export type PillProps = {
  label: string;
  accent?: PillAccent;
};

const ACCENT_CLASSNAMES: Record<PillAccent, string> = {
  cyan: "bg-sky-blue-400/15 border border-sky-blue-400/30",
  mint: "bg-mint-400/15 border border-mint-400/30",
  gold: "bg-gold-400/15 border border-gold-400/30",
  slate: "bg-slate-100 border border-slate-200",
};

/**
 * A small accent-tinted label used for level/XP style tags across the student dashboard.
 * @param props
 * @constructor
 */
export const Pill = (props: PillProps) => {
  const accentClassName = ACCENT_CLASSNAMES[props.accent || "slate"];

  return (
    <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-bold text-dark-blue-400 ${accentClassName}`}>
      {props.label}
    </span>
  );
};
