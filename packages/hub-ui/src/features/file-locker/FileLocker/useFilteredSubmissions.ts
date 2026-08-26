import { SubmissionItem } from "./FileLocker";

/**
 * byBadge/byLesson/byPathway - the self-scoped equivalent of mgmt-ui's useFilteredStudents.ts,
 * one level shallower: filters a flat SubmissionItem[] directly instead of filtering each
 * student's own submissions array within a roster.
 * @param submissions
 */
export const useFilteredSubmissions = (submissions: SubmissionItem[]) => {
  const byBadge = (badgeId: string) => submissions.filter((s) => s.badgeId === badgeId);

  const byLesson = (lessonId: string) => submissions.filter((s) => s.lessonId === lessonId);

  const byPathway = (pathwayId: string, badges: { badgeId: string; categories?: string[] }[]) => {
    const validBadgeIds = badges
      .filter((b) => Array.isArray(b.categories) && b.categories.some((c) => typeof c === "string" && c.startsWith(pathwayId)))
      .map((b) => b.badgeId);
    return submissions.filter((s) => validBadgeIds.includes(s.badgeId));
  };

  return { byBadge, byLesson, byPathway };
};
