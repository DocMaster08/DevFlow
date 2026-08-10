import { useMutation, useQueryClient } from "@tanstack/react-query";
import { activityKeys, taskKeys } from "../utils/queryKeys";
import { toast } from "sonner";
import { updateTask } from "../api/updateTask";
import type { Task } from "@/types/task";
import type { updateTaskDTO } from "../schemas/updateTask.schema";

export function useUpdateTask(id: string) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data:updateTaskDTO) => updateTask(id, data),
        onMutate: async (data: updateTaskDTO) => {
            await queryClient.cancelQueries({
                queryKey: taskKeys.byId(id)
            })
            const previousTask = queryClient.getQueryData<Task>(taskKeys.byId(id))
            if (!previousTask) return;

            queryClient.setQueryData(taskKeys.byId(id), {...previousTask, ...data})
            return {previousTask}
        },
        onSettled: () => {
            queryClient.invalidateQueries({
                queryKey: taskKeys.byId(id)
            })
            queryClient.invalidateQueries({
                queryKey: activityKeys.byTask(id)
            })
        },

        onSuccess: () =>{
            toast.success("Task updated Successfully")
        },

        onError(_, __, context) {
            const {previousTask} = context??undefined
            if (previousTask) {
                queryClient.setQueryData(
                    taskKeys.byId(id), previousTask
                )
            }

            toast.error("Failed to update Task")
        }

    })
}