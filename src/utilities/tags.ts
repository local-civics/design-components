import {icons, Icons} from "../components/icon/icons";

/**
 * Learning area from tags
 * @param fallback
 * @param tags
 */
export const area = (fallback: string, tags?: string[]) => {
  let area = fallback;
  if (tags) {
    tags.every((tag) => {
      if (tag.startsWith("area:")) {
        area = tag.slice("area:".length);
        return false;
      }
      return true;
    });
  }
  return area;
};

/**
 * Icon from tags
 * @param fallback
 * @param tags
 * @param space
 */
export const icon = (fallback: Icons, tags?: string[], space?: string) => {
  let icon = fallback;
  let found = false
  if (tags) {
    tags.every((tag) => {
      if (tag.startsWith("icon:")) {
        const name = tag.slice("icon:".length)
        if(icons.includes(name as Icons)){
          found = true
          icon = tag.slice("icon:".length) as Icons;
          return false;
        }
      }
      return true;
    });

    tags.every((tag) => {
      if (space && tag.startsWith(space)) {
        const name = tag.slice(space.length)
        if(icons.includes(name as Icons)){
          found = true
          icon = tag.slice(space.length) as Icons;
          return false;
        }
      }
      return true;
    });
  }
  return icon;
};
