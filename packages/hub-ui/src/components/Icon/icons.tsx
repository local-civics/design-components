// @ts-nocheck
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
import FormalBackpack from "../../../assets/formal-backpack.svg";
import FormalBallotBox from "../../../assets/formal-ballot-box.svg";
import FormalBarGraph from "../../../assets/formal-bar-graph.svg";
import FormalBolt from "../../../assets/formal-bolt.svg";
import FormalBriefcase from "../../../assets/formal-briefcase.svg";
import FormalBullseye from "../../../assets/formal-bullseye.svg";
import FormalBurger from "../../../assets/formal-burger.svg";
import FormalCameraLens from "../../../assets/formal-camera-lens.svg";
import FormalDesignBulb from "../../../assets/formal-design-bulb.svg";
import FormalDoublePanBalance from "../../../assets/formal-double-pan-balance.svg";
import FormalEasel from "../../../assets/formal-easel.svg";
import FormalEye from "../../../assets/formal-eye.svg";
import FormalGavel from "../../../assets/formal-gavel.svg";
import FormalClass from "../../../assets/formal-group.svg";
import FormalHandshake from "../../../assets/formal-handshake.svg";
import FormalHeart from "../../../assets/formal-heart.svg";
import FormalMagnifyingGlass from "../../../assets/formal-magnifying-glass.svg";
import FormalMedicine from "../../../assets/formal-medicine.svg";
import FormalMicrophone from "../../../assets/formal-microphone.svg";
import FormalMolecule from "../../../assets/formal-molecule.svg";
import FormalMoneybag from "../../../assets/formal-moneybag.svg";
import FormalMortarboard from "../../../assets/formal-mortarboard.svg";
import FormalParthenon from "../../../assets/formal-parthenon.svg";
import FormalPencil from "../../../assets/formal-pencil.svg";
import FormalPieChart from "../../../assets/formal-pie-chart.svg";
import FormalPin from "../../../assets/formal-pin.svg";
import FormalRocket from "../../../assets/formal-rocket.svg";
import FormalScholar from "../../../assets/formal-scholar.svg";
import FormalStopwatch from "../../../assets/formal-stopwatch.svg";

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
  "x & square",
  "pen & paper",
  "caret left",

  "formal backpack",
  "formal ballot box",
  "formal bar graph",
  "formal bolt",
  "formal briefcase",
  "formal bullseye",
  "formal burger",
  "formal camera lens",
  "formal design bulb",
  "formal double pan balance",
  "formal easel",
  "formal eye",
  "formal gavel",
  "formal group",
  "formal handshake",
  "formal heart",
  "formal magnifying glass",
  "formal medicine",
  "formal microphone",
  "formal molecule",
  "formal moneybag",
  "formal mortarboard",
  "formal parthenon",
  "formal pencil",
  "formal pie chart",
  "formal pin",
  "formal rocket",
  "formal scholar",
  "formal stopwatch",
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
  "formal backpack": {
    svg: FormalBackpack,
  },
  "formal ballot box": {
    svg: FormalBallotBox,
  },
  "formal bar graph": {
    svg: FormalBarGraph,
  },
  "formal bolt": {
    svg: FormalBolt,
  },
  "formal briefcase": {
    svg: FormalBriefcase,
  },
  "formal bullseye": {
    svg: FormalBullseye,
  },
  "formal burger": {
    svg: FormalBurger,
  },
  "formal camera lens": {
    svg: FormalCameraLens,
  },
  "formal design bulb": {
    svg: FormalDesignBulb,
  },
  "formal double pan balance": {
    svg: FormalDoublePanBalance,
  },
  "formal easel": {
    svg: FormalEasel,
  },
  "formal eye": {
    svg: FormalEye,
  },
  "formal gavel": {
    svg: FormalGavel,
  },
  "formal group": {
    svg: FormalClass,
  },
  "formal handshake": {
    svg: FormalHandshake,
  },
  "formal heart": {
    svg: FormalHeart,
  },
  "formal magnifying glass": {
    svg: FormalMagnifyingGlass,
  },
  "formal medicine": {
    svg: FormalMedicine,
  },
  "formal microphone": {
    svg: FormalMicrophone,
  },
  "formal molecule": {
    svg: FormalMolecule,
  },
  "formal moneybag": {
    svg: FormalMoneybag,
  },
  "formal mortarboard": {
    svg: FormalMortarboard,
  },
  "formal parthenon": {
    svg: FormalParthenon,
  },
  "formal pencil": {
    svg: FormalPencil,
  },
  "formal pie chart": {
    svg: FormalPieChart,
  },
  "formal pin": {
    svg: FormalPin,
  },
  "formal rocket": {
    svg: FormalRocket,
  },
  "formal scholar": {
    svg: FormalScholar,
  },
  "formal stopwatch": {
    svg: FormalStopwatch,
  },
} as const;

/**
 * The name of the icon.
 */
export type IconName = typeof iconNames[number];

type Icon = {
  readonly svg: React.FunctionComponent<React.SVGProps<any> & { title?: string }>;
};
