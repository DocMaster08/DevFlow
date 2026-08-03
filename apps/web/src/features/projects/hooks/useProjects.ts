import { useQuery } from "@tanstack/react-query";
import { getProjects } from "../api/getProjects";
import { projectsKeys } from "../utils/queryKeys";

export function useProjects(){
    return useQuery({
    queryKey: projectsKeys.all,
    queryFn: getProjects,
  })

}