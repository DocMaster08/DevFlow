import type { Request, Response, NextFunction } from "express";
import { createProjectSchema, updateProjectSchema } from "../schemas/project.schema.js";
import { createProject, deleteProject, getProject, getProjects, updateProject } from "../services/project.service.js";
import { InvalidIdError } from "../errors/InvalidIdError.js";

export async function createProjectController(
  req: Request,
  res: Response
) {

  const data = createProjectSchema.parse(req.body);

  const project = await createProject(data, req.user!.id);

  res.status(201).json(project);

}

export async function getProjectsController(req: Request, res: Response) {

  const projects = await getProjects(req.user!.id);

  res.status(200).json(projects);


}

export async function getProjectController(
  req: Request,
  res: Response,
) {

  const { projectId } = req.params;
  if (!projectId || Array.isArray(projectId)) {
    throw new InvalidIdError("Invalid Project Identifier")
  }
  const project = await getProject(projectId, req.user!.id);

  res.status(200).json(project);

}

export async function updateProjectController(req: Request, res: Response) {
  const data = updateProjectSchema.parse(req.body)
  const { projectId } = req.params;

  if (!projectId || Array.isArray(projectId)) {
    throw new InvalidIdError("Invalid Project Identifier")
  }

  const project = await updateProject(projectId, req.user!.id, data)

  res.status(200).json(project);
}

export async function deleteProjectController(req: Request, res: Response){
  const {projectId} = req.params;

  if (!projectId || Array.isArray(projectId)){
    throw new InvalidIdError("Invalid Project Identifier")
  }

  const project = await deleteProject(projectId, req.user!.id)

  res.status(200).json(project)
}
