import * as React from "react";
import FourteenPointStar from "../../../assets/14-point-star.svg";
import AwardRibbon from "../../../assets/award-ribbon.svg";
import UpDownArrow from "../../../assets/up-down-arrow.svg";
import CheckCircle from "../../../assets/check-circle.svg";
import CheckCircleDark from "../../../assets/check-circle-dark.svg";
import Circle from "../../../assets/circle.svg";
import Lock from "../../../assets/lock.svg";
import Progress from "../../../assets/progress.svg";
import PartyPopper from "../../../assets/party-popper.svg";
import PlusCircle from "../../../assets/plus-circle.svg";
import XCircle from "../../../assets/x-circle.svg";
import XSquare from "../../../assets/x-square.svg";
import PenPaper from "../../../assets/pen-paper.svg";
import CaretLeft from "../../../assets/caret-left.svg";
import PercentWheel from "../../../assets/percent-wheel.svg";

/**
 * List of icons available
 */
export const iconNames = [
  "14-point star",
  "award ribbon",
  "up & down arrow",
  "check & circle",
  "check & circle dark",
  "lock",
  "circle",
  "percent wheel",
  "progress",
  "party popper",
  "plus & circle",
  "x & circle",
  "x & square",
  "pen & paper",
  "caret left",
] as const;

/**
 * List of icon source data
 */
export const icons: { [key in typeof iconNames[number]]: Icon } = {
  "14-point star": {
    svg: FourteenPointStar,
  },
  "award ribbon": {
    svg: AwardRibbon,
  },
  "up & down arrow": {
    svg: UpDownArrow,
  },
  circle: {
    svg: Circle,
  },
  "check & circle": {
    svg: CheckCircle,
  },
  "check & circle dark": {
    svg: CheckCircleDark,
  },
  lock: {
    svg: Lock,
  },
  progress: {
    svg: Progress,
  },
  "party popper": {
    svg: PartyPopper,
  },
  "plus & circle": {
    svg: PlusCircle,
  },
  "x & circle": {
    svg: XCircle,
  },
  "x & square": {
    svg: XSquare,
  },
  "pen & paper": {
    svg: PenPaper,
  },
  "caret left": {
    svg: CaretLeft,
  },
  "percent wheel": {
    svg: PercentWheel,
  },
} as const;

/**
 * The name of the icon.
 */
export type IconName = typeof iconNames[number];

type Icon = {
  readonly svg: React.FunctionComponent<React.SVGProps<any> & { title?: string }>;
};
