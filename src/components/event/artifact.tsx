import {Icon}  from "../icon";
import {Event} from "../../models/event"

/**
 * EventArtifactProps
 */
export interface EventArtifactProps{
    onClick: (eventName?: string) => void;
    className?: string
    event: Event
}

/**
 * EventArtifact
 * @param props
 * @constructor
 */
export const EventArtifact = (props: EventArtifactProps) => {
    const event = props.event;
    return <article onClick={() => props.onClick(event.eventName)} className={["rounded-md shadow-md overflow-hidden cursor-pointer relative h-[18rem] w-full", props.className || ""].join(" ")}>
        <img className="h-full w-full object-cover" alt={event.title} src={event.imageURL}/>
        <div className="absolute bottom-0 w-full">
            <div className="flex p-5 bg-gray-800/75 w-full">
                <span className="grow">
                    <div className="text-lg font-light capitalize text-white w-full">{event.pathway}</div>
                    <div className="mt text-2xl font-bold text-white w-full">{event.title}</div>
                </span>
                <Icon className="w-12 h-12 max-w-12 stroke-white fill-white" icon={event.pathway || "globe"}/>
            </div>
        </div>
    </article>
}