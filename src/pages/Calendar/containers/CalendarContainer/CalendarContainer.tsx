import {WorkspaceCalendarView} from "@local-civics/js-client";
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
    params.date && params.date !== "undefined" ? dayDate(params.date) : (new Date() as Date | null)
  );
  const calendar = useEvents(params.marketName, date);
  return {
    DateSelection: () => <DateSelection date={date} setDate={setDate} />,
    EventList: () => (
      <EventList resolving={calendar === null} date={date} onSetDate={setDate}>
        {calendar?.events &&
          calendar.events.map((ex) => {
            return (
              <Event
                  key={`${ex.marketId}${ex.id}`}
                  {...ex}
                  onClick={() => navigate(`${location.pathname}/${ex.id}`)}
              />
            );
          })}
      </EventList>
    ),
  };
};

const useEvents = (marketName?: string, date?: Date | null) => {
  const identity = useIdentity();
  const api = useApi();
  const [events, setEvents] = React.useState(null as WorkspaceCalendarView | null);
  React.useEffect(() => {
    setEvents(null);
    (async () => {
      if (!marketName || !identity.nickname || !date) {
        return;
      }

      setEvents(
        await api.curriculum.viewMarketplaceCalendar(marketName, date.toISOString().split("T")[0])
      );
    })();
    return () => setEvents(null);
  }, [date, identity.nickname, marketName]);
  return events;
};


// https://stackoverflow.com/questions/7151543/convert-dd-mm-yyyy-string-to-date
function dayDate(dateStr: string) {
  const [year, month, day] = dateStr.split("-")
  return new Date(parseInt(year), parseInt(month) - 1, parseInt(day))
}
