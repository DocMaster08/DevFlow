import { api } from "@/lib/axios";
import type { Task } from "@/types/task";
import type { updateTaskDTO } from "../schemas/updateTask.schema";

export async function updateTask(id: string, data:updateTaskDTO) {
    const response = await api.patch<Task>(`/tasks/${id}`, data)
    return response.data;
}