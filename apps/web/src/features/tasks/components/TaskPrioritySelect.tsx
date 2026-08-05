import type { TaskPriority } from "@/types/task"
import { useUpdateTask } from "../hooks/useUpdateTask"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Field, FieldLabel } from "@/components/ui/field"
import { priorityItems } from "../utils/selectItems"

interface TaskPrioritySelectProps {
    taskId: string
    priority: TaskPriority
}

function TaskPrioritySelect({ taskId, priority }: TaskPrioritySelectProps) {

    const updateTaskMutation = useUpdateTask(taskId);

    function handlePriorityChange(value: string) {
        updateTaskMutation.mutate({ priority: value }

        )
    }

    return (
        <Field>
            <FieldLabel htmlFor="priority">priority</FieldLabel>
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
                        {priorityItems.map(item => <SelectItem value={item.value}>{item.label}</SelectItem>)}
                    </SelectContent>
                </Select>
            </div>

        </Field>
    )
}

export default TaskPrioritySelect