import { ArrowLeft } from "lucide-react"
import { Link } from "react-router"

interface TaskBackButtonProps{
    projectId: string
    projectName: string
}

function TaskBackButton({projectId, projectName}:TaskBackButtonProps) {
  return (
    <Link className="flex items-center p-4 gap-2" to={`/projects/${projectId}`}>
        <ArrowLeft size={18}/>
        {projectName}
    </Link>
  )
}

export default TaskBackButton