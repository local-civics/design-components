import { EditContainer } from "./containers/EditContainer/EditContainer";

/**
 * A component for the settings page.
 * @constructor
 */
export const Settings = () => {
  const { EditModal } = EditContainer();
  return <EditModal />;
};
