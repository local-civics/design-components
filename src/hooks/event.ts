import {useApi}              from "@local-civics/js-client";
import {useEffect} from "./react"
import {useState} from "react";
import {Event, EventQuery}   from "../components/event/model";

/**
 * A custom hook to get events
 */
export const useEvents: (
    courseName: string,
    query?: EventQuery | null,
) => Event[] | null = (courseName: string, query?: EventQuery | null) => {
    const { api } = useApi();
    const [events, setEvents] = useState(null as Event[] | null)
    useEffect(() => {
        console.log("hello");
        (async () => {
            if(query === null){
                setEvents([])
            } else {
                setEvents(await api("GET", `/curriculum/v0/courses/${courseName}/events`, query));
            }
        })();
    }, [query]);
    return events;
};