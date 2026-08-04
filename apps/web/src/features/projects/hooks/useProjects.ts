import { useQuery } from "@tanstack/react-query";
import { getProjects } from "../api/getProjects";
import { projectKeys } from "../utils/queryKeys";

export function useProjects(){
    return useQuery({
    queryKey: projectKeys.all,
    queryFn: getProjects,
  })

}