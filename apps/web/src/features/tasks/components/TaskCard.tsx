import { Checkbox } from "@/components/ui/checkbox"
import { Field, FieldContent, FieldDescription, FieldLabel, FieldTitle } from "@/components/ui/field"
import type { Task } from "@/types/task"
import { useUpdateTaskStatus } from "../hooks/useUpdateTaskStatus"

interface TaskCardProps {
    task: Task

}

function TaskCard({ task }: TaskCardProps) {


    const updateTaskStatusMutation = useUpdateTaskStatus(task.id, task.projectId)

    function handleChecked() {

        updateTaskStatusMutation.mutate(task.status === "TODO"?"DONE":"TODO")


    }
    return (
        <FieldLabel>
            <Field orientation="horizontal">
                <Checkbox id="check" name="check" checked={task.status === "DONE"} onCheckedChange={handleChecked} />
                <FieldContent>
                    <FieldTitle>{task.title}</FieldTitle>
                    {task.description && <FieldDescription>
                        {task.description}
                    </FieldDescription>}
                </FieldContent>
            </Field>
        </FieldLabel>
    )
}

export default TaskCard