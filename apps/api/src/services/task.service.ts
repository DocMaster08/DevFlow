import { prisma } from "../config/prisma.js";
import type { createTaskDTO, updateTasksDTO } from "../schemas/task.schema.js";
import { NotFoundError } from "../errors/NotFoundError.js";
import type { TaskStatus } from "../generated/prisma/enums.js";


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

export async function updateTask(id:string, data: updateTasksDTO){
    const task = await prisma.task.findUnique({
        where :{
            id
        }
    })

    if (!task){
        throw new NotFoundError("Task not found")
    }

    return prisma.task.update({
        where:{
            id
        },
        data:{
            ...(data.title && {title:data.title}),
            ...data.description && {description:data.description},
            ...data.dueDate && {dueDate:data.dueDate},
            ...data.priority && {priority:data.priority},
            ...data.status && {status:data.status}
            
        }
    })
}