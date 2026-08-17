import z from "zod";

export const createCommentSchema = z.object(
    {
        content: z.string()
    }
)

export type createCommentDTO = z.infer<typeof createCommentSchema>