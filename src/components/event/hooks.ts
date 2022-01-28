import { useApi } from "@local-civics/js-client";
import { useEffect, useState } from "react";
import {Event, EventQuery}     from "./model";

/**
 * useEvent hook
 * @param courseName
 * @param eventName
 */
export const useEvent: (
  courseName: string,
  eventName: string
) => [Event, boolean] = (courseName: string, eventName: string) => {
  const { api } = useApi();
  const [state, setState] = useState({
    event: {
      data: {} as Event,
      isLoading: true,
    },
  });

  useEffect(() => {
    (async () => {
      setState({
        ...state,
        event: {
          ...state.event,
          data: await api(
            "GET",
            `/curriculum/v0/courses/${courseName}/events/${eventName}`
          ),
          isLoading: false,
        },
      });
    })();
  }, []);

  return [state.event.data, state.event.isLoading];
};

/**
 * useEvents hook
 * @param courseName
 * @param query
 * @param isFiltering
 */
export const useEvents: (
  courseName: string,
  query?: EventQuery,
  isFiltering?: boolean,
) => [Event[], boolean] = (courseName: string, query?: EventQuery, isFiltering: boolean = true) => {
  const { api } = useApi();
  const [state, setState] = useState({
    events: {
      data: [] as Event[],
      isLoading: isFiltering && !!courseName,
    },
  });

  useEffect(() => {
    if(!state.events.isLoading){
      return
    }

    (async () => {
      setState({
        ...state,
        events: {
          ...state.events,
          data: await api("GET", `/curriculum/v0/courses/${courseName}/events`, query),
          isLoading: false,
        },
      });
    })();
  }, []);

  return [state.events.data, state.events.isLoading];
};
