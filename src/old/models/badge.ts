/**
 * Badge data model
 */
export interface Badge {
  bannerId?: string;
  badgeId?: string;
  badgeName?: string;
  title?: string;
  summary?: string;
  criteria?: Criterion[];
  imageURL?: string;
  edition?: number;
  proficiency?: number;
  pathway?: "policy & government" | "arts & culture" | "college & career" | "volunteer" | "recreation";
  tags?: string[];
  status?: "bearing" | "contingent" | "unqualified";
}

/**
 * Criterion data model
 */
interface Criterion {
  badgeId?: string;
  criterionId?: string;
  criterionName?: string;
  title?: string;
  actionURL?: string;
  experienceName?: string;
  experienceTag?: string;
  minimumProficiency?: number;
  minimumFrequency?: number;
  completedAt?: string;
}

export interface BadgeQuery {
  status?: "bearing" | "contingent" | "unqualified";
  fields?: string[];
}
