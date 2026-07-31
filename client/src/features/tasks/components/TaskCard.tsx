import type { Task } from "@/types/task"

interface TaskCardProps {
    task: Task;
}

function TaskCard({ task }: TaskCardProps) {
    return (
        <div className="rounded-lg border p-4">
            <h3 className="font-semibold">{task.title}</h3>
            <div>
                {task.priority}
                {" • "}
                {task.status}
            </div>
        </div>
    )
}

export default TaskCard