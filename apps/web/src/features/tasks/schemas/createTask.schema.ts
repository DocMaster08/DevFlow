import { taskPriorityEnum } from "@/types/task"
import z from "zod"


export const createTaskSchema = z.object(
    {
        title: z.string("Title is Required.").min(3, "Title needs to have a minimum of three characters.").max(30),
        description: z.string().min(3).max(300).optional(),
        priority: z.enum(taskPriorityEnum).optional(),
        dueDate: z.iso.datetime().optional()
    }
)

export type createTaskDTO = z.infer<typeof createTaskSchema>