import { useQuery } from "@tanstack/react-query";
import { taskKeys } from "../utils/queryKeys";
import { getTask } from "../api/getTask";

export function useTask(taskId?: string) {
    return useQuery({
        queryFn: () => getTask(taskId!),
        queryKey: taskKeys.byId(taskId as string),
        enabled: !!taskId
    })
}