import { prisma } from "../config/prisma.js";
import type { createTaskDTO, updateTaskDTO } from "../schemas/task.schema.js";
import { NotFoundError } from "../errors/NotFoundError.js";
import { removeUndefined } from "../utils/cleanData.js";
import type { createActivityType } from "../schemas/activity.schema.js";

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
                dueDate: data.dueDate ? new Date(data.dueDate) : null,
                projectId
            }
        }
    )
}

export async function getTasks(projectId: string) {

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

export async function getTask(id: string) {
    const task = await prisma.task.findUnique({
        where: {
            id
        }
    })


    if (!task) {
        throw new NotFoundError("Task not found")
    }

    return task
}

export async function updateTask(id: string, data: updateTaskDTO) {


    return prisma.$transaction(async (tx) => {
        const task = await tx.task.findUnique({
            where: {
                id
            }
        })

        if (!task) {
            throw new NotFoundError("Task not found")
        }

        const activities: createActivityType[] = []

        if (data.status !== undefined && data.status !== task.status) {
            activities.push({
                taskId: id,
                type: "UPDATED",
                field: "STATUS",
                oldValue: task.status,
                newValue: data.status,

            })
        }
        if (data.priority !== undefined && data.priority !== task.priority) {
            activities.push({
                taskId: id,
                type: "UPDATED",
                field: "PRIORITY",
                oldValue: task.priority,
                newValue: data.priority
            })
        }

        const oldDueDate = task.dueDate?.toISOString() ?? null
        if (data.dueDate !== undefined && data.dueDate !== oldDueDate) {
            activities.push({
                taskId: id,
                type: data.dueDate ? "UPDATED" : "CLEARED",
                field: "DUE_DATE",
                oldValue: oldDueDate,
                newValue: data.dueDate
            })
        }
        if (data.title !== undefined && data.title !== task.title) {
            activities.push({
                taskId: id,
                type: "UPDATED",
                field: "TITLE",
                oldValue: task.title,
                newValue: data.title
            })
        }
        if (data.description !== undefined && data.description !== task.description) {
            activities.push({
                taskId: id,
                type: data.description ? "UPDATED" : "CLEARED",
                field: "DESCRIPTION",
                oldValue: task.description,
                newValue: data.description
            })
        }

        const cleanData = removeUndefined(data)
        const updatedTask = await tx.task.update({
            where: {
                id
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


export async function getTaskActivities(taskId: string) {
    const task = await prisma.task.findUnique({
        where: {
            id: taskId
        }
    })

    if (!task) {
        throw new NotFoundError("Task not found")
    }

    return prisma.activity.findMany({
        where: {
            taskId
        },
        orderBy:{
            createdAt:"desc"
        }
    })
}