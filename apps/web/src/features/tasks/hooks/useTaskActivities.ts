import { useQuery } from "@tanstack/react-query";
import { activityKeys } from "../utils/queryKeys";
import { getTaskActivities } from "../api/getTaskActivities";

export function useTaskActivities(taskId: string) {
    return useQuery({
        queryFn: () => getTaskActivities(taskId),
        queryKey: activityKeys.byTask(taskId)
    })
}