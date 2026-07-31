import { mockTasks } from "@/features/tasks/utils/mockTasks";
import type { Task } from "@/types/task";
import { useState } from "react";

export function useTasks() {
    const [tasks, setTasks] = useState<Task[]>(mockTasks)

    function createTask(title: string) {
        const newTask: Task = {
            id: crypto.randomUUID(),
            title,
            status: "todo",
            priority: "low",
            createdAt: new Date(),
            updatedAt: new Date()
        }

        setTasks(prev => [...prev, newTask]);
    }

    function deleteTask(id: string) {

        setTasks(prev =>
            prev.filter(
                task => task.id !== id
            )
        );
    }

    function toggleTask(id: string) {

        setTasks(prev =>
            prev.map(task => {

                if (task.id === id) {

                    return {
                        ...task,
                        status:
                            task.status === "done"
                                ? "todo"
                                : "done"
                    };

                }

                return task;

            })
        );

    }

    return {tasks, createTask, toggleTask, deleteTask}
}

