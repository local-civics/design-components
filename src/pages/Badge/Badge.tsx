import { BadgeContainer } from "../../containers/Badge/BadgeContainer";

/**
 * A component for the badge page.
 * @constructor
 */
export const Badge = () => {
  const { OpenBadge } = BadgeContainer();
  return <OpenBadge />;
};
