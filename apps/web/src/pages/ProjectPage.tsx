import { Spinner } from "@/components/ui/spinner";
import ProjectHeader from "@/features/tasks/components/ProjectHeader";
import { useProject } from "@/features/projects/hooks/useProject";
import TaskList from "@/features/tasks/components/TaskList";
import { useTasks } from "@/features/tasks/hooks/useTasks";
import { useParams } from "react-router"

function ProjectPage() {
  const { projectId } = useParams()
  const { data: project, isLoading: isProjectLoading, isError: isProjectError } = useProject(projectId)
  const { data: tasks, isLoading: isTasksLoading, isError: isTasksError } = useTasks(projectId)



  if (isProjectLoading || isTasksLoading) {
    return <Spinner />
  }

  if (isProjectError || isTasksError) {
    return <h1>Error getting project data</h1>
  }

  return (
    <div className="p-6">
      {project && tasks && <>

        <ProjectHeader project={project} />
        <TaskList tasks={tasks} />

      </>
      }

    </div>
  )
}

export default ProjectPage