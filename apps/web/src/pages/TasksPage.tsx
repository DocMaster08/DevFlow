import TaskForm from "@/features/tasks/components/TaskForm"
import TaskList from "@/features/tasks/components/TaskList"
import { useTasks } from "@/features/tasks/hooks/useTasks"

function TasksPage() {

    const { tasks, createTask, toggleTask, deleteTask } = useTasks();

    return (
        <div className="space-y-6">
            <h1>Tasks</h1>
            <TaskForm onCreateTask={createTask} />
            <TaskList tasks={tasks} onDeleteTask={deleteTask} onToggleTask={toggleTask} />
        </div>
    )
}

export default TasksPage