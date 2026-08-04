import { useQuery } from "@tanstack/react-query";
import { getProject } from "../../tasks/api/getProject";
import { projectKeys } from "../utils/queryKeys"; 

export function useProject(projectId?: string) {
    return useQuery({
        queryKey: projectKeys.detail(projectId),
        queryFn: () => getProject(projectId!),
        enabled: !!projectId,
    });
}