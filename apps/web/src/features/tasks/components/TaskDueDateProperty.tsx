import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { formatDueDate } from "../../../utils/formatDate"
import { CalendarWithTime } from "@/components/common/CalenderWithTime"
import { useEffect, useState } from "react"
import type { Task } from "@/types/task"

interface TaskDueDatePropertyProps {
    date: Task["dueDate"]
    onClear: ()=>void
    onChange: (value:string)=>void
   
}

function TaskDueDateProperty({ date, onChange, onClear }: TaskDueDatePropertyProps) {
    const [draftDate, setDraftDate] = useState(date)
    const [open, setOpen] = useState(false)

    useEffect(() => {
        if (!open) setDraftDate(date)
    }, [date])

    function handleDateChange(value: string) {
        setDraftDate(value)

        if (value === null && value !== date) {
            onClear()
            setOpen(false)
        }
    }

    function handleOpenChange(open: boolean) {
        setOpen(open)
        if (!open && draftDate !== date) onChange(draftDate)

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