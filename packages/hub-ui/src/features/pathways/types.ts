export type BadgeItem = {
  badgeId: string;
  displayName: string;
  categories: string[];
  completedAt?: string | null;
  startedAt?: string | null;
  weight: number;
  iconURL?: string;
  onClick?: () => void;
  // Lesson-level progress, cross-referenced against this student's own submitted lesson answers
  // (not just the badge's own possibly-unset startedAt flag) - see hub's usePathway() for the
  // derivation, scoped to a single caller's own accountFQDN/userId throughout.
  lessonIds?: string[];
  inProgress?: boolean;
  submittedLessons?: number;
  totalLessons?: number;
};

export type PathwayCriteria = Record<string, number>;

export type PathwayCategory = {
  categoryId: string;
  name: string;
  description?: string;
  parentCategoryId?: string;
  maxPoints?: number;
};

// This is the main interface for the top-level Card
export type PathwayCardProps = {
  imageURL?: string;
  title?: string;
  description?: string;
  badges?: BadgeItem[];
  progress?: number;
  target?: number;
  displayTags?: string[];
  criteria?: PathwayCriteria;
  rawCriteria?: PathwayCriteria;
  categoryNames?: Record<string, string>;
  categoryParents?: Record<string, string | null>; // Added for transcript logic
  allCategories?: PathwayCategory[]; // Full, unfiltered category list for the Pathway Structure popup
  points?: Record<string, number>;
  onClose?: () => void;
  onSubmit?: () => void;
  studentName?: string;
  studentEmail?: string;
  schoolName?: string;
  gradeLevel?: string;
};

// Helper for the sub-components to avoid passing everything manually
export interface SharedPathwayProps extends PathwayCardProps {
  mappedTargets: Record<string, number>;
  mappedPoints: Record<string, number>;
  today: string;
}