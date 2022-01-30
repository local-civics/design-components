/**
 * Community data model
 */
export interface Community{
    communityId?: string
    communityName?: string
    code?: string
    trueName?: string
    geofence?: Location[]
    placeName?: string
    avatarURL?: string
    createdAt?: string
    updatedAt?: string
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
 * CommunityQuery
 */
export interface CommunityQuery{
    fields?: string[]
}