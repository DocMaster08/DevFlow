import { api } from "@/lib/axios";
import type { Activity } from "@/types/activity";

export async function getTaskActivities(taskId:string){
    const response = await api.get<Activity[]>(`/tasks/${taskId}/activities`)
    return response.data
}