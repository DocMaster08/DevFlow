
import { prisma } from "../config/prisma.js"
import { NotFoundError } from "../errors/NotFoundError.js";
import type { CreateProjectDTO } from "../schemas/project.schema.js";

export async function createProject(data: CreateProjectDTO) {
  return prisma.project.create({
    data: {
      name: data.name,
      description: data.description ?? null,
      color: data.color,
      icon: data.icon,
    },
  });

 
}

export async function getProjects() {
  return prisma.project.findMany({
    where: {
      archived: false
    },
    orderBy: {
      updatedAt: "desc"
    }
  })
}

export async function getProject(id: string) {
  const project = await prisma.project.findUnique({
    where: {
      id,
    }
  })

  if (!project) {
    throw new NotFoundError("Project not found")
  }

  return project
}