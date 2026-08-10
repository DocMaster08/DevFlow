import { Spinner } from "@/components/ui/spinner"
import CreateProjectDialog from "@/features/projects/components/CreateProjectDialog"
import ProjectList from "@/features/projects/components/ProjectList"
import { useProjects } from "@/features/projects/hooks/useProjects"

function ProjectsPage() {
  const { data, isLoading, isError } = useProjects()
  if (isLoading) return <Spinner />
  if (isError) return <h1>Problem getting projects</h1>

  return (
    <div>
      {data &&
        <>
          <div className="flex items-center justify-between p-6">
            <h1 className="font-semibold text-lg">Projects</h1>
            <CreateProjectDialog />
          </div>
          <ProjectList projects={data} />
        </>
      }
    </div>
  )
}

export default ProjectsPage