import React               from "react";
import {Outlet}            from "react-router-dom";
import {useRequest}        from "../../hooks/request";
import {NavigationBar}     from "../navigation-bar";
import {CalendarComponent} from "./component";

export const CalendarPage = () => {
    const req = useRequest()
    return (
        <main className="h-screen bg-white font-proxima">
            <NavigationBar community={req.community} resident={req.resident} page="calendar" />
            <CalendarComponent community={req.community} resident={req.resident}/>
            <Outlet context={req} />
        </main>
    );
}