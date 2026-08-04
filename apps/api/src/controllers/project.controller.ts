import type { Request, Response, NextFunction } from "express";
import { createProjectSchema } from "../schemas/project.schema.js";
import { createProject, getProject, getProjects } from "../services/project.service.js";
import { NotFoundError } from "../errors/NotFoundError.js";
import { InvalidIdError } from "../errors/InvalidIdError.js";

export async function createProjectController(
  req: Request,
  res: Response
) {

  const data = createProjectSchema.parse(req.body);

  const project = await createProject(data);

  res.status(201).json(project);

}

export async function getProjectsController(req: Request, res: Response) {

  const projects = await getProjects();

  res.status(200).json(projects);


}

export async function getProjectController(
  req: Request,
  res: Response,
) {

  const { projectId } = req.params;
  if (!projectId || Array.isArray(projectId)) {
    throw new InvalidIdError("Invalid Project id")
  }
  const project = await getProject(projectId);
  
  res.status(200).json(project);

}