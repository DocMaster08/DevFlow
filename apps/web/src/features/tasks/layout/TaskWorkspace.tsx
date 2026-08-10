import type { Task } from "@/types/task"
import TaskContent from "./TaskContent"
import TaskMetadata from "./TaskMetadata"

interface TaskWorkspaceProps {
  task: Task
}

function TaskWorkspace({ task }: TaskWorkspaceProps) {
  return (
    <div className="flex w-full">
      <TaskContent task={task} />
      <TaskMetadata task={task} />
    </div>
  )
}

export default TaskWorkspace