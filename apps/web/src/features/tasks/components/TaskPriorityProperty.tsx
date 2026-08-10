import type { TaskPriority } from "@/types/task"
import { useUpdateTask } from "../hooks/useUpdateTask"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { priorityItems } from "../utils/selectItems"

interface TaskPriorityPropertyProps {
    taskId: string
    priority: TaskPriority
}

function TaskPriorityProperty({ taskId, priority }: TaskPriorityPropertyProps) {

    const updateTaskMutation = useUpdateTask(taskId);

    function handlePriorityChange(value: TaskPriority) {
        updateTaskMutation.mutate({ priority: value }

        )
    }

    return (
        <div className="w-fit">
            <Select
                name="priority"
                value={priority}
                onValueChange={handlePriorityChange}

            >
                <SelectTrigger id="priority" disabled={updateTaskMutation.isPending} >
                    <SelectValue placeholder="Priority" />
                </SelectTrigger>
                <SelectContent position='popper'>
                    {priorityItems.map(item => <SelectItem key={item.value} value={item.value}>{item.label}</SelectItem>)}
                </SelectContent>
            </Select>
        </div>
    )
}

export default TaskPriorityProperty