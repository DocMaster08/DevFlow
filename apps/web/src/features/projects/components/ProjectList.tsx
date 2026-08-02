import type { Project } from "@/types/project"
import ProjectCard from "./ProjectCard"

interface ProjectListProps {
    projects: Project[]
}

function ProjectList({projects}:ProjectListProps) {
  return (
    <div className="flex flex-col gap-4">
        {projects.map(project => <ProjectCard key={project.id} project={project}/>)}
      </div>
  )
}

export default ProjectList