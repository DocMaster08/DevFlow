import type z from "zod"
import TaskPrioritySelect from "../components/TaskPrioritySelect"
import TaskStatusSelect from "../components/TaskStatusSelect"
import { taskFieldsSchema } from "../schemas/taskFields.schema"
import { Separator } from "@/components/ui/separator"

const taskMetadataSchema = taskFieldsSchema.omit({
    title: true,
    description: true
})

type taskMetadataDTO = z.infer<typeof taskMetadataSchema>

interface TaskMetadataProps {
    taskId: string
    taskFields: taskMetadataDTO
}

function TaskMetadata({ taskId, taskFields }: TaskMetadataProps) {
    return (
        <div className="bg-sidebar w-1/3 p-4 flex flex-col gap-4">
            <TaskStatusSelect taskId={taskId} status={taskFields.status} />
            <Separator/>
            <TaskPrioritySelect taskId={taskId} priority={taskFields.priority} />

        </div>
    )
}

export default TaskMetadata