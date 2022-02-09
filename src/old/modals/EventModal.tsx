import { EventOverview } from "../components/EventOverview";
import { useEventStore } from "../stores/event";

/**
 * The event modal.
 * @constructor
 */
export const EventModal = () => {
  const store = useEventStore();
  return (
    <div className="grid grid-cols-1 justify-items-center content-center transition ease-in-out duration-300 fixed top-0 w-screen h-screen p-5 bg-gray-500/80 z-50">
      <EventOverview event={store.response.event} onClose={store.request.navigate.back} />
    </div>
  );
};
