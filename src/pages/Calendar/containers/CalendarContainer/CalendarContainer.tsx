import { Experience } from "@local-civics/js-client";
import { navigate } from "@storybook/addon-links";
import React from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useApi, useRequester } from "../../../../contexts/App";
import { DateSelection } from "../../components/DateSelection/DateSelection";
import { Event } from "../../components/Event/Event";
import { EventList } from "../../components/EventList/EventList";

export const CalendarContainer = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();
  const [date, setDate] = React.useState(params.date ? new Date(params.date) : (new Date() as Date | null));
  const events = useEvents(date);
  return {
    DateSelection: () => <DateSelection date={date} setDate={setDate} />,
    EventList: () => (
      <EventList resolving={events === null} date={date} onSetDate={setDate}>
        {events?.map((event) => {
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
  const requester = useRequester();
  const api = useApi();
  const [events, setEvents] = React.useState(null as Experience[] | null);
  React.useEffect(() => {
    setEvents(null);
    (async () => {
      if (!requester.residentName || !requester.communityName || !date) {
        return;
      }

      setEvents(
        await api.experiences.list(requester.communityName, {
          day: date.toISOString().split("T")[0],
        })
      );
    })();
    return () => setEvents(null);
  }, [date, requester.residentName]);
  return events;
};
