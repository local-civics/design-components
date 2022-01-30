import React           from "react";
import {EventArtifact} from "../event/artifact";
import {EventGallery}  from "../event/gallery";
import {Icon}          from "../icon";
import {Loader}        from "../loader";
import {Pathway}       from "../pathway";
import {PathwayWidget} from "./pathway.widget";
import {TagWidget}     from "./tag.widget";
import {Event}         from "../../models/event"
import {Resident} from "../../models/resident"

/**
 * ExploreComponent props
 */
export interface ExploreComponentProps{
    resident: Resident | null
    top: Event[] | null
    soonest: Event[] | null
    sponsored: Event[] | null
    filtered: Event[] | null
    pathways: Pathway[] | null
    tags: string[] | null
    onPathwayClick: (pathways: Pathway[]) => void;
    onTagClick: (tags: string[]) => void;
    onEventClick: (eventName?: string) => void;
    onEventSearch: (title: string) => void;
}

/**
 * Pure presentational explore component
 * @constructor
 */
export const ExploreComponent = (props: ExploreComponentProps) => {
  const filtered = props.filtered;
  const hasFiltered = filtered && filtered.length > 0;

  const mostRecommended = props.top?.slice(0, 1)[0];
  const hasMostRecommended = !hasFiltered && mostRecommended

  const recommended = props.top?.slice(1);
  const hasRecommended = !hasFiltered && recommended && recommended.length > 0

  const sponsored = props.sponsored;
  const hasSponsored = !hasFiltered && sponsored && sponsored.length > 0

  const soonest = props.soonest;
  const hasSoonest = !hasFiltered && soonest && soonest.length > 0
  const hasEvents = hasFiltered || hasMostRecommended || hasRecommended || hasSponsored || hasSoonest
  const body = <>
      { hasMostRecommended && <label className="mt-5 relative block">
          <p className="text-gray-600 font-semibold">Trending</p>
          <EventArtifact className="mt-5 overflow-x-scroll" event={mostRecommended} onClick={props.onEventClick}/>
          {hasRecommended && <EventGallery className="mt-5 overflow-x-scroll" events={recommended} onClick={props.onEventClick}/>}
      </label> }

      { hasSponsored && <label className="mt-5 relative block">
          <p className="text-gray-600 font-semibold">Sponsored</p>
          <EventGallery className="mt-5 overflow-x-scroll" events={sponsored} onClick={props.onEventClick}/>
      </label> }

      { hasSoonest && <label className="mt-5 relative block">
          <p className="text-gray-600 font-semibold">Upcoming</p>
          <EventGallery className="mt-5 overflow-x-scroll" events={soonest} onClick={props.onEventClick}/>
      </label> }

      { hasFiltered && <label className="mt-5 relative block">
          <p className="text-gray-600 font-semibold">Events</p>
          <p className="text-gray-600 text-sm"> We found {filtered?.length >= 10 ? "10+" : filtered?.length} events </p>
          <EventGallery className="mt-5 overflow-x-scroll" events={filtered} onClick={props.onEventClick}/>
      </label> }

      { !hasEvents && <label className="mt-5 relative block">
          <p className="text-gray-600 font-semibold">Events</p>
          <p className="text-gray-600 mt-5 text-sm"> No events found for your search. </p>
      </label> }
  </>

  return (
      <Loader isLoading={props.resident === null}>
          <article className="px-4 lg:px-24 py-5">
              {/* Body */}
              <div className="lg:flex w-full mt-5">
                  {/* Left Panel */}
                  <div className="lg:flex lg:flex-col w-full lg:w-60">
                      <PathwayWidget pathways={props.pathways} onPathwayClick={props.onPathwayClick} />
                      <p className="place-self-center inline-block mt-2 mb-2 text-xs text-slate-300">
                          Local Civics © {new Date().getFullYear()}
                      </p>
                  </div>

                  {/* Right Panel */}
                  <div className="lg:flex lg:flex-col lg:ml-9 w-full max-w-full lg:px-2 overflow-x-hidden">
                      {/* Search bar */}
                      <label className="relative block">
                          <p className="mb-3 text-slate-600 font-semibold text-md">
                              Find Events
                          </p>
                          <span className="absolute inset-y-0 left-0 top-[2.2rem] flex items-center pl-2">
                                <Icon className="w-4 h-4 min-w-4 stroke-slate-300 fill-slate-300" icon="search"/>
                            </span>
                          <input onChange={(e) => props.onEventSearch(e.target.value)} className="placeholder:italic placeholder:text-slate-400 text-slate-500 block bg-white w-full border border-slate-300 rounded-md py-2 pl-8 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm" type="text" name="search" placeholder="Search for community events..." />
                      </label>

                      <TagWidget tags={props.tags} onTagClick={props.onTagClick} className="mt-5"/>

                      <Loader isLoading={props.top === null || props.soonest === null || props.filtered === null}>
                          {body}
                      </Loader>
                  </div>
              </div>
          </article>
      </Loader>
  );
};
