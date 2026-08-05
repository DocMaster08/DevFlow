import z from "zod"
import { taskFieldsSchema } from "./taskFields.schema"


export const createTaskSchema = taskFieldsSchema.omit({
    status:true
})

export type createTaskDTO = z.infer<typeof createTaskSchema>