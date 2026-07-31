import TaskForm from "@/features/tasks/components/TaskForm"
import TaskList from "@/features/tasks/components/TaskList"
import { mockTasks } from "@/features/tasks/utils/mockTasks"
import type { Task } from "@/types/task"
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

    function handleCreateTask(title: string) {
        const newTask: Task = {
            id: crypto.randomUUID(),
            title,
            status: "todo",
            priority: "low",
            createdAt: new Date(),
            updatedAt: new Date()
        }

        setTasks([...tasks, newTask]);
    }

    return (
        <div className="space-y-6">
            <h1>Tasks</h1>
            <TaskForm onCreateTask={handleCreateTask} />
            <TaskList tasks={tasks} onDeleteTask={handleDeleteTask} onToggleTask={handleToggleTask} />
        </div>
    )
}

export default TasksPage