import React from "react";
import { Outlet } from "react-router-dom";
import { AuthLayout } from "../../layouts/AuthLayout/AuthLayout";
import { useCalendarStore } from "../../old/stores/calendar";
import { DateSelectionWidget } from "./widgets/DateSelectionWidget/DateSelectionWidget";
import { EventListWidget } from "./widgets/EventListWidget/EventListWidget";

/**
 * The calendar page.
 * @constructor
 */
export const Calendar = () => {
  const store = useCalendarStore();
  return (
    <main className="h-screen bg-white font-proxima">
      <AuthLayout community={store.request.community} resident={store.request.resident} page="calendar">
        <DateSelectionWidget date={store.request.date} setDate={store.setDate} />
        <EventListWidget
          date={store.request.date}
          events={store.response.events}
          tab={store.request.tab}
          onSetDate={store.setDate}
          onSetEvent={store.request.navigate.event}
          onSetTab={store.setTab}
        />
      </AuthLayout>
      <Outlet context={store.request.origin} />
    </main>
  );
};
