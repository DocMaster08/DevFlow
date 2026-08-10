import type { TaskStatus } from "@/types/task"
import { useUpdateTask } from "../hooks/useUpdateTask"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { statusItems } from "../utils/selectItems"

interface TaskStatusPropertyProps {
    taskId: string
    status: TaskStatus
}

function TaskStatusProperty({ taskId, status }: TaskStatusPropertyProps) {

    const updateTaskMutation = useUpdateTask(taskId);

    function handleStatusChange(value: TaskStatus) {
        updateTaskMutation.mutate({ status: value }

        )
    }

    return (
        <div className="w-fit">
            <Select
                name="status"
                value={status}
                onValueChange={handleStatusChange}

            >
                <SelectTrigger id="status" disabled={updateTaskMutation.isPending} >
                    <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent position='popper'>
                    {statusItems.map(item => <SelectItem key={item.value} value={item.value}>{item.label}</SelectItem>)}
                </SelectContent>
            </Select>
        </div>

    )
}

export default TaskStatusProperty