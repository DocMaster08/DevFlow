import { useMutation, useQueryClient } from "@tanstack/react-query";
import { activityKeys, taskKeys } from "../utils/queryKeys";
import { toast } from "sonner";
import { updateTask } from "../api/updateTask";
import type { Task } from "@/types/task";
import type { updateTaskDTO } from "../schemas/updateTask.schema";

export function useUpdateTask(id: string, projectId?: string) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: updateTaskDTO) => updateTask(id, data),
        onMutate: async (data: updateTaskDTO) => {
            const task_key = projectId ? taskKeys.byProject(projectId) : taskKeys.byId(id)
            await queryClient.cancelQueries({
                queryKey: task_key
            })
            if (projectId) {
                const previousTasks = queryClient.getQueryData<Task[]>(task_key)
                if (!previousTasks) return;

                queryClient.setQueryData(task_key, previousTasks.map(task => { return task.id === id ? { ...task, ...data } : task }))
                return { previousTasks }
            }


            const previousTask = queryClient.getQueryData<Task>(task_key)
            if (!previousTask) return;

            queryClient.setQueryData(task_key, { ...previousTask, ...data })
            return { previousTask }

        },
        onSettled: () => {

            if (projectId) {
                queryClient.invalidateQueries({
                    queryKey: taskKeys.byProject(projectId)
                })
            } else {
                queryClient.invalidateQueries({
                    queryKey: taskKeys.byId(id)
                })
                queryClient.invalidateQueries({
                    queryKey: activityKeys.byTask(id)
                })
            }
        },

        onSuccess: () => {
            toast.success("Task updated Successfully")
        },

        onError(_, __, context) {
            const { previousTask, previousTasks } = context ?? undefined
            if (previousTask) {
                queryClient.setQueryData(
                    taskKeys.byId(id), previousTask
                )
            }
            if (previousTasks) {
                queryClient.setQueryData(
                    taskKeys.byProject(projectId), previousTasks
                )
            }
            toast.error("Failed to update Task")
        }

    })
}