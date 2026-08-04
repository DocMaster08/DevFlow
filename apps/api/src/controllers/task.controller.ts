import type { Request, Response } from "express";
import { createTask, getTask, getTasks, updateTaskStatus } from "../services/task.service.js";
import { createTaskSchema, updateTaskStatusSchema } from "../schemas/task.schema.js";
import { InvalidIdError } from "../errors/InvalidIdError.js";

export async function createTaskController(req: Request, res: Response) {
    const data = createTaskSchema.parse(req.body)
    const { projectId } = req.params

    if (!projectId || Array.isArray(projectId)) {
        throw new InvalidIdError("invalid Project Identifier")
    }

    const task = await createTask(projectId, data)

    res.status(201).json(task)
}

export async function getTasksController(req: Request, res: Response) {
    const { projectId } = req.params

    if (!projectId || Array.isArray(projectId)) {
        throw new InvalidIdError("invalid Project Identifier")
    }

    const tasks = await getTasks(projectId)

    res.status(200).json(tasks)
}

export async function getTaskController(req: Request, res: Response) {
    const { id } = req.params

    if (!id || Array.isArray(id)) {
        throw new InvalidIdError("invalid Task identifier")
    }

    const task = await getTask(id)

    res.status(200).json(task)
}

export async function updateTaskStatusController(req: Request, res: Response){
    const {status} = updateTaskStatusSchema.parse(req.body)
    const {id} = req.params

    if (!id || Array.isArray(id)) {
        throw new InvalidIdError("invalid Task Identifier")
    }

    const task = await updateTaskStatus(id, status)

    res.status(200).json(task)
}