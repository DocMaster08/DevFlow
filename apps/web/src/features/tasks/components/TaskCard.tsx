import { Checkbox } from "@/components/ui/checkbox"
import type { Task, TaskPriority } from "@/types/task"
import { Link } from "react-router"
import { Item, ItemActions, ItemContent, ItemDescription, ItemMedia, ItemTitle } from "@/components/ui/item"
import TaskPriorityProperty from "./TaskPriorityProperty"
import TaskDueDateProperty from "./TaskDueDateProperty"
import { useUpdateTask } from "../hooks/useUpdateTask"

interface TaskCardProps {
    task: Task

}

function TaskCard({ task }: TaskCardProps) {


    const updateTaskMutation = useUpdateTask(task.id, task.projectId)

    function handleChecked(checked: boolean) {
        updateTaskMutation.mutate(checked ? { status: "DONE" } : { status: "TODO" })
    }

    function handlePriorityChange(value: TaskPriority) {
        updateTaskMutation.mutate({ priority: value })
    }

    function handleDateChange(value: string) {
        updateTaskMutation.mutate({ dueDate: value })
    }

    function handleDateClear(){
        updateTaskMutation.mutate({dueDate:null})
    }

    return (


        <Item variant="outline">
            <ItemMedia variant="icon" >
                <Checkbox id="check" name="check" checked={task.status === "DONE"} onCheckedChange={handleChecked} />
            </ItemMedia>
            <ItemContent>
                <Link to={`/projects/${task.projectId}/tasks/${task.id}`}>
                    <ItemTitle>{task.title}</ItemTitle>
                    {task.description && <ItemDescription>{task.description}</ItemDescription>}
                </Link>
            </ItemContent>

            <ItemActions>

                <TaskPriorityProperty priority={task.priority} onChange={handlePriorityChange} pending={updateTaskMutation.isPending} />
                <TaskDueDateProperty date={task.dueDate} onChange={handleDateChange} onClear={handleDateClear} />
            </ItemActions>

        </Item>


    )
}


export default TaskCard