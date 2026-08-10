import { Spinner } from "@/components/ui/spinner"
import ActivityItem from "../components/ActivityItem"
import { useTaskActivities } from "../hooks/useTaskActivities"
import { Separator } from "@/components/ui/separator"

interface TaskActivityProps {
  taskId: string
}

function TaskActivity({ taskId }: TaskActivityProps) {

  const { data: activities, isLoading, isError } = useTaskActivities(taskId)

  if (isError) {
    return <h1>Error getting task activities</h1>
  }
  if (isLoading) {
    return <Spinner />
  }

  return (
    <div className="p-4">
      <p className="font-semibold text-xl p-2 border-b-4 border-accent w-md mb-4">Activity</p>
      {activities.map(activity => <ActivityItem key={activity.id} activity={activity} />)}
    </div>
  )
}

export default TaskActivity