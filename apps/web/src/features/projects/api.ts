import { api } from "@/lib/axios";

export async function getProjects() {
  const response = await api.get("/projects");

  return response.data;
}