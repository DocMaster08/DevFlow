export const taskKeys = {
    byProject: (projectId: string) => ["tasks", "project", projectId] as const,

    byId: (id: string) => ["tasks", id] as const
}

export const activityKeys = {
    byTask: (taskId:string) => ["activities", "task", taskId] as const,
}

export const commentKeys = {
    byTask: (taskId:string) => ["comments", "task", taskId] as const
}