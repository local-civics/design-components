import * as React from "react";
import { BadgeEmblem } from "../../badges/BadgeEmblem/BadgeEmblem";


export type PathwayButtonProps = {
  title?: string;
  description?: string;
  imageURL?: string;
  compact?: boolean;

  onClick?: () => void;
};

export const PathwayButton = (props: PathwayButtonProps) => {
  const cursorClass = "cursor-pointer";
  const bgHover = "hover:bg-sky-50";

  const onClick = () => {
    if (props.onClick) props.onClick();
  };

  //list mode
  if (props.compact) {
    return <div
        onClick={onClick}
        className={`text-zinc-600 relative overflow-hidden py-3 px-5 transition ease-in-out duration-600 ${cursorClass} ${bgHover}`}
      >
    <div className="flex gap-3">
      <div className={`w-max my-auto`}>
        <BadgeEmblem
            iconURL={props.imageURL}
            alt={props.title}
            size="xxs"
        />
      </div>
      <div className="text-sm my-auto flex gap-x-2">
        <span className="font-semibold text-zinc-600">{props.title}</span>
      </div>
    </div>
    </div>;
  }
  

  //grid mode
return (
  <div className="grid grid-cols-1 w-44 overflow-x-hidden gap-y-3 text-zinc-600">
    <div className="flex flex-col border h-max border-zinc-100 rounded-md bg-gray-100">
        <div
          onClick={onClick}
          className={`relative overflow-hidden p-5 transition ease-in-out duration-600 ${cursorClass} ${bgHover}`}
        >

        <div className={`w-max my-auto`}>
          <BadgeEmblem
              iconURL={props.imageURL}
              alt={props.title}
              size="md"
          />
        </div>
      </div>

    </div>

    {!!props.title && (
      <div className="text-sm m-auto flex gap-x-2">
        <span className="font-semibold text-zinc-600">{props.title}</span>
      </div>
    )}
  </div>
);
};