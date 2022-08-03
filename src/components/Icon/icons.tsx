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
import PenPaper from "../../../assets/pen-paper.svg";
import CaretLeft from "../../../assets/caret-left.svg";

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
  "progress",
  "party popper",
  "plus & circle",
  "x & circle",
  "pen & paper",
  "caret left",
] as const;

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
  "pen & paper": {
    svg: PenPaper,
  },
  "caret left": {
    svg: CaretLeft,
  },
} as const;

/**
 * The name of the icon.
 */
export type IconName = typeof iconNames[number];

type Icon = {
  readonly svg: React.FunctionComponent<React.SVGProps<React.ReactSVGElement> & { title?: string }>;
};
