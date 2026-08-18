import type { ActivityField, ActivityType } from "../generated/prisma/enums.js"

export interface CreateActivityType {
    taskId: string
    userId: string
    type: ActivityType
    field: ActivityField
    oldValue: string | null
    newValue: string | null
}