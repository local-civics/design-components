import { useNavigate } from "react-router-dom";
import { useRequestContext } from "../../hooks/request";
import { BadgeComponent } from "./component";
import { useBadge } from "../../hooks/badge";

/**
 * Badge modal
 * @constructor
 */
export const BadgeModal = () => {
  const req = useRequestContext();
  const badge = useBadge(req.resident?.residentName, req.params.badgeName);
  const navigate = useNavigate();
  const onClose = () => navigate(-1);
  const onObjectiveClick = (actionURL?: string) => actionURL && navigate(actionURL);
  return (
    <article className="grid grid-cols-1 justify-items-center content-center transition ease-in-out duration-300 fixed top-0 w-screen h-screen p-5 bg-gray-500/80 z-50">
      <BadgeComponent isLoading={badge === null} badge={badge} onClose={onClose} onObjectiveClick={onObjectiveClick} />
    </article>
  );
};
