import { taskPriorityEnum, taskStatusEnum } from "@/types/task";

export const priorityItems = taskPriorityEnum.map((value) => {
    return { label: value.toLowerCase(), value };
});

export const statusItems = taskStatusEnum.map((value) => {
    return { label: value.toLowerCase().replace("_"," "), value };
});