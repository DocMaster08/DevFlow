import type { Task } from "@/types/task"
import TaskCard from "./TaskCard";

interface TaskListProps {
    tasks: Task[];
    onDeleteTask: (id:string)=>void;
    onToggleTask: (id:string)=>void;
}

function TaskList({ tasks, onDeleteTask, onToggleTask }: TaskListProps) {
    return (
        <div>
            {tasks.map(task => <TaskCard key={task.id} task={task} onDeleteTask={onDeleteTask} onToggleTask={onToggleTask} />)}
        </div>
    )
}

export default TaskList