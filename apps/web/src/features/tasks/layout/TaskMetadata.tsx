import TaskPriorityProperty from "../components/TaskPriorityProperty"
import TaskStatusProperty from "../components/TaskStatusProperty"
import type { Task } from "@/types/task"
import MetadataItem from "./MetadataItem"
import { Calendar, ListOrdered, Notebook } from "lucide-react"
import TaskDueDateProperty from "../components/TaskDueDateProperty"

interface TaskMetadataProps {
    task: Task
}

function TaskMetadata({ task }: TaskMetadataProps) {
    return (
        <div className="bg-sidebar w-1/2 p-6 flex flex-col gap-12">
            <MetadataItem label="status" icon={Notebook}>
                <TaskStatusProperty taskId={task.id} status={task.status} />
            </MetadataItem>
            <MetadataItem label="priority" icon={ListOrdered}>
                <TaskPriorityProperty taskId={task.id} priority={task.priority} />
            </MetadataItem>
            <MetadataItem label="due date" icon={Calendar}>
                <TaskDueDateProperty taskId={task.id} date={task.dueDate} />
            </MetadataItem>

        </div>
    )
}

export default TaskMetadata