
import {prisma} from "../config/prisma.js"
import type { CreateProjectDTO } from "../schemas/project.schema.js";

export async function createProject(data: CreateProjectDTO) {
  const project = await prisma.project.create({
    data: {
      name: data.name,
      description: data.description ?? null,
      color: data.color,
      icon: data.icon,
    },
  });

  return project;
}