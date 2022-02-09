import React from "react";
import { useOutletContext } from "react-router-dom";
import { useEvents } from "../hooks/event";
import { useEffect } from "../hooks/react";
import { Navigation, Request, useRequest, useRequestContext } from "../hooks/request";
import { Community } from "../models/community";
import { Event, EventQuery } from "../models/event";
import { Resident } from "../models/resident";

/**
 * The calendar store.
 */
interface CalendarStore {
  request: {
    origin: Request;
    navigate: Navigation;
    community: Community | null;
    resident: Resident | null;
    today: Date;
    date: Date | null;
    eventQuery: EventQuery | null;
    tab: string | null;
  };
  response: {
    events: Event[] | null;
  };
}

/**
 * A hook to use the calendar store.
 */
export const useCalendarStore = () => {
  const req = useRequestContext() || useRequest();
  const today = new Date();
  const defaultStore: CalendarStore = {
    request: {
      origin: req,
      community: req.community,
      resident: req.resident,
      today: today,
      date: req.params.date ? new Date(req.params.date) : null,
      eventQuery: {
        residentName: req.resident?.residentName,
        timePeriod: "week",
        date: today.toISOString().substring(0, 10),
      },
      tab: req.query?.tab && req.query.tab.length > 0 ? req.query.tab[0] : "upcoming",
      navigate: req.navigate,
    },
    response: {
      events: null,
    },
  };
  const [store, setStore] = React.useState(defaultStore);
  const events = useEvents(store.request.community?.communityName, store.request.eventQuery);

  useEffect(() => {
    setStore({ ...store, request: { ...store.request, origin: req } });
  }, [req]);

  useEffect(() => {
    setStore(defaultStore);
  }, [req.community, req.resident]);

  useEffect(() => {
    setStore({
      ...store,
      request: { ...store.request, eventQuery: null },
      response: { ...store.response, events: null },
    });
    if (store.request.tab === "registered") {
      const query: EventQuery = {
        residentName: req.resident?.residentName,
        status: "registered",
      };
      setStore({
        ...store,
        request: { ...store.request, eventQuery: query },
        response: { ...store.response, events: null },
      });
    } else if (store.request.tab === "upcoming") {
      const query: EventQuery = {
        residentName: req.resident?.residentName,
        timePeriod: "week",
        date: store.request.today.toISOString().substring(0, 10),
      };
      setStore({
        ...store,
        request: { ...store.request, eventQuery: query },
        response: { ...store.response, events: null },
      });
    } else if (store.request.tab === "reflections") {
      const query: EventQuery = {
        residentName: req.resident?.residentName,
        status: "survey",
      };
      setStore({
        ...store,
        request: { ...store.request, eventQuery: query },
        response: { ...store.response, events: null },
      });
    }
  }, [store.request.tab]);

  useEffect(() => {
    setStore({
      ...store,
      request: { ...store.request, eventQuery: null },
      response: { ...store.response, events: null },
    });
    if (store.request.date) {
      const query = { date: store.request.date.toISOString().substring(0, 10) };
      setStore({
        ...store,
        request: { ...store.request, eventQuery: query },
        response: { ...store.response, events: null },
      });
    } else {
      setStore({ ...store, request: { ...store.request, tab: "upcoming" } });
    }
  }, [store.request.date]);

  useEffect(() => {
    setStore({ ...store, response: { ...store.response, events: events } });
  }, [events]);

  return {
    ...store,
    setDate: (date: Date | null) =>
      setStore({
        ...store,
        request: { ...store.request, tab: null, date: date },
      }),
    setTab: (tab: string | null) => setStore({ ...store, request: { ...store.request, tab: tab } }),
  };
};
