import * as React from "react";
import { Icon, IconName } from "../../../components/Icon";

/**
 * The accent cycled across dashboard stat tiles.
 */
export type StatTileAccent = "cyan" | "mint" | "gold" | "slate";

/**
 * StatTileProps
 */
export type StatTileProps = {
  icon: IconName;
  value: string | number;
  label: string;
  accent?: StatTileAccent;
};

const ACCENT_CLASSNAMES: Record<StatTileAccent, { chip: string; icon: string; card: string }> = {
  cyan: {
    chip: "bg-sky-blue-400/15",
    icon: "text-sky-blue-400",
    card: "border-sky-blue-400/20 shadow-[0_2px_12px_rgba(59,208,242,0.12)]",
  },
  mint: {
    chip: "bg-mint-400/15",
    icon: "text-mint-400",
    card: "border-mint-400/20 shadow-[0_2px_12px_rgba(30,226,175,0.12)]",
  },
  gold: {
    chip: "bg-gold-400/15",
    icon: "text-gold-400",
    card: "border-gold-400/20 shadow-[0_2px_12px_rgba(255,212,77,0.12)]",
  },
  slate: { chip: "bg-slate-100", icon: "text-slate-400", card: "border-slate-200 shadow-sm" },
};

/**
 * A single icon + number + label stat tile, meant to appear in a StatTileRow.
 * @param props
 * @constructor
 */
export const StatTile = (props: StatTileProps) => {
  const { chip, icon, card } = ACCENT_CLASSNAMES[props.accent || "slate"];

  return (
    <div className={`flex flex-1 flex-col gap-2.5 rounded-2xl border bg-white p-4 ${card}`}>
      <div className={`flex h-9 w-9 items-center justify-center rounded-[10px] ${chip}`}>
        <div className={`h-[18px] w-[18px] ${icon}`}>
          <Icon name={props.icon} />
        </div>
      </div>
      <div>
        <div className="text-2xl font-extrabold text-dark-blue-400">{props.value}</div>
        <div className="text-xs text-slate-400">{props.label}</div>
      </div>
    </div>
  );
};

/**
 * StatTileRowProps
 */
export type StatTileRowProps = {
  children: React.ReactNode;
};

/**
 * A row layout for a set of StatTiles.
 * @param props
 * @constructor
 */
export const StatTileRow = (props: StatTileRowProps) => <div className="flex gap-2.5">{props.children}</div>;
