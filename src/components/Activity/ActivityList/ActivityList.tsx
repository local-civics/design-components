import React, { useCallback } from "react";
import { TagFilter } from "../TagFilter/TagFilter";
import { Gallery } from "../Gallery/Gallery";
import { ActivityPreview } from "../ActivityPreview/ActivityPreview";
import { Button } from "../../Button/Button";

/**
 * ActivityListProps
 */
export type ActivityListProps = {
  isLoading?: boolean;
  search?: string;
  onSearch?: (search?: string) => void;
  tags?: string[];
  onTagChange?: (tags: string[]) => void;
  activities?: any[];
  top?: any[];
  upcoming?: any[];
  milestones?: any[];
  onActivityClick?: (activityId: string) => void;
};

/**
 * A component for listing activities
 * @param props
 * @constructor
 */
export const ActivityList = (props: ActivityListProps) => {
  const primary = !props.top ? null : props.top.length > 0 ? props?.top[0] : null;
  return (
    <>
      <Search value={props.search} send={(search?: string) => props.onSearch && props.onSearch(search)} />
      <TagFilter tags={props.tags} onChange={props.onTagChange} />
      <Gallery
        isLoading={props.isLoading}
        primary={
          !props.search &&
          primary && (
            <ActivityPreview
              {...primary}
              onClick={() => props.onActivityClick && props.onActivityClick(primary.activityId)}
            />
          )
        }
        top={
          !props.search &&
          props.top &&
          props.top.length > 0 && (
            <article className="grid grid-cols-1 md:flex gap-2 overflow-scroll">
              {props.top.map((activity) => {
                return (
                  <ActivityPreview
                    key={`${activity.activityId}`}
                    {...activity}
                    onClick={() => props.onActivityClick && props.onActivityClick(activity.activityId)}
                  />
                );
              })}
            </article>
          )
        }
        soonest={
          !props.search &&
          props.upcoming &&
          props.upcoming.length > 0 && (
            <article className="grid grid-cols-1 md:flex gap-2 overflow-scroll">
              {props.upcoming.map((activity) => {
                return (
                  <ActivityPreview
                    key={`${activity.activityId}`}
                    {...activity}
                    onClick={() => props.onActivityClick && props.onActivityClick(activity.activityId)}
                  />
                );
              })}
            </article>
          )
        }
        milestones={
          !props.search &&
          props.milestones &&
          props.milestones.length > 0 && (
            <article className="grid grid-cols-1 md:flex gap-2 overflow-scroll">
              {props.milestones.map((activity) => {
                return (
                  <ActivityPreview
                    key={`${activity.activityId}`}
                    {...activity}
                    onClick={() => props.onActivityClick && props.onActivityClick(activity.activityId)}
                  />
                );
              })}
            </article>
          )
        }
        filteredCount={props.activities?.length}
        filtered={
          props.activities &&
          props.activities.length > 0 && (
            <article className="grid grid-cols-1 md:flex gap-2 overflow-scroll">
              {props.activities.map((activity) => {
                return (
                  <ActivityPreview
                    key={`${activity.activityId}`}
                    {...activity}
                    onClick={() => props.onActivityClick && props.onActivityClick(activity.activityId)}
                  />
                );
              })}
            </article>
          )
        }
      />
    </>
  );
};

/**
 * A component for debouncing search
 * @param send
 * @param value
 * @constructor
 */
const Search = ({ send, value }: { value?: string; send: (search?: string) => void }) => {
  const handler = useCallback(debounce(send, 500), []);
  return (
    <div className="relative block">
      <label className="relative block">
        <span className="absolute inset-y-0 left-0 top-0 flex items-center pl-2">
          <Button icon="search" />
        </span>
        <input
          autoFocus={true}
          defaultValue={value}
          onChange={(e) => handler(e.target.value)}
          className="placeholder:text-slate-400 text-slate-400 block bg-white w-full text-sm border border-slate-300 rounded-md py-3 px-8 shadow-sm cursor-pointer hover:bg-sky-50 hover:border-sky-100 hover:text-slate-500 hover:placeholder:text-slate-600 focus:outline-none hover:bg-sky-50 hover:border-sky-100"
          type="text"
          name="search"
          placeholder="Search for activities..."
        />
      </label>
    </div>
  );
};

// A utility for debouncing search
const debounce = (func: (search: string) => void, delay: number) => {
  let timeout: NodeJS.Timeout;
  return (search: string) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(search), delay);
  };
};
