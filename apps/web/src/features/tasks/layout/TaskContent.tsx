import { Field, FieldLabel } from "@/components/ui/field";
import EditableDescription from "../components/EditableDescription"

interface TaskContentProps {
    taskId: string;
    description: string;
}

function TaskContent({ taskId, description }: TaskContentProps) {
    return (
        <div className="w-2/3 bg-card p-4">
            <Field>
                <FieldLabel>Description:</FieldLabel>
                <EditableDescription taskId={taskId} description={description} />
            </Field>
        </div>
    )
}

export default TaskContent