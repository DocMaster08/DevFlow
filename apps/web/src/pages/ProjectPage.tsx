import { Spinner } from "@/components/ui/spinner";
import { useProject } from "@/features/project/hooks/useProject";
import ProjectCard from "@/features/projects/components/ProjectCard";
import CreateTaskDialog from "@/features/tasks/components/CreateTaskDialog";
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
      {data && <>
        <div className="flex items-center justify-between mb-8">
          <h1>Project</h1>
          <CreateTaskDialog projectId={projectId} />
        </div>
        <ProjectCard project={data} />
      </>
      }

    </div>
  )
}

export default ProjectPage