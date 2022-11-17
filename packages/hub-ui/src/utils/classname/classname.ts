/**
 * A utility to build builders conditionally.
 * @param base
 * @param precondition
 */
export const builder = (base: string = "", precondition?: boolean) => {
  const append = (prefix: string, ...suffix: string[]) => {
    return [prefix, ...suffix]
      .map((s) => s.trim())
      .filter((s) => s)
      .join(" ");
  };

  return {
    append: (...suffix: string[]) => {
      return builder(append(base, ...suffix));
    },
    if: (condition: boolean, ...suffix: string[]) => {
      if (condition) {
        return builder(append(base, ...suffix), condition);
      }
      return builder(base, precondition);
    },
    else: (...suffix: string[]) => {
      if (!precondition) {
        return builder(append(base, ...suffix));
      }
      return builder(base);
    },
    build: () => base,
  };
};

/**
 * A utility to recursively parse a configuration of classes and build a class name.
 * @param config
 */
export const classname = (config: any) => {
  const classes = flatten(config);
  return classes
    .map((name) => name.trim())
    .filter((name) => name)
    .join(" ");
};

/**
 * A utility to flatten a config of classnames
 * @param config
 * @param values
 */
const flatten = (config?: any, values: string[] = []) => {
  Object.keys(config).map((k) => {
    if (typeof config[k] === "string") {
      values.push(config[k]);
    } else {
      flatten(config[k], values);
    }
  });
  return values;
};
