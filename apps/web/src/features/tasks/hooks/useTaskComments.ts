import { useQuery } from "@tanstack/react-query";
import { commentKeys } from "../utils/queryKeys";
import { getTaskComments } from "../api/getTaskComments";

export function useTaskComments(taskId: string) {
    return useQuery({
        queryFn: () => getTaskComments(taskId),
        queryKey: commentKeys.byTask(taskId)
    })
}