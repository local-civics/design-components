/**
 * Pathway
 */
export const pathways = [
  "policy & government",
  "arts & culture",
  "college & career",
  "volunteer",
  "recreation",
] as const;

/**
 * Type for icons
 */
export type Pathway = typeof pathways[number];
