import TaskList from "@/features/tasks/components/TaskList"
import { mockTasks } from "@/features/tasks/utils/mockTasks"

function TasksPage() {
  return (
    <div className="space-y-6">
        <h1>Tasks</h1>
        <TaskList tasks={mockTasks}/>
    </div>
  )
}

export default TasksPage