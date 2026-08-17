import { api } from "@/lib/axios";
import type { TaskComment } from "@/types/comment";

export async function getTaskComments(taskId:string){
    const response = await api.get<TaskComment[]>(`/tasks/${taskId}/comments`)
    return response.data
}