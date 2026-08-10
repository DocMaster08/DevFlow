import type { Activity, ActivityField } from "@/types/activity"
import { formatDatetime, formatDueDate } from "@/utils/formatDate"

interface ActivityItemProps {
    activity: Activity
}

const colors = { "UPDATED": "text-orange-300", "CLEARED": "text-red-300" }

function ActivityItem({ activity }: ActivityItemProps) {
    const formatActivityValue = (
        field: ActivityField,
        value: string | null
    ) => {
        if (value === null) return null

        if (field === "DUE_DATE") {
            return formatDueDate(value)
        }

        if (field === "STATUS" || field === "PRIORITY") {
            return value.toLowerCase().replace("_", " ")
        }

        return value
    }
    const oldValue = formatActivityValue(activity.field, activity.oldValue)
    const newValue = formatActivityValue(activity.field, activity.newValue)
    const field = activity.field.replace('_', ' ')
    return (
        <div>
            <div className="text-primary flex gap-4">
                <p className={colors[activity.type]}>● {activity.type}</p>
                <p>{formatDatetime(activity.createdAt)}</p>
            </div>
            <div className="py-2 px-8 border-l-2 ml-1">
                {
                    newValue ?
                        <p>Changed {field} from <span className="text-red-400">{oldValue ?? "No " + field.toLowerCase()}</span> to <span className="text-green-400">{newValue}</span></p>
                        :
                        <p>Cleared {field} from its previous value <span className="text-red-400">{oldValue}</span></p>
                }
            </div>
        </div>
    )
}

export default ActivityItem