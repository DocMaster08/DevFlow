import { useMutation, useQueryClient } from "@tanstack/react-query";
import { taskKeys } from "../utils/queryKeys"; 
import { toast } from "sonner";
import { updateTaskStatus } from "../api/updateTaskStatus";
import type { TaskStatus } from "@/types/task";

export function useUpdateTaskStatus(id:string, projectId:string){
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (status:TaskStatus) => updateTaskStatus(id, status),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: taskKeys.byProject(projectId)
            })

            toast.success("Task Updated Successfully")

        },
        onError: () => {
            toast.error("Failed to update Task")
        }

    })
}