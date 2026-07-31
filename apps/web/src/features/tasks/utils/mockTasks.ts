import type { Task } from "@/types/task";

export const mockTasks: Task[] = [
    {
        id: "1",
        title: "Finish React lesson",
        status: "todo",
        priority: "high",
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: "2",
        title: "Build FocusFlow",
        status: "in-progress",
        priority: "medium",
        createdAt: new Date(),
        updatedAt: new Date(),
    }
];