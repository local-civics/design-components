import { Icon } from "../../../../components";

export type ExperienceProps = {
  displayName?: string;
  pathway?: "policy & government" | "arts & culture" | "college & career" | "volunteer" | "recreation";
  quantity?: number;
  imageURL?: string;
  onClick?: () => void;
};

export const Experience = (props: ExperienceProps) => {
  return (
    <div onClick={props.onClick} className="grow cursor-pointer relative rounded-md min-w-64 h-[22rem] overflow-hidden">
      <img className="h-full w-full object-cover" alt={props.displayName} src={props.imageURL} />
      <div className="absolute bottom-0 w-full">
        <div className="p-5 bg-gray-800/75 w-full">
          <div className="text-sm font-bold text-white w-full">{props.displayName}</div>
          <div className="mt-2 flex items-center gap-x-2 w-full">
            <div className="flex-shrink-0 w-6 h-6 text-white fill-white">
              <Icon name={props.pathway || "globe"} />
            </div>
            {props.pathway && (
              <span className="grow">
                <div className="text-xs font-medium capitalize text-white w-full">{props.pathway}</div>
              </span>
            )}
            {props.quantity && (
              <div className="text-slate-600 shadow-md whitespace-nowrap font-bold rounded-md text-xs px-5 py-2 bg-cyan-400">
                {props.quantity} pts
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
