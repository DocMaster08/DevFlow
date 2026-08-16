import type { TaskStatus } from "@/types/task"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { statusItems } from "../utils/selectItems"

interface TaskStatusPropertyProps {
    status: TaskStatus
    onChange: (value:TaskStatus)=>void
    pending: boolean
}

function TaskStatusProperty({ status, onChange, pending }: TaskStatusPropertyProps) {
    return (
        <div className="w-fit">
            <Select
                name="status"
                value={status}
                onValueChange={onChange}

            >
                <SelectTrigger id="status" disabled={pending} >
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