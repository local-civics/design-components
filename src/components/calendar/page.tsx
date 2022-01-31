import React from "react";
import { Outlet } from "react-router-dom";
import { useEvents } from "../../hooks/event";
import { useRequest } from "../../hooks/request";
import { NavigationBar } from "../navigation-bar";
import { CalendarComponent } from "./component";

export const CalendarPage = () => {
  const req = useRequest();
  const today = new Date();
  const tab =
    req.query?.tab && req.query.tab.length > 0
      ? (req.query.tab[0] as "going" | "upcoming" | "reflections")
      : null;
  const [day, setDay] = React.useState(
    req.params.day ? new Date(req.params.day) : null
  );
  const events = useEvents(req.community?.communityName, {
    day: (day || today).toISOString().substring(0, 10),
  });
  const going = useEvents(req.community?.communityName, {
    residentName: req.resident?.residentName,
    status: "going",
  });
  const upcoming = useEvents(req.community?.communityName, {
    timePeriod: "week",
    day: today.toISOString().substring(0, 10),
  });
  const reflections = useEvents(req.community?.communityName, {
    status: "survey",
  });
  const onEventClick = (eventName?: string) => {
    req.navigate(`${req.location.pathname}/${eventName}`);
  };
  return (
    <main className="h-screen bg-white font-proxima">
      <NavigationBar
        community={req.community}
        resident={req.resident}
        page="calendar"
      />
      <CalendarComponent
        day={day}
        community={req.community}
        resident={req.resident}
        tab={tab}
        events={events}
        going={going}
        upcoming={upcoming}
        reflections={reflections}
        onSetDay={setDay}
        onClick={onEventClick}
      />
      <Outlet context={req} />
    </main>
  );
};
