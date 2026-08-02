import type { Request, Response } from "express";
import { createTask } from "../services/task.service.js";
import { createTaskSchema } from "../schemas/task.schema.js";
import { InvalidIdError } from "../errors/InvalidIdError.js";

export async function CreateTaskController(req: Request, res: Response) {
    const data = createTaskSchema.parse(req.body)
    const { projectId } = req.params

    if (!projectId || Array.isArray(projectId)) {
        throw new InvalidIdError("invalid Project")
    }

    const task = await createTask(projectId, data)

    res.status(201).json(task)
}