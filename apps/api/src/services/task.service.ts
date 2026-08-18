import { prisma } from "../config/prisma.js";
import type { CreateTaskDTO, UpdateTaskDTO } from "../schemas/task.schema.js";
import { NotFoundError } from "../errors/NotFoundError.js";
import { removeUndefined } from "../utils/cleanData.js";
import type { CreateActivityType } from "../schemas/activity.schema.js";
import type { CreateCommentDTO } from "../schemas/comment.schema.js";

export async function createTask(projectId: string, userId: string, data: CreateTaskDTO) {
    const project = await prisma.project.findFirst({
        where: {
            id: projectId,
            ownerId: userId
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
                dueDate: data.dueDate ? new Date(data.dueDate) : null,
                projectId
            }
        }
    )
}

export async function getTasks(projectId: string, userId: string) {

    const project = await prisma.project.findUnique({
        where: {
            id: projectId,
            ownerId: userId
        },
        select: {
            id: true
        }
    });

    if (!project) {
        throw new NotFoundError("Project not found")
    }

    return prisma.task.findMany({
        where: {
            projectId
        },
        orderBy: [
            { status: "asc" },
            { dueDate: "asc" }
        ]

    })
}

export async function getTask(taskId: string, userId: string) {
    const task = await prisma.task.findFirst({
        where: {
            id: taskId,
            project: {
                ownerId: userId
            }
        }
    })


    if (!task) {
        throw new NotFoundError("Task not found")
    }

    return task
}

export async function deleteTask(taskId: string, userId: string) {
    const task = await prisma.task.findFirst({
        where: {
            id: taskId,
            project: {
                ownerId: userId
            }
        }
    })

    if (!task) throw new NotFoundError("Task not found");

    return prisma.task.delete({
        where: {
            id: taskId
        }
    })


}

export async function updateTask(taskId: string, userId: string, data: UpdateTaskDTO) {

    return prisma.$transaction(async (tx) => {
        const task = await tx.task.findFirst({
            where: {
                id: taskId,
                project: {
                    ownerId: userId
                }
            }
        })

        if (!task) {
            throw new NotFoundError("Task not found")
        }

        const activities: CreateActivityType[] = []

        if (data.status !== undefined && data.status !== task.status) {
            activities.push({
                taskId,
                userId,
                type: "UPDATED",
                field: "STATUS",
                oldValue: task.status,
                newValue: data.status,

            })
        }
        if (data.priority !== undefined && data.priority !== task.priority) {
            activities.push({
                taskId,
                userId,
                type: "UPDATED",
                field: "PRIORITY",
                oldValue: task.priority,
                newValue: data.priority
            })
        }

        const oldDueDate = task.dueDate?.toISOString() ?? null
        if (data.dueDate !== undefined && data.dueDate !== oldDueDate) {
            activities.push({
                taskId,
                userId,
                type: data.dueDate ? "UPDATED" : "CLEARED",
                field: "DUE_DATE",
                oldValue: oldDueDate,
                newValue: data.dueDate
            })
        }
        if (data.title !== undefined && data.title !== task.title) {
            activities.push({
                taskId,
                userId,
                type: "UPDATED",
                field: "TITLE",
                oldValue: task.title,
                newValue: data.title
            })
        }
        if (data.description !== undefined && data.description !== task.description) {
            activities.push({
                taskId,
                userId,
                type: data.description ? "UPDATED" : "CLEARED",
                field: "DESCRIPTION",
                oldValue: task.description,
                newValue: data.description
            })
        }

        const cleanData = removeUndefined(data)
        const updatedTask = await tx.task.update({
            where: {
                id: taskId
            },
            data: cleanData
        })



        if (activities.length > 0) {
            await tx.activity.createMany({
                data: activities
            })
        }

        return updatedTask

    })
}


export async function getTaskActivities(taskId: string, userId: string) {
    const task = await prisma.task.findUnique({
        where: {
            id: taskId,
            project:{
                ownerId:userId
            }
        }
    })

    if (!task) {
        throw new NotFoundError("Task not found")
    }

    return prisma.activity.findMany({
        where: {
            taskId
        },
        include:{
            user:{
                select:{
                    id: true,
                    name: true
                }
            }
        },
        orderBy: {
            createdAt: "desc"
        },
        omit: {
            taskId: true,
            userId: true,
        }
    })
}

export async function createTaskComment(taskId: string, userId: string, data: CreateCommentDTO) {
    const task = await prisma.task.findFirst({
        where: {
            id: taskId,
            project: {
                ownerId: userId
            }
        }
    })

    if (!task) {
        throw new NotFoundError("Task not found")
    }

    return prisma.comment.create({
        data: {
            taskId,
            authorId: userId,
            content: data.content
        }
    })

}

export async function getTaskComments(taskId: string, userId: string) {
    const task = await prisma.task.findUnique({
        where: {
            id: taskId,
            project: {
                ownerId: userId
            }
        }
    })

    if (!task) {
        throw new NotFoundError("Task not found")
    }

    return prisma.comment.findMany({
        where: {
            taskId
        },
        include: {
            author: {
                select: {
                    id: true,
                    name: true,
                }
            }
        },
        orderBy: {
            createdAt: "desc"
        },
        omit: {
            taskId: true,
            authorId: true
        }
    })
}