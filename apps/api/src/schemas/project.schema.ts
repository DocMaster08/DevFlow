import { z } from "zod";

export const createProjectSchema = z.object(
    {
        name: z.string().min(3).max(50),
        description: z.string().max(500).optional(),
        color: z.string(),
        icon: z.string()
    }
)

export type CreateProjectDTO = z.infer<typeof createProjectSchema>

export const updateProjectSchema = createProjectSchema.partial()

export type UpdateProjectDTO = z.infer<typeof updateProjectSchema>