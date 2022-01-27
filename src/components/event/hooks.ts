import { useApi } from "@local-civics/js-client";
import { useEffect, useState } from "react";
import { Event } from "./model";

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
 * @param residentName
 * @param query
 * // todo: any
 */
export const useEvents: (
  residentName: string,
  query?: any
) => [Event[], boolean] = (residentName: string, query?: any) => {
  const { api } = useApi();
  const [state, setState] = useState({
    events: {
      data: [] as Event[],
      isLoading: true,
    },
  });

  useEffect(() => {
    (async () => {
      setState({
        ...state,
        events: {
          ...state.events,
          data: await api("GET", `/calendar/v0/${residentName}/events`, query),
          isLoading: false,
        },
      });
    })();
  }, []);

  return [state.events.data, state.events.isLoading];
};
