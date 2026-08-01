import { getProjects } from "@/features/projects/api"
import { useQuery } from "@tanstack/react-query"
import { Loader } from "lucide-react"

function ProjectsPage() {
  const {data, isLoading, isError} = useQuery({
    queryKey: ["projects"],
    queryFn: getProjects,
  })

  if (isLoading) return <Loader/>
  if (isError) return <h1>Problem getting projects</h1>

  return (
    <div>
      projects page loaded
      <div>
        {data.map(project => <p>{project.name}</p>)}
      </div>
    </div>
  )
}

export default ProjectsPage