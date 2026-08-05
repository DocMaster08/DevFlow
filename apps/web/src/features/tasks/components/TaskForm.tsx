import { Controller, useForm } from "react-hook-form";
import { createTaskSchema, type createTaskDTO } from "../schemas/createTask.schema"
import { zodResolver } from "@hookform/resolvers/zod";
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel, FieldLegend, FieldSet } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { DialogClose } from "@/components/ui/dialog";
import InputField from "@/components/common/InputField";
import TextareaField from "@/components/common/TextareaField";
import SelectField from "@/components/common/SelectField";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { taskPriorityEnum } from "@/types/task";
import { datetimeToString } from "../utils/datetimeToString";
import { CalendarWithTime } from "@/components/common/CalenderWithTime";
import CalendarWithTimeField from "@/components/common/CalendarWithTimeField";

interface TaskFormProps {
    onSubmit: (data: createTaskDTO) => void
    isSubmitting: boolean
}

function TaskForm({ onSubmit, isSubmitting }: TaskFormProps) {
    const form = useForm<createTaskDTO>({
        resolver: zodResolver(createTaskSchema),
        defaultValues: {
            title: "",
            priority: "MEDIUM"
        }

    });

    const selectItems = taskPriorityEnum.map((value) => { return { label: value.toLowerCase(), value } })

    return (
        <form onSubmit={form.handleSubmit(onSubmit, (errors) => console.log(errors))}>
            <FieldSet>
                <FieldLegend>Create New Task</FieldLegend>
                <FieldDescription>Add a new task to your project.</FieldDescription>
                <FieldGroup>
                    <InputField form={form} name="title" placeholder="Task title..." />

                    <TextareaField form={form} name="description" placeholder="Task description..." />

                    <SelectField form={form} name="priority" placeholder="Priority" selectItems={selectItems} />

                    <CalendarWithTimeField form={form} name="dueDate" placeholder="Task Due Date"/>

                    <Field orientation="horizontal">
                        <Button type="submit" disabled={isSubmitting}>
                            {
                                isSubmitting
                                    ? <><Spinner /> Creating...</>
                                    : "Create Task"
                            }
                        </Button>
                        <DialogClose asChild>
                            <Button variant="outline" type="button">Cancel</Button>
                        </DialogClose>
                    </Field>
                </FieldGroup>
            </FieldSet>
        </form>
    )
}

export default TaskForm