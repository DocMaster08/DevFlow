import type { Project } from "@/types/project"
import ProjectCard from "./ProjectCard"
import { Link } from "react-router"

interface ProjectListProps {
  projects: Project[]
}

function ProjectList({ projects }: ProjectListProps) {
  return (
    <div className="flex flex-col gap-4">
      {projects.map(project => <Link key={project.id} to={`/projects/${project.id}`}><ProjectCard project={project} /></Link>)}
    </div>
  )
}

export default ProjectList