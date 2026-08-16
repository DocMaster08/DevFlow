import TaskPriorityProperty from "../components/TaskPriorityProperty"
import TaskStatusProperty from "../components/TaskStatusProperty"
import type { Task, TaskPriority, TaskStatus } from "@/types/task"
import MetadataItem from "./MetadataItem"
import { Calendar, ListOrdered, Notebook } from "lucide-react"
import TaskDueDateProperty from "../components/TaskDueDateProperty"
import { useUpdateTask } from "../hooks/useUpdateTask"

interface TaskMetadataProps {
    task: Task
}

function TaskMetadata({ task }: TaskMetadataProps) {

    const updateTaskMutation = useUpdateTask(task.id)

    function handleStatusChange(value: TaskStatus) {
        updateTaskMutation.mutate({ status: value })
    }

    function handlePriorityChange(value: TaskPriority) {
        updateTaskMutation.mutate({ priority: value })
    }

    function handleDateChange(value: string) {
        updateTaskMutation.mutate({ dueDate: value })
    }

    function handleDateClear() {
        updateTaskMutation.mutate({ dueDate: null })
    }


    return (
        <div className="bg-sidebar w-1/2 p-6 flex flex-col gap-12">
            <MetadataItem label="status" icon={Notebook}>
                <TaskStatusProperty status={task.status} onChange={handleStatusChange} pending={updateTaskMutation.isPending} />
            </MetadataItem>
            <MetadataItem label="priority" icon={ListOrdered}>
                <TaskPriorityProperty priority={task.priority} onChange={handlePriorityChange} pending={updateTaskMutation.isPending} />
            </MetadataItem>
            <MetadataItem label="due date" icon={Calendar}>
                <TaskDueDateProperty date={task.dueDate} onChange={handleDateChange} onClear={handleDateClear} />
            </MetadataItem>

        </div>
    )
}

export default TaskMetadata