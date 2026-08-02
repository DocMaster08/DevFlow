import { Spinner } from "@/components/ui/spinner";
import { getProject } from "@/features/project/api/getProject"
import ProjectCard from "@/features/projects/components/ProjectCard";
import { useQuery } from "@tanstack/react-query"
import { useParams } from "react-router"

function ProjectPage() {
  const { projectId } = useParams()
  const { data, isLoading, isError } = useQuery({
    queryKey: ["project", projectId],
    queryFn: () => getProject(projectId),
    enabled: !!projectId,
  });

  if (isLoading) {
    return <Spinner />
  }

  if (isError) {
    return <h1>Error getting project data</h1>
  }

  return (
    <div>
      {data &&
        <ProjectCard project={data} />
      }
      
    </div>
  )
}

export default ProjectPage