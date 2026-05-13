export type BadgeItem = {
  badgeId: string;
  displayName: string;
  categories: string[];
  completedAt?: string | null;
  startedAt?: string | null;
  weight: number;
  onClick?: () => void;
};

export type PathwayCriteria = Record<string, number>;

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