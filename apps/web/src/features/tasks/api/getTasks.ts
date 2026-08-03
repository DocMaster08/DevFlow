import { api } from "@/lib/axios";
import type { Task } from "@/types/task";

export async function getTasks(projectId: string) {
    const response = await api.get<Task[]>(`/projects/${projectId}/tasks`)

    return response.data;
}