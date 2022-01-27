import { useNavigate, useParams } from "react-router-dom";
import { EventComponent } from "./component";
import { useEvent } from "./hooks";

/**
 * Event modal
 * @constructor
 */
export const EventModal = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [event, isLoading] = useEvent(
    params.courseName || "",
    params.eventName || ""
  );
  const onClose = () => navigate(-1);
  return (
    <div className="grid grid-cols-1 justify-items-center content-center transition ease-in-out duration-300 fixed top-0 w-screen h-screen p-5 bg-gray-500/80 z-50">
      <EventComponent isLoading={isLoading} event={event} onClose={onClose} />
    </div>
  );
};
