import { useMutation, useQueryClient } from "@tanstack/react-query";
import { commentKeys } from "../utils/queryKeys";
import { toast } from "sonner";
import type { createTaskCommentDTO } from "../schemas/createTaskComment.schema";
import { createTaskComment } from "../api/createTaskComment";

export function useCreateTaskComment(taskId: string) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: createTaskCommentDTO) => createTaskComment(taskId, data),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: commentKeys.byTask(taskId)
            })

            toast.success("Comment Created Successfully")

        },
        onError: () => {
            toast.error("Failed to create Comment")
        }

    })
}