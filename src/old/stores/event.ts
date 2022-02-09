import React from "react";
import { useEvent } from "../hooks/event";
import { useEffect } from "../hooks/react";
import { Navigation, Request, useRequest, useRequestContext } from "../hooks/request";
import { Community } from "../models/community";
import { Event, EventQuery } from "../models/event";
import { Resident } from "../models/resident";

/**
 * The event store.
 */
interface EventStore {
  request: {
    origin: Request;
    navigate: Navigation;
    community: Community | null;
    resident: Resident | null;
    eventQuery: EventQuery | null;
  };
  response: {
    event: Event | null;
  };
}

/**
 * A hook to use the event store.
 */
export const useEventStore = () => {
  const req = useRequestContext() || useRequest();
  const defaultStore: EventStore = {
    request: {
      origin: req,
      community: req.community,
      resident: req.resident,
      eventQuery: null,
      navigate: req.navigate,
    },
    response: {
      event: null,
    },
  };
  const [store, setStore] = React.useState(defaultStore);
  const event = useEvent(req.community?.communityName, req.params.eventName, store.request.eventQuery);

  useEffect(() => {
    setStore({ ...store, request: { ...store.request, origin: req } });
  }, [req]);

  useEffect(() => {
    setStore(defaultStore);
  }, [req.community, req.resident]);

  useEffect(() => {
    setStore({ ...store, response: { ...store.response, event: event } });
  }, [event]);

  return {
    ...store,
  };
};
