import type { Task } from "@/types/task"
import TaskContent from "./TaskContent"
import TaskMetadata from "./TaskMetadata"

interface TaskWorkspaceProps {
    task : Task
}

function TaskWorkspace({task}:TaskWorkspaceProps) {
  return (
    <div className="flex">
        <TaskContent taskId={task.id} description={task.description}/>
        <TaskMetadata taskId={task.id} taskFields={{status:task.status, priority:task.priority, dueDate:task.dueDate}}/>
    </div>
  )
}

export default TaskWorkspace