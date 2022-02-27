import React from "react";
import { Loader, Search, SearchProps } from "../../../../components";
import { ExperienceProps } from "../Experience/Experience";

export type GalleryProps = SearchProps & {
  count?: number;
  onSearch?: (search: string) => void;
  resolving?: boolean;
  primary?: React.ReactElement<ExperienceProps> | null | false;
  top?: React.ReactElement<GalleryProps> | null | false;
  soonest?: React.ReactElement<GalleryProps> | null | false;
  milestones?: React.ReactElement<GalleryProps> | null | false;
  filtered?: React.ReactElement<GalleryProps> | null | false;
};

export const Gallery = (props: GalleryProps) => {
  const hasPrimary = !!props.primary;
  const hasTop = props.top && React.Children.count(props.top) > 0;
  const hasSoonest = props.soonest && React.Children.count(props.soonest) > 0;
  const hasMilestones = props.milestones && React.Children.count(props.milestones) > 0;
  const numFiltered = props.filtered ? React.Children.count(props.filtered) : 0;
  const hasFiltered = numFiltered > 0;
  const hasAny = hasPrimary || hasTop || hasSoonest || hasMilestones || hasFiltered;

  return (
    <Loader isLoading={props.resolving}>
      <div className="relative block">
        <Search
          open={props.open}
          results={props.results}
          onClose={props.onClose}
          onOpen={props.onOpen}
          onSearch={props.onSearch}
          placeholder="Search for learning experiences..."
        />
      </div>

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

      {hasFiltered && !!props.count && (
        <label className="mt-5 relative block grid grid-cols-1 gap-y-2">
          <p className="text-gray-600 font-semibold">Events</p>
          <p className="text-gray-600 text-sm"> We found {props.count >= 10 ? "10+" : props.count} events </p>
          {props.filtered}
        </label>
      )}

      {!hasAny && (
        <label className="mt-5 relative block">
          <p className="text-gray-600 font-semibold">Events</p>
          <p className="text-gray-600 mt-5 text-sm">No events found.</p>
        </label>
      )}
    </Loader>
  );
};
