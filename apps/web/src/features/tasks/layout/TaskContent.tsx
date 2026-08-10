import { Field, FieldLabel } from "@/components/ui/field";
import EditableDescription from "../components/EditableDescription"
import type { Task } from "@/types/task";

interface TaskContentProps {
    task: Task
}

function TaskContent({ task }: TaskContentProps) {
    return (
        <div className="w-2/3 bg-card p-4">
            <Field>
                <FieldLabel>Description:</FieldLabel>
                <EditableDescription taskId={task.id} description={task.description} />
            </Field>
        </div>
    )
}

export default TaskContent