import * as React       from 'react';
import {Icon, IconName} from "../Icon/Icon";
import {Progress}       from "../Progress";

export type Criterion = {
  displayName?: string
  namespace?: string
  options?: BadgeActivity[]
};

export type BadgeActivity = {
  activityId?: string
  activityName?: string
  namespace?: string
  xp?: number
  formId?: string
  milestone?: boolean
  badgeId?: string
  criterionId?: string
  completedAt?: string
  chosenAt?: string
  startTime?: string
};

/**
 * BadgeProps
 */
export type BadgeProps = {
  badgeId?: string;
  displayName?: string;
  icon?: IconName;
  imageURL?: string;
  summary?: string;
  status?: string;
  startedAt?: string;
  finishedAt?: string;
  code?: string;
  level?: number;
  isLocked?: boolean;
  criteria?: Criterion[];
  choices?: BadgeActivity[];
  editChoices?: boolean;
  open?: boolean;

  onStart?: () => void;
  onSubmit?: () => void;
  onOpen?: () => void;
  onClose?: () => void;
};

const ClosedBadge = (props: BadgeProps) => {
  const inProgress = props.startedAt && !props.finishedAt
  const startedAt = new Date(props.startedAt||new Date())
  const statusIconName = props.isLocked ? "lock" : props.finishedAt ? "check & circle" : props.startedAt ? "progress" : "14-point star"
  const buttonClass = props.isLocked ? "cursor-default" : "cursor-pointer hover:drop-shadow-md"
  const numCriteria = props.criteria?.length || 0
  const numCompleted = props.choices?.map(v => v.completedAt ? 1 : 0).reduce((acc, a) => acc + a, 0) || 0

  return <div className="flex flex-col h-64 w-64 overflow-hidden border border-zinc-100 rounded-md bg-gray-100">
    <div className={`relative overflow-hidden p-5 ${buttonClass}`}>
      <div className="absolute top-2 right-2 text-zinc-800 w-7 h-7">
        <Icon name={statusIconName}/>
      </div>
      <svg className="h-full w-full drop-shadow-[inherit]" viewBox="0 0 940 1100" fill="none" xmlns="http://www.w3.org/2000/svg">
        {props.level && props.level > 0 && <path d="M482.921 47.8734L891.581 301.279C892.463 301.826 893 302.79 893 303.828V796.694C893 797.78 892.413 798.781 891.466 799.311L466.728 1037.16C465.809 1037.68 464.687 1037.67 463.772 1037.15L48.5103 799.603C47.5763 799.069 47 798.076 47 796.999V304.573C47 303.511 47.5618 302.528 48.4771 301.989L479.817 47.8383C480.777 47.2722 481.973 47.2857 482.921 47.8734Z" fill="none" stroke="#1EE2B0" strokeWidth="94"/> }

        {props.level && props.level > 1 && <path className="-translate-y-3.5" d="M494.044 136.608L824.747 341.5C832.987 346.606 838 355.609 838 365.302V764.144C838 774.282 832.52 783.628 823.672 788.579L479.785 980.994C471.211 985.791 460.749 985.744 452.219 980.868L116.106 788.758C107.383 783.773 102 774.496 102 764.449V366.047C102 356.129 107.247 346.95 115.795 341.918L465.092 136.281C474.055 131.004 485.203 131.13 494.044 136.608Z" fill="none" stroke="#FFD44D" strokeWidth="44"/>}

        <path d="M467.125 26.2992C476.092 21.0157 487.25 21.1418 496.095 26.6267L904.756 280.032C912.991 285.138 918 294.139 918 303.828V796.694C918 806.828 912.523 816.172 903.681 821.124L478.943 1058.98C470.364 1063.78 459.894 1063.73 451.359 1058.85L36.0968 821.304C27.3791 816.317 22 807.043 22 796.999V304.573C22 294.658 27.2435 285.483 35.786 280.449L467.125 26.2992Z" fill="none" stroke="#3BD0F2" strokeWidth="44"/>

      </svg>
      <div className="absolute overflow-hidden left-0 right-0 top-0 bottom-0 m-auto text-dark-blue-400 w-16 h-16">
        { props.icon && <Icon name={props.icon}/> }
        { !props.icon && <img className="w-full h-full object-cover" alt={props.displayName} src={props.imageURL} />}
      </div>
    </div>

    {inProgress && <div className="grow grid grid-cols-1 gap-2 w-full h-20 bg-white shadow-sm p-4">
      <div className="h-2"><Progress rounded color="sky-blue" start={numCompleted} end={numCriteria}/></div>
      {<p className="text-xs">Started {Intl.DateTimeFormat("en-US", { month: "long" }).format(startedAt)} {ordNumber(startedAt.getDate())}</p>}
    </div>}
  </div>;
};

const OpenBadge = (props: BadgeProps) => {
  return null;
};

/**
 * Badge
 * @param props
 * @constructor
 */
export const Badge = (props: BadgeProps) => {
  const [open, setOpen] = React.useState(props.open || false);
  const onOpen = () => {
    setOpen(true)
    if(props.onOpen){
      props.onOpen()
    }
  }

  const onClose = () => {
    setOpen(false)
    if(props.onClose){
      props.onClose()
    }
  }

  if (open) {
    return <OpenBadge {...props} open={open} onOpen={onOpen} onClose={onClose} />;
  }

  return <ClosedBadge {...props} open={open} onOpen={onOpen} onClose={onClose} />;
};

// todo: fix submit button visibility for learning forms
// todo: add text input type to learning forms
// todo: fix select all that apply for learning forms
/**
 * A utility to get a number as its ordinal representation.
 * https://community.shopify.com/c/shopify-design/ordinal-number-in-javascript-1st-2nd-3rd-4th/m-p/72156
 * @param n
 */
const ordNumber = (n: number) => {
  const s = ["th", "st", "nd", "rd"],
      v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
};