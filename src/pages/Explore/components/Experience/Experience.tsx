import { Icon, IconName } from "../../../../components";

export type ExperienceProps = {
  headline?: string;
  pathway?: string;
  xp?: number;
  imageURL?: string;
  onClick?: () => void;
};

export const Experience = (props: ExperienceProps) => {
  return (
    <div onClick={props.onClick} className="grow cursor-pointer relative rounded-md min-w-64 h-[22rem] overflow-hidden">
      <img className="h-full w-full object-cover" alt={props.headline} src={props.imageURL} />
      <div className="absolute bottom-0 w-full">
        <div className="p-5 bg-gray-800/75 w-full">
          <div className="text-sm font-bold text-white w-full">{props.headline}</div>
          <div className="mt-2 flex items-center gap-x-2 w-full">
            <div className="flex-shrink-0 w-6 h-6 text-white fill-white">
              <Icon name={(props.pathway as IconName) || "globe"} />
            </div>
            {props.pathway && (
              <span className="grow">
                <div className="text-sm font-medium capitalize text-white w-full">{props.pathway}</div>
              </span>
            )}
            {props.xp && (
              <div className="text-slate-600 shadow-md whitespace-nowrap font-bold rounded-md text-sm px-5 py-2 bg-cyan-400">
                {props.xp} pts
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
