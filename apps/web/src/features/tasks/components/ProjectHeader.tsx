import CreateTaskDialog from '@/features/tasks/components/CreateTaskDialog'
import type { Project } from '@/types/project'

interface ProjectHeaderProps {
    project: Project
}

function ProjectHeader({project}:ProjectHeaderProps) {
    return (
        <div className='flex justify-between items-center mb-8 w-full'>
            <h1>{project.name}</h1>
            <CreateTaskDialog projectId={project.id} />
        </div>
    )
}

export default ProjectHeader