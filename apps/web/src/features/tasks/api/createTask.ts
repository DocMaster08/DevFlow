import { api } from "@/lib/axios";
import type { createTaskDTO } from "../schemas/createTask.schema";
import type { Task } from "@/types/task";

export async function createTask(projectId:string, data:createTaskDTO){
    const response = await api.post<Task>(`/projects/${projectId}/tasks`)
}