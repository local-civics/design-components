/**
 * Time on the hours tracker is stored and added up as whole MINUTES (1 hr 30 min is 90), so a total
 * never drifts. The only division by 60 happens here, to show a person "1 hr 30 min".
 */

/** One entry is at most a day (the server refuses more). */
export const MAX_MINUTES_PER_ENTRY = 24 * 60;

/**
 * Whole minutes as a person reads them: "2 hr 45 min", "1 hr", "45 min", "0 min". Always whole
 * numbers; never a decimal like 2.75.
 */
export const formatMinutes = (minutes: number): string => {
  const total = Math.max(0, Math.round(Number(minutes) || 0));
  const hours = Math.floor(total / 60);
  const rest = total % 60;
  if (hours === 0) {
    return `${rest} min`;
  }
  return rest === 0 ? `${hours} hr` : `${hours} hr ${rest} min`;
};

/**
 * A whole number typed into a form box. A blank box is 0. Anything that is not whole digits
 * (a decimal, a sign, text) is NaN, so a bad entry is refused rather than quietly rounded.
 */
const wholeNumber = (value?: string): number => {
  const text = (value === undefined || value === null ? "" : String(value)).trim();
  if (text === "") {
    return 0;
  }
  return /^\d+$/.test(text) ? parseInt(text, 10) : NaN;
};

/**
 * The total minutes in the Log Hours form's responses (`totalHours` and `totalMinutes`, either may be
 * blank). NaN when either box is not a whole number.
 */
export const minutesFromResponses = (responses: { totalHours?: string; totalMinutes?: string }): number =>
  wholeNumber(responses.totalHours) * 60 + wholeNumber(responses.totalMinutes);

/**
 * The form's two boxes for a stored number of minutes: 90 is hours "1" and minutes "30".
 */
export const responsesFromMinutes = (minutes: number): { totalHours: string; totalMinutes: string } => {
  const total = Math.max(0, Math.round(Number(minutes) || 0));
  return { totalHours: String(Math.floor(total / 60)), totalMinutes: String(total % 60) };
};

/**
 * Why a total cannot be logged, or an empty string when it can.
 */
export const timeProblem = (minutes: number): string => {
  if (!Number.isFinite(minutes)) {
    return "Enter the hours and minutes as whole numbers.";
  }
  if (minutes < 1) {
    return "Enter how long it took: at least 1 minute.";
  }
  if (minutes > MAX_MINUTES_PER_ENTRY) {
    return "An entry can be at most 24 hours. Log a longer experience as several entries.";
  }
  return "";
};
