
import { prisma } from "../config/prisma.js"
import { NotFoundError } from "../errors/NotFoundError.js";
import type { CreateProjectDTO, UpdateProjectDTO } from "../schemas/project.schema.js";
import { removeUndefined } from "../utils/cleanData.js";

export async function createProject(data: CreateProjectDTO, ownerId: string) {
  return prisma.project.create({
    data: {
      name: data.name,
      description: data.description ?? null,
      color: data.color,
      icon: data.icon,
      ownerId
    },
  });


}

export async function getProjects(ownerId: string) {
  return prisma.project.findMany({
    where: {
      ownerId,
      archived: false
    },
    orderBy: {
      updatedAt: "desc"
    }
  })
}

export async function getProject(id: string, ownerId: string) {
  const project = await prisma.project.findFirst({
    where: {
      id,
      ownerId
    }
  })

  if (!project) {
    throw new NotFoundError("Project not found")
  }

  return project
}

export async function updateProject(id: string, ownerId: string, data: UpdateProjectDTO) {
  const project = await prisma.project.findFirst({
    where: {
      id,
      ownerId
    }
  })

  if (!project) {
    throw new NotFoundError("Project not found")
  }

  const cleanData = removeUndefined(data)

  return prisma.project.update({
    where: {
      id
    },
    data: cleanData
  })
}

export async function deleteProject(id: string, ownerId: string) {
  const project = await prisma.project.findFirst({
    where: {
      id,
      ownerId
    }
  })

  if (!project) throw new NotFoundError("Project not found")

  return prisma.project.delete({
    where: {
      id
    }
  })
}