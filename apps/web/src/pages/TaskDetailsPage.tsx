import { Spinner } from "@/components/ui/spinner";
import { useTask } from "@/features/tasks/hooks/useTask";
import TaskActivity from "@/features/tasks/layout/TaskActivity";
import TaskHeader from "@/features/tasks/layout/TaskHeader";
import TaskWorkspace from "@/features/tasks/layout/TaskWorkspace";
import { useParams } from "react-router";

function TaskDetailsPage() {
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
    <div>
      {task && (
        <div>
          <TaskHeader taskId={taskId} title={task.title} />
          <TaskWorkspace task={task} />
          <TaskActivity taskId={taskId} />
        </div>
      )}
    </div>
  );
}

export default TaskDetailsPage;
