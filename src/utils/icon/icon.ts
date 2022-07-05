import { IconName } from "../../components";
import { icons } from "../../components/Icon/data/icons";

/**
 * A utility to get an icon name.
 * @param name
 */
export const getIconName = (name?: string) => {
  if (!name) {
    return;
  }

  if (icons.includes(name as IconName)) {
    return name as IconName;
  }
};
