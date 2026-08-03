import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createProject } from "../api/createProject";
import { toast } from "sonner";
import { projectsKeys } from "../utils/queryKeys";

export function useCreateProject() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createProject,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: projectsKeys.all,
            });

            toast.success("Project created successfully")
        },
        onError: () => {
            toast.error("Failed to create project")
        }
    });
}