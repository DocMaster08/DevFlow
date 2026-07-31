import type { Task } from "@/types/task"
import TaskCard from "./TaskCard";

interface TaskListProps {
    tasks: Task[];
}

function TaskList({ tasks }: TaskListProps) {
    return (
        <div>
            {tasks.map(task => <TaskCard key={task.id} task={task} />)}
        </div>
    )
}

export default TaskList