import { useQuery } from "@tanstack/react-query";
import { getTasks } from "../api/getTasks";
import { taskKeys } from "../utils/queryKeys";

export function useTasks(projectId: string) {
    return useQuery({
        queryFn: () => getTasks(projectId),
        queryKey: taskKeys.byProject(projectId)
    })
}