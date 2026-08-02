import { getProjects } from "@/features/projects/api/getProjects"
import CreateProjectDialog from "@/features/projects/components/CreateProjectDialog"
import ProjectList from "@/features/projects/components/ProjectList"
import { useQuery } from "@tanstack/react-query"
import { Loader } from "lucide-react"

function ProjectsPage() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["projects"],
    queryFn: getProjects,
  })

  if (isLoading) return <Loader />
  if (isError) return <h1>Problem getting projects</h1>

  return (
    <div>
      {data &&
        <>
          <div className="flex items-center justify-between mb-8">
            <h1>Projects</h1>
            <CreateProjectDialog />
          </div>
          <ProjectList projects={data} />
        </>
      }
    </div>
  )
}

export default ProjectsPage