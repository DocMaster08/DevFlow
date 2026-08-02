import { prisma } from "../config/prisma.js";
import type { createTaskDTO } from "../schemas/task.schema.js";
import { NotFoundError } from "../errors/NotFoundError.js";


export async function createTask(projectId: string, data: createTaskDTO) {
    const project = await prisma.project.findUnique({
        where: {
            id: projectId,
        },
        select: {
            id: true
        }
    });

    if (!project) {
        throw new NotFoundError("Project not found")
    }

    return prisma.task.create(
        {
            data: {
                title: data.title,
                description: data.description ?? null,
                ...data.priority && { priority: data.priority },
                dueDate: data.dueDate ?? null,
                projectId
            }
        }
    )
}