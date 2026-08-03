import { Button } from "@/components/ui/button"
import { Item, ItemActions, ItemContent, ItemDescription, ItemMedia, ItemTitle } from "@/components/ui/item"
import type { Task } from "@/types/task"
import { Square } from "lucide-react"

interface TaskCardProps {
    task: Task
}

function TaskCard({ task }: TaskCardProps) {
    return (
        <Item variant="outline">
            <ItemMedia variant="image">
                <Square size={20}/>
            </ItemMedia>
            <ItemContent>
                <ItemTitle>{task.title}</ItemTitle>
                {task.description&&<ItemDescription>{task.description}</ItemDescription>}
            </ItemContent>
            <ItemActions>
                <Button>Edit</Button>
            </ItemActions>
        </Item>
    )
}

export default TaskCard