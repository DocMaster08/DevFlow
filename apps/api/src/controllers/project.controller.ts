import type { Request, Response, NextFunction } from "express";
import { createProjectSchema } from "../schemas/project.schema.js";
import { createProject, getProjects } from "../services/project.service.js";

export async function createProjectController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const data = createProjectSchema.parse(req.body);

    const project = await createProject(data);

    res.status(201).json(project);
  } catch (error) {
    next(error);
  }
}

export async function getProjectsController(req: Request, res: Response, next: NextFunction) {
  try {
    const projects = await getProjects();

    res.status(200).json(projects);

  } catch (error) {
    next(error)
  }
}