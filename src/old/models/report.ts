import { Pathway } from "./pathway";

export interface Report {
  pathway?: Pathway;
  residentName?: string;
  communityName?: string;
  magnitude?: number;
  proficiency?: number;
  nextProficiency?: number;
  badges?: number;
  milestones?: number;
  reflections?: number;
  registrations?: number;
  sessions?: number;
}

export interface ReportQuery {
  residentName?: string;
  pathways?: Pathway[];
  formula?: "sum" | "average" | "min" | "max";
  groups?: "pathway" | "resident" | "community"[];
  timePeriod?: "month" | "date" | "week";
  date?: string;
  page?: number;
  limit?: number;
  fields?: string[];
}
