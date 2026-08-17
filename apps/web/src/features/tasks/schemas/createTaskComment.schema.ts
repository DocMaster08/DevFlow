import z from "zod";

export const createTaskCommentSchema = z.object(
    {
        content: z.string().min(1).max(1000)
    }
)

export type createTaskCommentDTO = z.infer<typeof createTaskCommentSchema>