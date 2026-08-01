import type { Request, Response, NextFunction } from "express";
import { createProjectSchema } from "../schemas/project.schema.js";
import { createProject, getProject, getProjects } from "../services/project.service.js";
import { isStringObject } from "node:util/types";
import { string } from "zod";
import { NotFoundError } from "../errors/NotFoundError.js";

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

  const { id } = req.params;
  if (!id || typeof id !== "string") return res.status(400).json({message: "Invalid id"})
  const project = await getProject(id);
  if (!project) {
    throw new NotFoundError("Project not found")
  }
  res.status(200).json(project);

}