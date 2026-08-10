import type { ActivityField, ActivityType, TaskStatus } from "../generated/prisma/enums.js"

export type createActivityType = {
    taskId: string
    type: ActivityType
    field: ActivityField
    oldValue: string | null
    newValue: string | null
}