import { useNavigate, useParams } from "react-router-dom";
import { BadgeComponent } from "./component";
import { useBadge } from "./hooks";

/**
 * Badge modal
 * @constructor
 */
export const BadgeModal = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [badge, isLoading] = useBadge(
    params.residentName || "",
    params.badgeName || ""
  );
  const onClose = () => navigate(-1);
  const onObjectiveClick = (actionURL?: string) =>
    actionURL && navigate(actionURL);
  return (
    <div className="grid grid-cols-1 justify-items-center content-center transition ease-in-out duration-300 fixed top-0 w-screen h-screen p-5 bg-gray-500/80 z-50">
      <BadgeComponent
        isLoading={isLoading}
        badge={badge}
        onClose={onClose}
        onObjectiveClick={onObjectiveClick}
      />
    </div>
  );
};
