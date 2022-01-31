import { Pathway } from "./pathway";

/**
 * Event data model
 */
export interface Event {
  eventId?: string;
  courseName?: string;
  eventName?: string;
  title?: string;
  summary?: string;
  imageURL?: string;
  url?: string;
  registrationURL?: string;
  notBefore?: string;
  notAfter?: string;
  location?: Location;
  tags?: string[];
  pathway?: Pathway;
  proficiency?: number;
  status?:
    | "opportunity"
    | "going"
    | "happening"
    | "survey"
    | "contributed"
    | "over";
}

/**
 * Location data model
 */
export interface Location {
  country?: string;
  state?: string;
  city?: string;
  postalCode?: string;
  address?: string;
  latitude?: number;
  longitude?: number;
}

/**
 * EventQuery
 */
export interface EventQuery{
  status?:
      | "opportunity"
      | "going"
      | "happening"
      | "survey"
      | "contributed"
      | "over";
  timePeriod?: "day" | "week" | "milestone"
  limit?: number
  order?: "soonest" | "top" | "sponsored",
  residentName?: string;
  tags?: string[],
  pathways?: Pathway[],
  title?: string;
  day?: string;
}
