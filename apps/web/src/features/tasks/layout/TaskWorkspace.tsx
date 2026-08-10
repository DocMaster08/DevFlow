import type { Task } from "@/types/task"
import TaskContent from "./TaskContent"
import TaskMetadata from "./TaskMetadata"

interface TaskWorkspaceProps {
  task: Task
}

function TaskWorkspace({ task }: TaskWorkspaceProps) {
  return (
    <div className="flex">
      <TaskContent task={task} />
      <TaskMetadata task={task} />
    </div>
  )
}

export default TaskWorkspace