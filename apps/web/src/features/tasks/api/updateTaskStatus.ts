import { api } from "@/lib/axios";
import type { Task, TaskStatus } from "@/types/task";

export async function updateTaskStatus(id: string, status: TaskStatus) {
    const response = await api.patch<Task>(`/tasks/${id}/status`, {status})
    return response.data;
}