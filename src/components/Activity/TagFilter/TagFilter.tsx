import React from "react";
import { Icon } from "../../index";

/**
 * FilterProps
 */
export interface TagFilterProps {
  tags?: string[];
  onChange?: (tags: string[]) => void;
}

/**
 * Filter
 * @param props
 * @constructor
 */
export const TagFilter = (props: TagFilterProps) => {
  const timeTags = ["morning", "afternoon", "evening", "weekend"];
  const skillTags = ["leadership", "speaking", "group", "navigation"];
  const locationTags = ["online", "in-person", "at-school", "community"];
  const init: Record<string, boolean> = {};
  props.tags &&
    props.tags.map((tag) => {
      init[tag] = true;
    });

  const [active, setActive] = React.useState(init);
  const onTagClick = (tag: string) => {
    if (active[tag]) {
      setActive({ ...active, [tag]: false });
      const tags = Object.entries({ ...active, [tag]: false })
        .filter(([, active]) => active)
        .map(([tag]) => tag);
      props.onChange && props.onChange(tags);
    } else {
      setActive({ ...active, [tag]: true });

      const tags = Object.entries({ ...active, [tag]: true })
        .filter(([, active]) => active)
        .map(([tag]) => tag);
      props.onChange && props.onChange(tags);
    }
  };

  React.useEffect(() => {
    props.tags &&
      props.tags.map((tag) => {
        init[tag] = true;
      });
  }, [props.tags]);

  return (
    <article className="w-full">
      <div className="grow p-5 shadow-sm rounded-md bg-sky-100">
        <div className="grid grid-cols-1 gap-2 md:grid-cols-3">
          <div>
            <div className="inline-block w-4 h-4 max-w-4 stroke-gray-600 fill-gray-600">
              <Icon name="clock" />
            </div>
            <span className="ml-2 text-gray-600 font-semibold">Time</span>
            <div className="mt-5 grid grid-cols-2 gap-3">
              {timeTags.map((tag, i) => {
                const base =
                  "cursor-pointer shadow-sm text-center font-semibold inline-block rounded-md capitalize hover:text-gray-600 hover:bg-gray-50 active:bg-gray-50 px-4 py-2 text-xs";
                const bg = active[tag] ? "bg-sky-500 text-white" : "bg-gray-100 text-gray-600";
                const className = [base, bg].join(" ");
                return (
                    <button onClick={() => onTagClick(tag)} key={tag + i} className={className}>{tag}</button>
                );
              })}
            </div>
          </div>

          <div>
            <div className="inline-block w-4 h-4 max-w-4 stroke-gray-600 fill-gray-600">
              <Icon name="clock" />
            </div>
            <span className="ml-2 text-gray-600 font-semibold">Skills</span>
            <div className="mt-5 grid grid-cols-2 gap-3">
              {skillTags.map((tag, i) => {
                const base =
                  "cursor-pointer shadow-sm text-center font-semibold inline-block rounded-md capitalize hover:text-gray-600 hover:bg-gray-50 active:bg-gray-50 px-4 py-2 text-xs";
                const bg = active[tag] ? "bg-sky-500 text-white" : "bg-gray-100 text-gray-600";
                const className = [base, bg].join(" ");
                return (
                  <button onClick={() => onTagClick(tag)} key={tag + i} className={className}>{tag}</button>
                );
              })}
            </div>
          </div>

          <div>
            <div className="inline-block w-4 h-4 max-w-4 stroke-gray-600 fill-gray-600">
              <Icon name="pin" />
            </div>
            <span className="ml-2 text-gray-600 font-semibold">Location</span>
            <div className="mt-5 grid grid-cols-2 gap-3">
              {locationTags.map((tag, i) => {
                const base =
                  "cursor-pointer shadow-sm text-center font-semibold inline-block rounded-md capitalize hover:text-gray-600 hover:bg-gray-50 active:bg-gray-50 px-4 py-2 text-xs";
                const bg = active[tag] ? "bg-sky-500 text-white" : "bg-gray-100 text-gray-600";
                const className = [base, bg].join(" ");
                return (
                    <button onClick={() => onTagClick(tag)} key={tag + i} className={className}>{tag}</button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};
