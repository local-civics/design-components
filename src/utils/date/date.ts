/**
 * A helper utility to check if two date operands are equal.
 * @param left
 * @param right
 * @return {boolean}
 */
export const isSameDate = (left: Date | null, right: Date) => {
  return (
    left === right ||
    (!!(left && right) &&
      left.getFullYear() === right.getFullYear() &&
      left.getMonth() === right.getMonth() &&
      left.getDate() === right.getDate())
  );
};

/**
 * A utility to calculate a date range for the specified number of weeks.
 * @param date
 * @param weeks
 */
export const weeks = (date: Date, weeks: number) => {
  const start = new Date(date.getFullYear(), date.getMonth(), date.getDate() - date.getDay());
  const end = new Date(start.getFullYear(), start.getMonth(), start.getDate() + weeks * 7 - 1);
  return [start, end];
};

/**
 * A utility to calculate the first day of the month.
 * https://en.wikipedia.org/wiki/Calends
 */
export const calend = (date: Date) => {
  return new Date(date.getFullYear(), date.getMonth(), 1);
};

/**
 * A utility to determine the previous date.
 * @param date
 */
export const previousDate = (date: Date) => {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() - 1);
};

/**
 * A utility to determine the next date.
 * @param date
 */
export const nextDate = (date: Date) => {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1);
};

/**
 * A utility to format dates.
 * @param date
 * @param options
 */
export const formatDate = (date: Date, options: Intl.DateTimeFormatOptions) => {
  return Intl.DateTimeFormat("en-US", options).format(date);
};
