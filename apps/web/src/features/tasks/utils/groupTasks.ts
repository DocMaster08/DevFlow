import {  type Task } from "@/types/task";

export function groupTasks(tasks: Task[]) {
    const group = {}

    tasks.forEach((task) => {
        task.status in group
            ?
            group[task.status] = [...group[task.status], task]
            :
            group[task.status] = [task]
    })

    return group    

}