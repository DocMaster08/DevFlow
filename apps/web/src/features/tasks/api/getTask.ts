import { api } from "@/lib/axios";
import type { Task } from "@/types/task";

export async function getTask(taskId:string){
    const response = await api.get<Task>(`/tasks/${taskId}`)
    return response.data
}