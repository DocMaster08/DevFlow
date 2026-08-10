import type { Activity } from "@/types/activity"

interface ActivityItemProps {
    activity: Activity
}

const colors = { "CREATE": "text-green-400", "UPDATE": "text-orange-400", "DELETE": "text-red-400" }

function ActivityItem({ activity }: ActivityItemProps) {
    return (
        <div className="">
            <div className="text-primary flex gap-4">
                <p className={colors[activity.type]}>● {activity.type}</p>
                <p>{activity.createdAt}</p>
            </div>
            <div className="py-2 px-8 border-l-2 ml-1">
                <p>{activity.description}</p>
            </div>
        </div>
    )
}

export default ActivityItem