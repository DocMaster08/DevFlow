import type { Project } from "@/types/project"
import ProjectCard from "./ProjectCard"

interface ProjectListProps {
  projects: Project[]
}

function ProjectList({ projects }: ProjectListProps) {
  return (
    <div className="grid grid-cols-4 items-center">
      {projects.map(project => <ProjectCard key={project.id} project={project} />)}
    </div>
  )
}

export default ProjectList