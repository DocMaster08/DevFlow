import { Spinner } from "@/components/ui/spinner"
import EditableTitle from "@/features/tasks/components/EditableTitle"
import { useTask } from "@/features/tasks/hooks/useTask"
import { useParams } from "react-router"

function TaskPage() {
    const { taskId} = useParams()
    const {data:task, isLoading:isTaskLoading, isError:isTaskError} = useTask(taskId)

    if (isTaskLoading){
        return <Spinner/>
    }
    if (isTaskError){
        return <h1>Error getting task</h1>
    }
  return (
    <div className="flex flex-col gap-10">
        <EditableTitle taskId={taskId} title={task.title}/>
        <p>{task.description}</p>
        <p>{task.priority}</p>
        <p>{task.status}</p>
    </div>
  )
}

export default TaskPage