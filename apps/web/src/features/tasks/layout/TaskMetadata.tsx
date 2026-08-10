import TaskPriorityProperty from "../components/TaskPriorityProperty"
import TaskStatusProperty from "../components/TaskStatusProperty"
import type { Task } from "@/types/task"
import MetadataItem from "./MetadataItem"
import { ListOrdered, Notebook } from "lucide-react"

interface TaskMetadataProps {
    task: Task
}

function TaskMetadata({ task }: TaskMetadataProps) {
    return (
        <div className="bg-sidebar w-1/3 p-4 flex flex-col gap-8">
            <MetadataItem label="status" icon={Notebook}>
                <TaskStatusProperty taskId={task.id} status={task.status} />
            </MetadataItem>
            <MetadataItem label="priority" icon={ListOrdered}>
                <TaskPriorityProperty taskId={task.id} priority={task.priority} />
            </MetadataItem>

        </div>
    )
}

export default TaskMetadata