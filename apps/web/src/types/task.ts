export const taskStatusEnum = ["TODO", "IN-PROGRESS", "DONE"]
export const taskPriorityEnum = ["LOW", "MEDIUM", "HIGH"]

export type TaskStatus = typeof taskStatusEnum[number];
export type TaskPriority = typeof taskPriorityEnum[number];

export interface Task {
    id: string;
    title: string;
    description?: string;
    status: TaskStatus;
    priority: TaskPriority;
    dueDate?: Date;
    projectId: string;
    createdAt: Date;
    updatedAt: Date;
}