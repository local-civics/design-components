import React from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {useApi, useTenant} from "../../contexts/App";
import { DateSelection } from "../../components/Calendar/DateSelection/DateSelection";
import { EventPreview } from "../../components/Calendar/EventPreview/EventPreview";
import { EventList } from "../../components/Calendar/EventList/EventList";

/**
 * A connected container for calendar events.
 * @constructor
 */
export const CalendarContainer = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();
  const tenant = useTenant()
  const tenantName = params.tenantName || tenant.tenantName;
  const [date, setDate] = React.useState(
    params.date && params.date !== "undefined" ? dayDate(params.date) : (new Date() as Date | null)
  );
  const day = (date || new Date()).toISOString();
  return {
    DateSelection: () => <DateSelection date={date} setDate={setDate} />,
    EventList: () => {
      if(tenant.isLoading){
        return null
      }

      if (!tenantName) {
        throw new Error("request is missing required params");
      }

      const events = useEvents(tenantName, day);

      return <EventList isLoading={events === null} date={date} onSetDate={setDate}>
        {events &&
            events.map((event: any) => {
              return (
                  <EventPreview
                      key={event.activityId}
                      {...event}
                      onClick={() => navigate(`${location.pathname}/${event.activityId}`)}
                  />
              );
            })}
      </EventList>
    },
  };
};

// A hook to fetch the calendar events
const useEvents = (tenantName: string, day: string) => {
  const [events, setEvents] = React.useState(null as any);
  const api = useApi();
  React.useEffect(() => {
    setEvents(null);
    (async () => {
      const ctx = { referrer: location.pathname };
      setEvents(
        await api.do(ctx, "GET", "curriculum", `/tenants/${tenantName}/events`, {
          query: {
            day: day,
          },
        })
      );
    })();
    return () => setEvents(null);
  }, [tenantName, day, api.accessToken]);

  return events;
};

// A utility to convert date string to a date
// https://stackoverflow.com/questions/7151543/convert-dd-mm-yyyy-string-to-date
function dayDate(dateStr: string) {
  const [year, month, day] = dateStr.split("-");
  return new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
}
