export const taskKeys = {
    byProject: (projectId: string) => ["tasks", "project", projectId] as const,

    byId: (id: string) => ["tasks", id] as const
}