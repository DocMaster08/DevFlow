import z from "zod";
import { taskFieldsSchema } from "./taskFields.schema";

export const updateTaskSchema = taskFieldsSchema.partial();

export type UpdateTaskDTO = z.infer<typeof updateTaskSchema>