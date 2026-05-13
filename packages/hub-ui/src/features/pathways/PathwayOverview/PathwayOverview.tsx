import * as React from "react";
import { Icon, IconName } from "../../../components/Icon/Icon";
import { Button } from "../../../components/Button/Button";
import { PathwayProgressBarChart } from "../PathwayProgressBarChart/PathwayProgressBarChart";
import { SharedPathwayProps } from "../types";

export const PathwayOverview = (props: SharedPathwayProps & { target?: number }) => {
  const badges = props.badges || [];
  const completedCount = badges.filter(b => b.completedAt).length;
  const target = props.target || badges.length;
  const categoryIds = Object.keys(props.rawCriteria ?? {});

  const [activeFilters, setActiveFilters] = React.useState<Set<string>>(
    () => new Set()
  );

  const filteredBadges = activeFilters.size === 0
    ? badges
    : badges.filter(b => b.categories?.some(categoryId => activeFilters.has(categoryId)));

  const filterClassName = "inline-block px-4 py-2 bg-gray-600 text-white rounded-full cursor-pointer text-sm";

  const toggleFilter = (categoryId: string) => {
    setActiveFilters((prev) => {
      if (prev.has(categoryId)) {
        return new Set();
      }
      return new Set([categoryId]);
    });
  };

  return (
    <div className="flex flex-col">
      {/* ORIGINAL TAGS & DESCRIPTION SECTION */}
      <div className="px-5 pb-5">
        <div className="max-w-[20rem]">
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

      {/* MAIN BODY */}
      <div className="p-5 grid grid-cols-1 gap-y-3 md:min-w-[30rem] max-w-[40rem] border-t border-zinc-200">
        <p className="font-semibold">Pathway Badges & Criteria</p>
        
        <p className="text-xs">This pathway is comprised of {target} Badges. It includes required and elective programming.</p>
        <p className="text-xs">Progress: {completedCount} / {target} badges completed.</p>

        <PathwayProgressBarChart
          targets={props.mappedTargets}
          points={props.mappedPoints}
          height="sm"
        />

        <div className="flex flex-wrap gap-2 mt-3">
          {categoryIds.map((id) => {
            const isActive = activeFilters.has(id);
            const label = props.categoryNames?.[id] ?? id; // Display for the user

            return (
              <div
                key={id}
                onClick={() => toggleFilter(id)}
                className={
                  isActive
                    ? `${filterClassName} bg-gray-700`
                    : "inline-block px-4 py-2 bg-gray-200 text-gray-700 rounded-full cursor-pointer text-sm hover:bg-gray-300"
                }
              >
                {label}
              </div>
            );
          })}
        </div>

        <div className="mt-2 grid grid-cols-1 gap-y-2 max-h-[18rem] overflow-y-auto">
          {filteredBadges.map((b) => {
            const buttonText = b.completedAt ? "Completed" : b.startedAt ? "Continue" : "Start";
            const buttonTheme = b.completedAt ? "light" : "dark";
            const iconName = b.completedAt ? "check & circle" : "circle";
            const iconColor = b.completedAt ? "text-green-500" : "text-zinc-300"; // Restored zinc-300

            return (
              <div key={b.badgeId} className="flex gap-x-2 items-center">
                <div className={`shrink-0 h-4 w-4 ${iconColor}`}>
                  <Icon name={iconName as IconName} />
                </div>
                <div className="grow">
                  <div>
                    <span className="font-semibold">{b.displayName}</span>
                  </div>
                  <div className="text-xs">
                    <span className="ml-1 text-green-500 font-semibold whitespace-nowrap">
                      {b.weight} {b.weight === 1 ? "point" : "points"}
                    </span>
                  </div>
                </div>
                
                <div className="shrink-0 w-full max-w-[7rem]">
                  <Button
                    onClick={b.onClick}
                    spacing="sm"
                    border="rounded"
                    size="full:sm"
                    color="blue"
                    theme={buttonTheme}
                    text={buttonText}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};