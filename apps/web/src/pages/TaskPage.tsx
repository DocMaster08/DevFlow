import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Spinner } from "@/components/ui/spinner";
import EditableTitle from "@/features/tasks/components/EditableTitle";
import TaskPrioritySelect from "@/features/tasks/components/TaskPrioritySelect";
import TaskStatusSelect from "@/features/tasks/components/TaskStatusSelect";
import { useTask } from "@/features/tasks/hooks/useTask";
import { datetimeToString } from "@/features/tasks/utils/datetimeToString";
import { useParams } from "react-router";

function TaskPage() {
  const { taskId } = useParams();

  if (!taskId) {
    return <h1>Invalid params</h1>;
  }

  const {
    data: task,
    isLoading: isTaskLoading,
    isError: isTaskError,
  } = useTask(taskId);

  if (isTaskError) {
    return <h1>Error getting task</h1>;
  }

  if (isTaskLoading) {
    return <Spinner />;
  }

  return (
    <div className="flex flex-col gap-10">
      {task && (
        <FieldGroup>
          <Field>
            <FieldLabel>Title</FieldLabel>
            <EditableTitle taskId={taskId} title={task.title} />
          </Field>
          <TaskStatusSelect taskId={taskId} status={task.status}/>
          <TaskPrioritySelect taskId={taskId} priority={task.priority}/>
          {task.dueDate && datetimeToString(task.dueDate)}
        </FieldGroup>
      )}
    </div>
  );
}

export default TaskPage;
