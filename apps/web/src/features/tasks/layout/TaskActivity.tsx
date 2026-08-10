import ActivityItem from "../components/ActivityItem"
import { mockActivities } from "../utils/mockActivities"

function TaskActivity() {
  return (
    <div className="p-4">
      {mockActivities.map(activity => <ActivityItem key={activity.id} activity={activity} />)}
    </div>
  )
}

export default TaskActivity