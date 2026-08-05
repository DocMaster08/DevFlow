import { taskPriorityEnum, taskStatusEnum } from "@/types/task";
import z from "zod";

export const taskFieldsSchema = z.object(
    {
        title: z.string("Title is Required.").min(3, "Title needs to have a minimum of three characters.").max(100),
        description: z.string().min(3).max(300).optional(),
        status: z.enum(taskStatusEnum).optional(),
        priority: z.enum(taskPriorityEnum).optional(),
        dueDate: z.iso.datetime().optional()
    }
)