import { icons } from "../components/Icon/data/icons";
import { IconName } from "../components/Icon/Icon";

/**
 * Icon from tags
 * @param tags
 * @param space
 */
export const icon = (space: IconName, tags?: string[]) => {
  let icon = space;
  let found = false;
  if (tags) {
    tags.every((tag) => {
      if (tag.startsWith("icon:")) {
        const name = tag.slice("icon:".length);
        if (icons.includes(name as IconName)) {
          found = true;
          icon = tag.slice("icon:".length) as IconName;
          return false;
        }
      }
      return true;
    });

    tags.every((tag) => {
      if (space && tag.startsWith(space + ":")) {
        const prefix = space + ":";
        const name = tag.slice(prefix.length);
        if (icons.includes(name as IconName)) {
          found = true;
          icon = tag.slice(prefix.length) as IconName;
          return false;
        }
      }
      return true;
    });
  }
  return icon;
};