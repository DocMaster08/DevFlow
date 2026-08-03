import { api } from "@/lib/axios";
import type { Project } from "@/types/project";

export async function getProject(id:string) {
  const response = await api.get<Project>(`/projects/${id}`);

  return response.data;
}