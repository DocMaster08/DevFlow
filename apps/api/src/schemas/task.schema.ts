import {z} from "zod"
import { TaskPriority, TaskStatus } from "../generated/prisma/enums.js"

const taskFieldsSchema = z.object(
    {
        title: z.string().min(3).max(30),
        description: z.string().min(3).max(300).optional(),
        priority: z.enum(TaskPriority).optional(),
        status: z.enum(TaskStatus).optional(),
        dueDate: z.iso.datetime().optional()
    }
)

export const createTaskSchema = taskFieldsSchema.omit({
    status: true
})

export type createTaskDTO = z.infer<typeof createTaskSchema>

export const updateTaskSchema = taskFieldsSchema.partial();

export type updateTasksDTO = z.infer<typeof updateTaskSchema>