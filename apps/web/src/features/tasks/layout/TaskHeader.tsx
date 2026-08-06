import EditableTitle from "../components/EditableTitle"

interface TaskHeaderProps {
  taskId: string;
  title: string;
}

function TaskHeader({taskId, title}:TaskHeaderProps) {
  return (
    <div className="mb-8">
        <EditableTitle taskId={taskId} title={title} />
    </div>
  )
}

export default TaskHeader