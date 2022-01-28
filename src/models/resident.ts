export interface Resident{
    residentId?: string
    residentName?: string
    email?: string
    givenName?: string
    familyName?: string
    communityName?: string
    role?: "educator" | "student"
    subject?: "social studies" | "english" | "math" |  "science" |  "special education" |
        "counseling | college & career readiness" |  "non-instructional staff" |  "school leadership"
    grade?: "k-5th" | "6th" | "7th" | "8th" | "9th" | "10th" | "11th" | "12th"
    tags?: string[]
    impactStatement?: string
    avatarURL?: string
    permissions: string[]
    createdAt?: string
    updatedAt?: string
}

export interface ResidentQuery {
    fields?: string[]
}