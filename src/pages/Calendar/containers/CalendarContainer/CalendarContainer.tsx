import { Experience } from "@local-civics/js-client";
import { navigate } from "@storybook/addon-links";
import React from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useApi, useIdentity } from "../../../../contexts/App";
import { DateSelection } from "../../components/DateSelection/DateSelection";
import { Event } from "../../components/Event/Event";
import { EventList } from "../../components/EventList/EventList";

export const CalendarContainer = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();
  const [date, setDate] = React.useState(
    params.date && params.date !== "undefined" ? new Date(params.date) : (new Date() as Date | null)
  );
  const events = useEvents(date);
  return {
    DateSelection: () => <DateSelection date={date} setDate={setDate} />,
    EventList: () => (
      <EventList resolving={events === null} date={date} onSetDate={setDate}>
        {events &&
          events.map((event) => {
            return (
              <Event
                {...event}
                key={event.experienceName}
                onClick={() => navigate(`${location.pathname}/${event.experienceName}`)}
              />
            );
          })}
      </EventList>
    ),
  };
};

const useEvents = (date: Date | null) => {
  const identity = useIdentity();
  const api = useApi();
  const [events, setEvents] = React.useState(null as Experience[] | null);
  React.useEffect(() => {
    setEvents(null);
    (async () => {
      if (!identity.residentName || !identity.communityName || !date) {
        return;
      }

      setEvents(
        await api.experiences.list(identity.communityName, {
          day: date.toISOString().split("T")[0],
        })
      );
    })();
    return () => setEvents(null);
  }, [date, identity.residentName]);
  return events;
};
