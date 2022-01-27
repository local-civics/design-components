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
  address?: string;
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
  latitude?: number;
  longitude?: number;
}
