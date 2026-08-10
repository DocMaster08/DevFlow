import { Checkbox } from "@/components/ui/checkbox"
import type { Task } from "@/types/task"
import { useUpdateProjectTask } from "../hooks/useUpdateProjectTask"
import { Link } from "react-router"
import { Item, ItemActions, ItemContent, ItemDescription, ItemMedia, ItemTitle } from "@/components/ui/item"
import { Button } from "@/components/ui/button"
import { formatDueDate } from "@/utils/formatDate"

const colors = { "LOW": "text-green-300", "MEDIUM": "text-orange-300", "HIGH": "text-red-400" }

interface TaskCardProps {
    task: Task

}

function TaskCard({ task }: TaskCardProps) {


    const updateTaskMutation = useUpdateProjectTask(task.id, task.projectId)

    function handleChecked(checked: boolean) {

        updateTaskMutation.mutate(checked ? { status: "DONE" } : { status: "TODO" })


    }
    return (


        <Item variant="outline">
            <ItemMedia variant="icon" className={!task.description&& "mt-1"}>
                <Checkbox  id="check" name="check" checked={task.status === "DONE"} onCheckedChange={handleChecked} />
            </ItemMedia>
            <ItemContent>
                <ItemTitle>{task.title}</ItemTitle>
                {task.description && <ItemDescription>{task.description}</ItemDescription>}
            </ItemContent>
            <ItemContent className="">
                <ItemDescription className={colors[task.priority]}>{task.priority}</ItemDescription>
            </ItemContent>
            <ItemContent className="">
                <ItemDescription>{formatDueDate(task.dueDate)}</ItemDescription>
            </ItemContent>
            <ItemActions>
                <Link to={`/projects/${task.projectId}/tasks/${task.id}`}>
                    <Button size="sm">
                        Edit
                    </Button>
                </Link>
            </ItemActions>

        </Item>

    )
}


export default TaskCard