import TaskList from "@/features/tasks/components/TaskList"
import { mockTasks } from "@/features/tasks/utils/mockTasks"
import { useState } from "react"

function TasksPage() {
    const [tasks, setTasks] = useState(mockTasks)

    function handleDeleteTask(id: string) {
        setTasks(tasks.filter(task => task.id !== id))
    }

    function handleToggleTask(id: string) {
        setTasks(tasks.map(task => {
            return task.id === id ? { ...task, status: task.status === "done" ? "todo" : "done" } : task
        }))
    }

    return (
        <div className="space-y-6">
            <h1>Tasks</h1>
            <TaskList tasks={tasks} onDeleteTask={handleDeleteTask} onToggleTask={handleToggleTask} />
        </div>
    )
}

export default TasksPage