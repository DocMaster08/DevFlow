import { useMutation, useQueryClient } from "@tanstack/react-query";
import { taskKeys } from "../utils/queryKeys";
import { toast } from "sonner";
import { updateTask } from "../api/updateTask";
import type { Task } from "@/types/task";
import type { updateTaskDTO } from "../schemas/updateTask.schema";

export function useUpdateProjectTask(id: string, projectId: string) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data:updateTaskDTO) => updateTask(id, data),
        onMutate: async (data: updateTaskDTO) => {
            await queryClient.cancelQueries({
                queryKey: taskKeys.byProject(projectId)
            })
            const previousTasks = queryClient.getQueryData<Task[]>(taskKeys.byProject(projectId))
            if (!previousTasks) return;

            queryClient.setQueryData(taskKeys.byProject(projectId), previousTasks.map((task) => { return task.id === id ? {...task, ...data} : task }))
            return {previousTasks}
        },
        onSettled: () => {
            queryClient.invalidateQueries({
                queryKey: taskKeys.byProject(projectId)
            })
        },

        onError(_, __, context) {
            const {previousTasks} = context ?? undefined
            if (previousTasks) {
                queryClient.setQueryData(
                    taskKeys.byProject(projectId), previousTasks
                )
            }

            toast.error("Failed to update Task")
        }

    })
}