export const ActivityTypeEnum = ["UPDATED", "CLEARED"]
export const ActivityFieldEnum = ["TITLE", "DESCRIPTION", "STATUS", "PRIORITY", "DUE_DATE"]

export type ActivityType = typeof ActivityTypeEnum[number];
export type ActivityField = typeof ActivityFieldEnum[number];

export type Activity = {
    id: string
    type: ActivityType
    field: ActivityField
    oldValue: string | null
    newValue: string | null
    createdAt: string
    user: {
        id: string,
        name: string
    }
}