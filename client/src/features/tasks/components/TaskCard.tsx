import type { Task } from "@/types/task"

interface TaskCardProps {
    task:Task;
}

function TaskCard({task}:TaskCardProps) {
  return (
    <div>
        <h3>{task.title}</h3>
    </div>
  )
}

export default TaskCard