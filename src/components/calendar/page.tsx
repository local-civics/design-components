import React               from "react";
import {Outlet}            from "react-router-dom";
import {useEvents}         from "../../hooks/event";
import {useRequest}        from "../../hooks/request";
import {NavigationBar}     from "../navigation-bar";
import {CalendarComponent} from "./component";

export const CalendarPage = () => {
    const req = useRequest()
    const [day, setDay] = React.useState(req.params.day ? new Date(req.params.day) : new Date())
    const events = useEvents(req.community?.communityName, {
        day: day.toISOString().substring(0, 10),
    })
    const upcoming = useEvents(req.community?.communityName, {
        timePeriod: "week",
        day: day.toISOString().substring(0, 10),
    })
    const reflections = useEvents(req.community?.communityName, {
        status: "survey",
    })
    return (
        <main className="h-screen bg-white font-proxima">
            <NavigationBar community={req.community} resident={req.resident} page="calendar" />
            <CalendarComponent day={day} community={req.community} resident={req.resident} events={events} upcoming={upcoming} reflections={reflections} onSetDay={setDay}/>
            <Outlet context={req} />
        </main>
    );
}