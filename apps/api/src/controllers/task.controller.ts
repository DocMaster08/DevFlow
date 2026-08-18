import type { Request, Response } from "express";
import { createTask, createTaskComment, deleteTask, getTask, getTaskActivities, getTaskComments, getTasks, updateTask } from "../services/task.service.js";
import { createTaskSchema, updateTaskSchema } from "../schemas/task.schema.js";
import { InvalidIdError } from "../errors/InvalidIdError.js";
import { createCommentSchema } from "../schemas/comment.schema.js";

export async function createTaskController(req: Request, res: Response) {
    const data = createTaskSchema.parse(req.body)
    const { projectId } = req.params

    if (!projectId || Array.isArray(projectId)) {
        throw new InvalidIdError("invalid Project Identifier")
    }

    const task = await createTask(projectId, req.user!.id, data)

    res.status(201).json(task)
}

export async function getTasksController(req: Request, res: Response) {
    const { projectId } = req.params

    if (!projectId || Array.isArray(projectId)) {
        throw new InvalidIdError("invalid Project Identifier")
    }

    const tasks = await getTasks(projectId, req.user!.id)

    res.status(200).json(tasks)
}

export async function getTaskController(req: Request, res: Response) {
    const { id } = req.params

    if (!id || Array.isArray(id)) {
        throw new InvalidIdError("invalid Task identifier")
    }

    const task = await getTask(id, req.user!.id)

    res.status(200).json(task)
}

export async function updateTaskController(req: Request, res: Response) {
    const data = updateTaskSchema.parse(req.body)
    const { id } = req.params

    if (!id || Array.isArray(id)) {
        throw new InvalidIdError("invalid Task Identifier")
    }

    const task = await updateTask(id, req.user!.id, data)

    res.status(200).json(task)
}

export async function deleteTaskController(req: Request, res: Response) {
    const { id } = req.params

    if (!id || Array.isArray(id)) {
        throw new InvalidIdError("invalid Task Identifier")
    }

    const task = await deleteTask(id, req.user!.id);

    res.status(200).json(task)
}

export async function getTaskActivitiesController(req: Request, res: Response) {
    const { taskId } = req.params

    if (!taskId || Array.isArray(taskId)) {
        throw new InvalidIdError("Invalid Task Identifier")
    }

    const activities = await getTaskActivities(taskId, req.user!.id)

    res.status(200).json(activities)
}

export async function createTaskCommentController(req: Request, res: Response) {
    const data = createCommentSchema.parse(req.body)
    const { taskId } = req.params

    if (!taskId || Array.isArray(taskId)) {
        throw new InvalidIdError("Invalid Task Identifier")
    }

    const comment = await createTaskComment(taskId, req.user!.id, data)

    res.status(201).json(comment)
}

export async function getTaskCommentsController(req: Request, res: Response) {
    const { taskId } = req.params

    if (!taskId || Array.isArray(taskId)) {
        throw new InvalidIdError("Invalid Task Identifier")
    }

    const comments = await getTaskComments(taskId, req.user!.id)

    res.status(200).json(comments)
}