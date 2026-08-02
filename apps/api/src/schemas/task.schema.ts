import {z} from "zod"
import { TaskPriority, TaskStatus } from "../generated/prisma/enums.js"

export const createTaskSchema = z.object(
    {
        title: z.string().min(3).max(30),
        description: z.string().min(3).max(300).optional(),
        priority: z.enum(TaskPriority).optional(),
        dueDate: z.string().datetime().optional()
    }
)

export type createTaskDTO = z.infer<typeof createTaskSchema>