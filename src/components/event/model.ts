import { Pathway } from "../pathway";

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
    | "went"
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
      | "went"
      | "contributed"
      | "over";
  timePeriod?: "month" | "day" | "week" | "morning" | "afternoon" | "evening" | "weekend" | "milestone"
  limit?: number
  order?: "soonest" | "top" | "sponsored",
  residentName?: string;
  tags?: string[],
  pathways?: Pathway[],
  title?: string;
}
