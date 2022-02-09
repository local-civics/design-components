import { request } from "@local-civics/js-client";
import React from "react";
import { NavigateFunction, useNavigate, useParams } from "react-router-dom";
import { ResidentContextState, useErrorContext, useResidentContext } from "../../../../contexts";
import { CalendarWidget } from "../../widgets/CalendarWidget/CalendarWidget";
import { Event } from "../../components/Event/Event";

/**
 * A connected container for the calendar widget.
 * @constructor
 */
export const CalendarContainer = () => {
  const calendar = useCalendar();
  return {
    CalendarWidget: () => (
      <CalendarWidget resolving={calendar.resolving} onSeeAll={() => {}}>
        {calendar.registered?.events &&
          calendar.registered.events.map((event) => (
            <Event open={!!event.open} title={event.title} notBefore={event.notBefore} onOpen={event.open} />
          ))}
      </CalendarWidget>
    ),
  };
};

type CalendarState = {
  resolving?: boolean;
  registered?: RegisteredState;
};

type RegisteredState = {
  events?: EventState[];
  more?: () => void;
};

type EventState = {
  eventName?: string;
  title?: string;
  notBefore?: string;
  open?: () => void;
};

/**
 * A hook to fetch a resident's calendar and subscribe to updates to.
 *
 * This hook must be called from the resident context.
 */
const useCalendar = () => {
  const ctx = useResidentContext();
  const navigate = useNavigate();
  const params = useParams();
  const errors = useErrorContext();
  const residentName = params.residentName;
  const communityName = params.communityName || ctx?.resident?.communityName;
  const defaultState: CalendarState = { resolving: true };
  const [state, setState] = React.useState(defaultState);

  React.useEffect(() => {
    if (!ctx?.accessToken || !residentName || !communityName) {
      setState(defaultState);
      return;
    }

    setState({ ...state, resolving: true });

    (async () => {
      try {
        const registered = await fetchRegisteredEvents(ctx, navigate, communityName, residentName);
        setState({ ...state, registered: registered, resolving: false });
      } catch (e) {
        errors.emit(e);
      }
    })();

    return () => setState(defaultState);
  }, [ctx?.accessToken, communityName, residentName]);
  return state;
};

const fetchRegisteredEvents = async (
  ctx: ResidentContextState,
  navigate: NavigateFunction,
  communityName?: string,
  residentName?: string
) => {
  const more = () => navigate(`/communities/${communityName}/calendar/events?status=registered`);
  const openEvent = (eventName?: string) => navigate(`/residents/${residentName}/events/${eventName}`);
  const endpoint = `/curriculum/v0/communities/${communityName}/events`;
  const query = {
    residentName: residentName,
    status: "registered",
    fields: ["eventName", "title", "notBefore"],
    limit: 3,
  };

  const events: EventState[] = await request(ctx.accessToken, "GET", endpoint, { params: query });
  events.map((event) => {
    if (residentName === ctx.resident?.residentName) {
      event.open = () => openEvent(event.eventName);
    }
  });

  const registered: RegisteredState = {
    events: events,
  };

  if (residentName === ctx.resident?.residentName) {
    registered.more = more;
  }

  return registered;
};
