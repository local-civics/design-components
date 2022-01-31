import { Pathway } from "./pathway";

export interface Readiness {
  magnitude?: number;
  proficiency?: number;
  nextProficiency?: number;
  badges?: number;
  milestones?: number;
  reflections?: number;
}

export interface ReadinessQuery {
  pathways?: Pathway[];
  fields?: string[];
}
