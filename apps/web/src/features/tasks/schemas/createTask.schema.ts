import { taskPriorityEnum } from "@/types/task"
import z from "zod"


export const createTaskSchema = z.object(
    {
        title: z.string().min(3, "Title is required (min 3 chars)").max(30),
        description: z.string().min(3).max(300).optional(),
        priority: z.enum(taskPriorityEnum).optional(),
        dueDate: z.string().datetime().optional()
    }
)

export type createTaskDTO = z.infer<typeof createTaskSchema>