import { SettingsContainer } from "../../containers/Settings/SettingsContainer";

/**
 * A component for the settings page.
 * @constructor
 */
export const Settings = () => {
  const { EditModal } = SettingsContainer();
  return <EditModal />;
};
