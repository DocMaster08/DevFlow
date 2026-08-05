import { Checkbox } from "@/components/ui/checkbox"
import type { Task } from "@/types/task"
import { useUpdateProjectTask } from "../hooks/useUpdateProjectTask"
import { Link } from "react-router"
import { Item, ItemActions, ItemContent, ItemDescription, ItemMedia, ItemTitle } from "@/components/ui/item"
import { Button } from "@/components/ui/button"

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
            <ItemMedia variant="icon">
                <Checkbox id="check" name="check" checked={task.status === "DONE"} onCheckedChange={handleChecked} />
            </ItemMedia>
            <ItemContent>

                <ItemTitle>{task.title}</ItemTitle>
                {task.description && <ItemDescription>{task.description}</ItemDescription>}

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