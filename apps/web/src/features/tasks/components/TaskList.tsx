import type { Task } from "@/types/task"
import { groupTasks } from "../utils/groupTasks"
import TaskCard from "./TaskCard"

interface TaskListProps {
    tasks: Task[]
}
function TaskList({ tasks }: TaskListProps) {
    const groupedTasks = groupTasks(tasks)



    return (
        <div className="flex flex-col gap-10">
            {Object.keys(groupedTasks).map((status) =>
                <div key={status} className="">
                    <h2 className="font-semibold ">{status}</h2>
                    <div className="flex flex-col gap-4 p-4">
                        {groupedTasks[status].map((task: Task) => <TaskCard key={task.id} task={task}/>)}
                    </div>
                </div>
            )}
        </div>
    )
}

export default TaskList