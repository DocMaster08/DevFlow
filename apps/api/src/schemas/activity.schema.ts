import type { ActivityField, ActivityType } from "../generated/prisma/enums.js"

export interface createActivityType {
    taskId: string
    type: ActivityType
    field: ActivityField
    oldValue: string | null
    newValue: string | null
}