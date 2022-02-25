import { BadgeContainer } from "./containers/BadgeContainer/BadgeContainer";

/**
 * A component for the badge page.
 * @constructor
 */
export const Badge = () => {
  const { BadgeModal } = BadgeContainer();
  return <BadgeModal />;
};
