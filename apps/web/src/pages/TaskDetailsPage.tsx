import { Spinner } from "@/components/ui/spinner";
import { useProject } from "@/features/projects/hooks/useProject";
import TaskBackButton from "@/features/tasks/components/TaskBackButton";
import { useTask } from "@/features/tasks/hooks/useTask";
import TaskActivity from "@/features/tasks/layout/TaskActivity";
import TaskHeader from "@/features/tasks/layout/TaskHeader";
import TaskWorkspace from "@/features/tasks/layout/TaskWorkspace";
import { useParams } from "react-router";

function TaskDetailsPage() {
  const { taskId, projectId } = useParams();

  if (!taskId || !projectId) {
    return <h1>Invalid params</h1>;
  }

  const {
    data: task,
    isLoading: isTaskLoading,
    isError: isTaskError,
  } = useTask(taskId);

  const {
    data: project,
    isLoading: isProjectLoading,
    isError: isProjectError
  } = useProject(projectId)

  if (isTaskError || isProjectError) {
    return <h1>Error getting task</h1>;
  }

  if (isTaskLoading || isProjectLoading) {
    return <Spinner />;
  }

  return (
    <div>
      {task && project && (
        <div>
          <TaskBackButton projectId={projectId} projectName={project.name} />
          <TaskHeader taskId={taskId} title={task.title} projectId={projectId} />
          <TaskWorkspace task={task} />
          <TaskActivity taskId={taskId} />
        </div>
      )}
    </div>
  );
}

export default TaskDetailsPage;
