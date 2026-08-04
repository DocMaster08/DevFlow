import { Checkbox } from "@/components/ui/checkbox"
import { Field, FieldContent, FieldDescription, FieldLabel, FieldTitle } from "@/components/ui/field"
import type { Task } from "@/types/task"
import { useUpdateTaskStatus } from "../hooks/useUpdateTaskStatus"
import { Link } from "react-router"
import { Item, ItemActions, ItemContent, ItemDescription, ItemMedia, ItemTitle } from "@/components/ui/item"
import { Button } from "@/components/ui/button"

interface TaskCardProps {
    task: Task

}

function TaskCard({ task }: TaskCardProps) {


    const updateTaskStatusMutation = useUpdateTaskStatus(task.id, task.projectId)

    function handleChecked(checked: boolean) {

        updateTaskStatusMutation.mutate(checked ? "DONE" : "TODO")


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
                <Button size="sm">
                    <Link to={`/projects/${task.projectId}/tasks/${task.id}`}>Edit</Link>
                </Button>
                
            </ItemActions>

        </Item>

    )
}


export default TaskCard