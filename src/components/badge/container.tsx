import { FunctionComponent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BadgeComponent } from "./component";
import { useBadge } from "./hooks";

/**
 * Badge container (connected to navigation and API)
 * @constructor
 */
export const BadgeContainer: FunctionComponent = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [badge, isLoading] = useBadge(
    params.owner || "",
    params.badgeName || ""
  );
  const onClose = () => navigate(-1);
  const onObjectiveClick = (actionURL?: string) =>
    actionURL && navigate(actionURL);
  return (
    <BadgeComponent
      isLoading={isLoading}
      badge={badge}
      onClose={onClose}
      onObjectiveClick={onObjectiveClick}
    />
  );
};
