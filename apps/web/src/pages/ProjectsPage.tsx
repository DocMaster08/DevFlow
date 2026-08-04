import CreateProjectDialog from "@/features/projects/components/CreateProjectDialog"
import ProjectList from "@/features/projects/components/ProjectList"
import { useProjects } from "@/features/projects/hooks/useProjects"
import { Loader } from "lucide-react"

function ProjectsPage() {
  const { data, isLoading, isError } = useProjects()
  if (isLoading) return <Loader />
  if (isError) return <h1>Problem getting projects</h1>

  return (
    <div>
      {data &&
        <>
          <div className="flex items-center justify-between mb-8">
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