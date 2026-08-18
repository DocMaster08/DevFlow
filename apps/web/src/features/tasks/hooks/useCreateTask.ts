import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTask } from "../api/createTask";
import type { CreateTaskDTO } from "../schemas/createTask.schema";
import { taskKeys } from "../utils/queryKeys"; 
import { toast } from "sonner";

export function useCreateTask(projectId:string){
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data:CreateTaskDTO) => createTask(projectId, data),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: taskKeys.byProject(projectId)
            })

            toast.success("Task Created Successfully")

        },
        onError: () => {
            toast.error("Failed to create Task")
        }

    })
}