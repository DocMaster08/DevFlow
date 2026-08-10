import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { formatDueDate } from "../../../utils/formatDueDate"
import { CalendarWithTime } from "@/components/common/CalenderWithTime"
import { useEffect, useState } from "react"
import { useUpdateTask } from "../hooks/useUpdateTask"
import type { Task } from "@/types/task"

interface TaskDueDatePropertyProps {
    taskId: string
    date: Task["dueDate"]
}

function TaskDueDateProperty({ taskId, date }: TaskDueDatePropertyProps) {
    const [draftDate, setDraftDate] = useState(date)
    const [open, setOpen] = useState(false)

    const updateTaskMutation = useUpdateTask(taskId)

    useEffect(() => {
        if (!open) setDraftDate(date)
    }, [date])

    function handleDateChange(value: string) {
        setDraftDate(value)

        if (value === null && value !== draftDate) {
            updateTaskMutation.mutate({ dueDate: null })
            setOpen(false)
        }
    }

    function handleOpenChange(open: boolean) {
        setOpen(open)
        if (!open && draftDate !== date) updateTaskMutation.mutate({ dueDate: draftDate })

    }

    return (
        <Popover open={open} onOpenChange={handleOpenChange}>
            <PopoverTrigger asChild>
                <Button variant="outline">{date ? formatDueDate(date) : "No Due Date"}</Button>
            </PopoverTrigger>
            <PopoverContent side="left">
                <CalendarWithTime value={draftDate} onChange={handleDateChange} />
            </PopoverContent>
        </Popover>
    )
}

export default TaskDueDateProperty