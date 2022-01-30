import React         from "react";
import { Community } from "../../models/community";
import { Event }     from "../../models/event"
import {Icon}        from "../icon";

export interface EventTableProps {
    community: Community | null
    events: Event[] | null
    day: Date | null
    onSetDay: (day: Date | null) => void;
}

export const EventTable = (props: EventTableProps) => {
    const [day, setDay] = React.useState(props.day || new Date())

    return <article className="border-gray-200 border shadow-sm rounded-md min-h-48 w-full overflow-hidden">
        <div className="p-2 bg-gray-200" />
        <div className="min-h-60">
            <div className="p-5">
                <div className="flex items-center">
                    <div className="grow">
                        <div className="flex items-center">
                            <div>
                                <span className="font-semibold text-3xl text-slate-600">
                                    {Intl.DateTimeFormat("en-US", {
                                        month: "long",
                                    }).format(day)}
                                </span>
                                <span className="font-semibold ml-2 text-3xl text-slate-600">
                                    { getNumberWithOrdinal(day.getDate()) }
                                </span>
                                <span className="text-3xl ml-2 text-slate-600">
                                    {Intl.DateTimeFormat("en-US", {
                                        year: "numeric"
                                    }).format(day)}
                                </span>
                            </div>
                            <Icon onClick={() => setDay(new Date(day.getFullYear(), day.getMonth(), day.getDate() - 1))} className="cursor-pointer ml-5 w-3 h-3 min-w-3 fill-slate-300 stroke-slate-300 hover:stroke-slate-500 hover:fill-slate-500" icon="leftArrow"/>
                            <Icon onClick={() => setDay(new Date(day.getFullYear(), day.getMonth(), day.getDate() + 1))} className="cursor-pointer ml-2 w-3 h-3 min-w-3 fill-slate-300 stroke-slate-300 hover:stroke-slate-500 hover:fill-slate-500" icon="rightArrow"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </article>
}

/**
 * https://community.shopify.com/c/shopify-design/ordinal-number-in-javascript-1st-2nd-3rd-4th/m-p/72156
 * @param n
 */
const getNumberWithOrdinal = (n: number) => {
    const s = ["th", "st", "nd", "rd"], v = n % 100;
    return n + (s[(v - 20) % 10] || s[v] || s[0]);
}