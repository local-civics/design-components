import * as React from "react";

import { Button } from "../../../components/Button/Button";
import { Card } from "../../../components/Card/Card";
import { BadgeEmblem } from "../../badges/BadgeEmblem/BadgeEmblem";

/**
 * BadgeItem
 */
export type BadgeItem = {
  badgeId: string;
  displayName: string;
  categories: string[];
  completedAt?: string | null;
  onClick?: () => void;
};

/**
 * PathwayCardProps
 */
export type PathwayCardProps = {
  imageURL?: string;
  title?: string;
  description?: string;
  badges?: BadgeItem[];
  progress?: number;
  target?: number;
  displayTags?: string[];
  onClose?: () => void;
  onSubmit?: () => void;
};

/**
 * PathwayCard
 * @param props
 * @constructor
 */
export const PathwayCard = (props: PathwayCardProps) => {
  const badges = props.badges || [];
  const progress = props.progress || 0;
  const target = props.target || badges.length;
  

//TODO: should pass this to a PathwayEmblem instead making a file at 
//design-components/packages/hub-ui/src/features/pathways/PathwayEmblem/PathwayEmblem.tsx
  return (
    <Card onClose={props.onClose}>
      <div className="pb-5 text-zinc-600">
        <div className="pb-5 px-5 flex gap-x-2">
        <BadgeEmblem
            imageURL={props.imageURL}
            alt={props.title}
            size="sm"
          />
          <div className="max-w-[20rem]">
          <p className="font-semibold">{props.title}</p>
            <div className="text-xs">
            <span className="text-zinc-500 font-semibold">
                This pathway is comprised of {target} Badges. It includes required and elective programming.
              </span>
              <span className="text-zinc-500 font-semibold">
                Progress {progress}/{target}
              </span>
            </div>
            {props.description && <p className="mt-2 text-sm">{props.description}</p>}
          </div>
        </div>
        {props.displayTags && props.displayTags.length > 0 && (
          <ul className="flex flex-wrap gap-2 px-5 mt-2">
            {props.displayTags.map((tag, idx) => (
              <li
                key={idx}
                className="px-2 py-1 bg-gray-200 rounded text-sm font-medium"
              >
                {tag}
              </li>
            ))}
          </ul>
        )}

        {badges.length > 0 && (
        <div className="p-5 grid grid-cols-1 gap-y-3 md:min-w-[30rem] max-w-[40rem] border-t border-zinc-200">
          <p className="font-semibold">Badges</p>
          <div className="mt-2 grid grid-cols-1 gap-y-2 max-h-[18rem] overflow-y-auto">
            {badges.map((b) => (
          <div
            key={b.badgeId}
            className="cursor-pointer hover:underline text-blue-600"
            onClick={b.onClick}
          >
            {b.displayName} {b.completedAt ? "(Completed)" : ""}
          </div>
          ))}
      </div>
    </div>
  )}
  { props.onSubmit &&
            <div className="pt-5 px-5 flex border-t border-zinc-200">
              <div className="w-full max-w-[7rem] ml-auto">
                <Button
                    disabled={true}
                    onClick={props.onSubmit}
                    spacing="sm"
                    border="rounded"
                    size="full:sm"
                    color="blue"
                    theme="dark"
                    text="Submit"
                />
              </div>
            </div>
        }
</div>
</Card>
);
};
