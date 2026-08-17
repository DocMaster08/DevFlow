import EditableTitle from "../components/EditableTitle"

interface TaskHeaderProps {
  taskId: string;
  title: string;
  projectId: string;
}

function TaskHeader({ taskId, title, projectId }: TaskHeaderProps) {
  return (
    <div className="p-6">
      <EditableTitle taskId={taskId} title={title} projectId={projectId} />
    </div>
  )
}

export default TaskHeader