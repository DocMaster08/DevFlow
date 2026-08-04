import { useMutation, useQueryClient } from "@tanstack/react-query";
import { taskKeys } from "../utils/queryKeys";
import { toast } from "sonner";
import { updateTaskStatus } from "../api/updateTaskStatus";
import type { Task, TaskStatus } from "@/types/task";

export function useUpdateTaskStatus(id: string, projectId: string) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (status: TaskStatus) => updateTaskStatus(id, status),
        onMutate: async (status: TaskStatus) => {
            await queryClient.cancelQueries({
                queryKey: taskKeys.byProject(projectId)
            })
            const previousTasks: Task[] = queryClient.getQueryData(taskKeys.byProject(projectId))
            if (!previousTasks) return;

            queryClient.setQueryData(taskKeys.byProject(projectId), previousTasks.map((task) => { return task.id === id ? { ...task, status: status } : task }))
            return {previousTasks}
        },
        onSettled: () => {
            queryClient.invalidateQueries({
                queryKey: taskKeys.byProject(projectId)
            })
        },

        onError(_, __, {previousTasks}) {
            if (previousTasks) {
                queryClient.setQueryData(
                    taskKeys.byProject(projectId), previousTasks
                )
            }

            toast.error("Failed to update Task")
        }

    })
}