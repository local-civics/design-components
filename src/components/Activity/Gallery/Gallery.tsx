import React from "react";
import { Loader } from "../../index";

/**
 * GalleryProps
 */
export type GalleryProps = {
  isLoading?: boolean;
  primary?: React.ReactNode
  top?: React.ReactNode
  soonest?: React.ReactNode
  milestones?: React.ReactNode
  filteredCount?: number;
  filtered?: React.ReactNode
};

/**
 * A component for displaying a gallery of activities
 * @param props
 * @constructor
 */
export const Gallery = (props: GalleryProps) => {
  const hasPrimary = !!props.primary;
  const hasTop = props.top && React.Children.count(props.top) > 0;
  const hasSoonest = props.soonest && React.Children.count(props.soonest) > 0;
  const hasMilestones = props.milestones && React.Children.count(props.milestones) > 0;
  const numFiltered = props.filtered ? React.Children.count(props.filtered) : 0;
  const hasFiltered = numFiltered > 0;
  const hasAny = hasPrimary || hasTop || hasSoonest || hasMilestones || hasFiltered;

  return (
    <Loader isLoading={props.isLoading}>
      {(hasPrimary || hasTop) && (
        <label className="mt-5 relative block grid grid-cols-1 gap-y-2">
          <p className="text-gray-600 font-semibold">Trending</p>
          {hasPrimary && props.primary}
          {hasTop && props.top}
        </label>
      )}

      {hasSoonest && (
        <label className="mt-5 relative block grid grid-cols-1 gap-y-2">
          <p className="text-gray-600 font-semibold">Upcoming</p>
          {props.soonest}
        </label>
      )}

      {hasMilestones && (
        <label className="mt-5 relative block grid grid-cols-1 gap-y-2">
          <p className="text-gray-600 font-semibold">Milestones</p>
          {props.milestones}
        </label>
      )}

      {hasFiltered && !!props.filteredCount && (
        <label className="mt-5 relative block grid grid-cols-1 gap-y-2">
          <p className="text-gray-600 font-semibold">Events</p>
          <p className="text-gray-600 text-sm"> We found {props.filteredCount >= 10 ? "10+" : props.filteredCount} activities. </p>
          {props.filtered}
        </label>
      )}

      {!hasAny && (
        <label className="mt-5 relative block">
          <p className="text-gray-600 font-semibold">Activities</p>
          <p className="text-gray-600 mt-5 text-sm">No activities found.</p>
        </label>
      )}
    </Loader>
  );
};
