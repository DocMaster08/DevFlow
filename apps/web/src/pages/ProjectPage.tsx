import { Spinner } from "@/components/ui/spinner";
import { useProject } from "@/features/project/hooks/useProject";
import ProjectCard from "@/features/projects/components/ProjectCard";
import { useParams } from "react-router"

function ProjectPage() {
  const { projectId } = useParams()
  const { data, isLoading, isError } = useProject(projectId)

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