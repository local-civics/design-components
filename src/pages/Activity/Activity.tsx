import { ActivityContainer } from "../../containers/Activity/ActivityContainer";

/**
 * A component for the experience page.
 * @constructor
 */
export const Activity = () => {
  const { OpenActivity } = ActivityContainer();
  return <OpenActivity />;
};
