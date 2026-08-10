export const taskStatusEnum = ["TODO", "IN_PROGRESS", "DONE"]
export const taskPriorityEnum = ["LOW", "MEDIUM", "HIGH"]

export type TaskStatus = typeof taskStatusEnum[number];
export type TaskPriority = typeof taskPriorityEnum[number];

export type Task = {
    id: string;
    title: string;
    description?: string;
    status: TaskStatus;
    priority: TaskPriority;
    dueDate?: string;
    projectId: string;
    createdAt: string;
    updatedAt: string;
}