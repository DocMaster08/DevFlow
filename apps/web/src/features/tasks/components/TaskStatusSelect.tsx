import type { TaskStatus } from "@/types/task"
import { useUpdateTask } from "../hooks/useUpdateTask"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Field, FieldLabel } from "@/components/ui/field"
import { statusItems } from "../utils/selectItems"

interface TaskStatusSelectProps {
    taskId: string
    status: TaskStatus
}

function TaskStatusSelect({ taskId, status }: TaskStatusSelectProps) {

    const updateTaskMutation = useUpdateTask(taskId);

    function handleStatusChange(value: string) {
        updateTaskMutation.mutate({ status: value }

        )
    }

    return (
        <Field>
            <FieldLabel htmlFor="status">Status</FieldLabel>
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
                        {statusItems.map(item => <SelectItem value={item.value}>{item.label}</SelectItem>)}
                    </SelectContent>
                </Select>
            </div>

        </Field>
    )
}

export default TaskStatusSelect