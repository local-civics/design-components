import * as React  from "react";
import Apps        from "../../../../assets/images/apps.svg";
import Backpack    from "../../../../assets/images/backpack.svg";
import Badge       from "../../../../assets/images/badge.svg";
import Briefcase   from "../../../../assets/images/briefcase.svg";
import Browser     from "../../../../assets/images/browser.svg";
import Building    from "../../../../assets/images/building.svg";
import CaretDown   from "../../../../assets/images/caret-down.svg";
import CaretRight  from "../../../../assets/images/caret-right.svg";
import ChessClock  from "../../../../assets/images/chess-clock.svg";
import Checkbox  from "../../../../assets/images/checkbox.svg";
import CloudCheck  from "../../../../assets/images/cloud-check.svg";
import Confetti    from "../../../../assets/images/confetti.svg";
import CrossCircle from "../../../../assets/images/cross-circle.svg";
import Document    from "../../../../assets/images/document.svg";
import EyeCrossed  from "../../../../assets/images/eye-crossed.svg";
import Folder      from "../../../../assets/images/folder.svg";
import Folders     from "../../../../assets/images/folders.svg";
import Globe       from "../../../../assets/images/globe.svg";
import Home        from "../../../../assets/images/home.svg";
import Highlighter from "../../../../assets/images/highlighter.svg";
import Histogram   from "../../../../assets/images/histogram.svg";
import Landscape   from "../../../../assets/images/landscape.svg";
import Label        from "../../../../assets/images/label.svg";
import Link        from "../../../../assets/images/link.svg";
import More        from "../../../../assets/images/more.svg";
import Plus        from "../../../../assets/images/plus.svg";
import Search      from "../../../../assets/images/search.svg";
import ShieldCheck from "../../../../assets/images/shield-check.svg";
import Sliders     from "../../../../assets/images/sliders.svg";
import Tags   from "../../../../assets/images/tags.svg";
import TextCheck   from "../../../../assets/images/text-check.svg";
import Users       from "../../../../assets/images/users.svg";

/**
 * The properties for the icon.
 */
export type IconProps = {
  title?: string
  name: IconName;
};

/**
 * A component for icons.
 */
export const Icon = (props: IconProps) => {
  const Icon = icons[props.name];
  const title = props.title || props.name
  return !!Icon && <Icon title={title} className="w-full h-full drop-shadow-[inherit]" />;
};

/**
 * List of icons available
 */
export const iconNames = [
  "apps",
  "backpack",
  "badge",
  "briefcase",
  "browser",
  "building",
  "caretDown",
  "caretRight",
  "chessClock",
  "checkbox",
  "cloudCheck",
  "confetti",
  "crossCircle",
  "document",
  "eyeCrossed",
  "folder",
  "folders",
  "globe",
  "home",
  "highlighter",
  "histogram",
  "landscape",
  "label",
  "link",
  "more",
  "plus",
  "search",
  "shieldCheck",
  "sliders",
  "tags",
  "textCheck",
  "users",
] as const;

/**
 * List of icon source data
 */
export const icons: { [key in typeof iconNames[number]]: Icon } = {
  "apps": Apps,
  "backpack": Backpack,
  "badge": Badge,
  "briefcase": Briefcase,
  "browser": Browser,
  "building": Building,
  "caretDown": CaretDown,
  "caretRight": CaretRight,
  "chessClock": ChessClock,
  "checkbox": Checkbox,
  "cloudCheck": CloudCheck,
  "confetti": Confetti,
  "crossCircle": CrossCircle,
  "document": Document,
  "eyeCrossed": EyeCrossed,
  "folder": Folder,
  "folders": Folders,
  "globe": Globe,
  "home": Home,
  "highlighter": Highlighter,
  "histogram": Histogram,
  "landscape": Landscape,
  "label": Label,
  "link": Link,
  "more": More,
  "plus": Plus,
  "search": Search,
  "shieldCheck": ShieldCheck,
  "sliders": Sliders,
  "tags": Tags,
  "textCheck": TextCheck,
  "users": Users,
} as const;

/**
 * The name of the icon.
 */
export type IconName = typeof iconNames[number];

type Icon = React.FunctionComponent<React.SVGProps<any> & { title?: string }>;
