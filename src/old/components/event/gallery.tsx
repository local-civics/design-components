import { Icon } from "../../../components";
import { Event } from "../../models/event";

export interface EventGalleryProps {
  events: Event[];
  className?: string;
  onClick: (eventName?: string) => void;
}

export const EventGallery = (props: EventGalleryProps) => {
  // todo: scroll pagination
  return (
    <article className={["grid grid-cols-1 md:flex gap-2", props.className || ""].join(" ")}>
      {props.events.map((event) => {
        return (
          <div
            onClick={() => props.onClick(event.eventName)}
            key={event.eventName}
            className="grow cursor-pointer relative rounded-md min-w-64 h-[22rem] overflow-hidden"
          >
            <img className="h-full w-full object-cover" alt={event.title} src={event.imageURL} />
            <div className="absolute bottom-0 w-full">
              <div className="p-5 bg-gray-800/75 w-full">
                <div className="text-sm font-bold text-white w-full">{event.title}</div>
                <div className="mt-2 flex items-center gap-x-2 w-full">
                  <Icon className="flex-shrink-0 w-6 h-6 stroke-white fill-white" icon={event.pathway || "globe"} />
                  <span className="grow">
                    <div className="text-xs font-light capitalize text-white w-full">{event.pathway}</div>
                  </span>
                  <div className="text-slate-600 shadow-md whitespace-nowrap font-semibold rounded-md text-xs px-5 py-2 bg-cyan-400">
                    {event.proficiency} pts
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </article>
  );
};
