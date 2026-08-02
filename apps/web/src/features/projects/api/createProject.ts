import { api } from "@/lib/axios";
import type { CreateProjectDTO } from "../schemas/project.schema";
import type { Project } from "@/types/project";

export async function createProject(
    data: CreateProjectDTO
) {
    const response = await api.post<Project>(
        "/projects",
        data
    );

    return response.data;
}