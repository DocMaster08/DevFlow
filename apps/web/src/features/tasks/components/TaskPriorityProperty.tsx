import type { TaskPriority } from "@/types/task"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { priorityItems } from "../utils/selectItems"

interface TaskPriorityPropertyProps {
    priority: TaskPriority
    onChange:(value:TaskPriority)=>void
    pending: boolean
}

function TaskPriorityProperty({ priority, onChange, pending}: TaskPriorityPropertyProps) {

    return (
        <div className="w-fit">
            <Select
                name="priority"
                value={priority}
                onValueChange={onChange}
            >
                <SelectTrigger id="priority" disabled={pending} >
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