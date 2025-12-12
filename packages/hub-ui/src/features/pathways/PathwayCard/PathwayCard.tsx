import * as React from "react";
import { Icon, IconName } from "../../../components/Icon/Icon";
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
  startedAt?: string | null;
  weight: number;
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
  const completedCount = badges.filter(b => b.completedAt).length;
  const target = props.target || badges.length;
  

//TODO: should pass this to a PathwayEmblem instead making a file at 
//design-components/packages/hub-ui/src/features/pathways/PathwayEmblem/PathwayEmblem.tsx
  return (
    <Card onClose={props.onClose}>
      <div className="pb-5 text-zinc-600">
        <div className="pb-5 px-5 flex gap-x-2">

          <BadgeEmblem
          iconURL={props.imageURL} //This is correct, the iconrl is populated in the BadgeEmblem for badges. level, imageUARL, and icon are undefined.
          alt={props.title}
          size="md"
          />

          <div className="max-w-[20rem]">
          <p className="font-semibold">{props.title}</p>
          <div className="text-xs">
            <span className="text-zinc-500 font-semibold">Tags</span>
            {(props.displayTags ?? []).length > 0 && (
              <div className="inline-block ml-1 text-green-500">
                {(props.displayTags ?? []).map((tag, index) => (
                  <span key={index} className="font-semibold mr-1">
                    {tag}
                  </span>
                ))}
              </div>
              )}

          </div>
            {!!props.description && <p className="mt-2 text-sm">{props.description}</p>}
          </div>
        </div>
        <div className="p-5 grid grid-cols-1 gap-y-3 md:min-w-[30rem] max-w-[40rem] border-t border-zinc-200">
          <p className="font-semibold">Pathway Badges & Criteria</p>
          <p className="text-xs">This pathway is comprised of {target} Badges. It includes required and elective programming.</p>
          <p className="text-xs">Progress: {completedCount} / {target} badges completed.</p>


          <div className="mt-2 grid grid-cols-1 gap-y-2 max-h-[18rem] overflow-y-auto">
            {badges.map((b) => {
              const buttonText = b.completedAt ? "Completed" : b.startedAt ? "Continue" : "Start";
              const buttonTheme = b.completedAt ? "light" : "dark";
              const iconName = b.completedAt ? "check & circle" : "circle";
              const iconColor = b.completedAt ? "text-green-500" : "text-zinc-300";

              return (
                  <div key={b.badgeId} className="flex gap-x-2 items-center">
                    <div className={`shrink-0 h-4 w-4 ${iconColor}`}>
                      <Icon name={iconName} />
                    </div>
                    <div className="grow">
                      <div>
                        <span className="font-semibold">{b.displayName}</span>
                      </div>
                      <div className="text-xs">
                        {/* <span>{b.TagsOfSomeSort TODO: }</span> */}
                        {<span className="ml-1 text-green-500 font-semibold whitespace-nowrap">
                          {b.weight} {b.weight === 1 ? "point" : "points"}
                        </span>}
                      </div>
                    </div>
                    { <div className="shrink-0 w-full max-w-[7rem]">
                      <Button
                        onClick={b.onClick}
                        spacing="sm"
                        border="rounded"
                        size="full:sm"
                        color="blue"
                        theme={buttonTheme}
                        text={buttonText}
                      />
                    </div> }
                  </div>
              );
            })}
      
          </div>


        </div>
          <div className="pt-5 px-5 flex border-t border-zinc-200">
            <div className="w-full max-w-[7rem] ml-auto">
              <Button
                  disabled={true} //TODO: enable Pathway Submission
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
      </div>
      </Card>
  );
};