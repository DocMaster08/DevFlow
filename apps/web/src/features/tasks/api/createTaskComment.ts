import { api } from "@/lib/axios";
import type { createTaskCommentDTO } from "../schemas/createTaskComment.schema";
import type { TaskComment } from "@/types/comment";

export async function createTaskComment(taskId: string, data: createTaskCommentDTO ) {
    const response = await api.post<TaskComment>(`/tasks/${taskId}/comments`, data)
    return response.data;
}