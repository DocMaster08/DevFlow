import type { Task } from "@/types/task"
import { CheckSquare, Square, Trash } from "lucide-react";

interface TaskCardProps {
    task: Task;
    onDeleteTask: (id: string) => void
    onToggleTask: (id: string) => void;

}

function TaskCard({ task, onDeleteTask, onToggleTask }: TaskCardProps) {
    return (
        <div className="rounded-lg border p-4 flex justify-between">

            <div className="flex gap-4 items-center">
                <button onClick={() => onToggleTask(task.id)}>
                    {
                        task.status === "done" ? <CheckSquare /> : <Square />
                    }
                </button>

                <div>
                    <h3 className="font-semibold">{task.title}</h3>
                    <div>
                        {task.priority}
                        {" • "}
                        {task.status}
                    </div>
                </div>
            </div>
            <button onClick={() => { onDeleteTask(task.id) }} className="text-red-400 cursor-pointer"><Trash size={16} /></button>
        </div>
    )
}

export default TaskCard