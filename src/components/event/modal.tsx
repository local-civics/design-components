import { useRequestContext } from "../../hooks/request";
import { EventComponent } from "./component";
import { useEvent } from "../../hooks/event";

/**
 * Event modal
 * @constructor
 */
export const EventModal = () => {
  const req = useRequestContext();
  const event = useEvent(req.community?.communityName, req.params.eventName);
  const onClose = () => req.navigate(-1);
  return (
    <div className="grid grid-cols-1 justify-items-center content-center transition ease-in-out duration-300 fixed top-0 w-screen h-screen p-5 bg-gray-500/80 z-50">
      <EventComponent event={event} onClose={onClose} />
    </div>
  );
};
