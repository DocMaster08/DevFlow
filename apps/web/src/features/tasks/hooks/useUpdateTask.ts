import { useMutation, useQueryClient } from "@tanstack/react-query";
import { activityKeys, taskKeys } from "../utils/queryKeys";
import { toast } from "sonner";
import { updateTask } from "../api/updateTask";
import type { Task } from "@/types/task";
import type { UpdateTaskDTO } from "../schemas/updateTask.schema";

export function useUpdateTask(id: string, projectId: string) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: UpdateTaskDTO) => updateTask(id, data),
        onMutate: async (data: UpdateTaskDTO) => {

            await queryClient.cancelQueries({
                queryKey: taskKeys.byId(id)
            })

            await queryClient.cancelQueries({
                queryKey: taskKeys.byProject(projectId)
            })


            if (projectId) {

            }


            const previousTask = queryClient.getQueryData<Task>(taskKeys.byId(id))

            if (previousTask) queryClient.setQueryData(taskKeys.byId(id), { ...previousTask, ...data })


            const previousTasks = queryClient.getQueryData<Task[]>(taskKeys.byProject(projectId))

            if (previousTasks) queryClient.setQueryData(taskKeys.byProject(projectId), previousTasks.map(task => { return task.id === id ? { ...task, ...data } : task }))

            return { previousTask, previousTasks }

        },
        onSettled: () => {

            queryClient.invalidateQueries({
                queryKey: taskKeys.byProject(projectId)
            })

            queryClient.invalidateQueries({
                queryKey: taskKeys.byId(id)
            })
            queryClient.invalidateQueries({
                queryKey: activityKeys.byTask(id)
            })

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