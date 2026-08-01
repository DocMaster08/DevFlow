import type { Request, Response, NextFunction } from "express";
import { createProjectSchema } from "../schemas/project.schema.js";
import { createProject, getProject, getProjects } from "../services/project.service.js";
import { isStringObject } from "node:util/types";

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

export async function getProjectController(
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;
    const project = await getProject(id);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    res.status(200).json(project);
  } catch (error) {
    next(error);
  }
}