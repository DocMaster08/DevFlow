import { z } from "zod"
import { TaskPriority, TaskStatus } from "../generated/prisma/enums.js"

const taskFieldsSchema = z.object(
    {
        title: z.string().min(3).max(100),
        description: z.string().min(3).max(300).optional().nullable(),
        priority: z.enum(TaskPriority).optional(),
        status: z.enum(TaskStatus).optional(),
        dueDate: z.iso.datetime().optional()
    }
)

export const createTaskSchema = taskFieldsSchema.omit({
    status: true
})

export type CreateTaskDTO = z.infer<typeof createTaskSchema>

export const updateTaskSchema = taskFieldsSchema.partial().extend({
    dueDate: z.iso.datetime().nullable().optional()
}).refine(
    data => Object.keys(data).length > 0,
    {
        message: "At least one field is required"
    }
);

export type UpdateTaskDTO = z.infer<typeof updateTaskSchema>