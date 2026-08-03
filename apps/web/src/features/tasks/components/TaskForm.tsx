import { useForm } from "react-hook-form";
import { createTaskSchema, type createTaskDTO } from "../schemas/createTask.schema"
import { zodResolver } from "@hookform/resolvers/zod";
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel, FieldLegend, FieldSet } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { CalendarWithTimezone } from "@/components/common/CalenderWithTimezone";
import { Spinner } from "@/components/ui/spinner";
import { DialogClose } from "@/components/ui/dialog";

interface TaskFormProps {
    onSubmit: (data: createTaskDTO) => void
    isSubmitting: boolean
}

function TaskForm({ onSubmit, isSubmitting }: TaskFormProps) {
    const form = useForm<createTaskDTO>({
        resolver: zodResolver(createTaskSchema),
        defaultValues: {
            title: "",
            description: "",
            priority: "",
            dueDate: null
        },
    });

    return (
        <form onSubmit={form.handleSubmit(onSubmit)}>
            <FieldSet>
                <FieldLegend>Create New Task</FieldLegend>
                <FieldDescription>Add a new task to your project.</FieldDescription>
                <FieldGroup>
                    <Field>
                        <FieldLabel htmlFor="title">Title</FieldLabel>
                        <Input {...form.register("title")} id="title" placeholder="Task title..." />
                        {
                            form.formState.errors.title && <FieldError>{form.formState.errors.title.message}</FieldError>
                        }
                    </Field>
                    <Field>
                        <FieldLabel htmlFor="description">Description</FieldLabel>
                        <Textarea {...form.register("description")} id="description" />
                    </Field>
                    <Field>
                        <FieldLabel htmlFor="priority">Priority</FieldLabel>
                        <Select>
                            <SelectTrigger className="w-45" id="priority">
                                <SelectValue placeholder="Priority" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup  {...form.register("priority")}>
                                    <SelectItem value="LOW">low</SelectItem>
                                    <SelectItem value="MEDIUM">medium</SelectItem>
                                    <SelectItem value="HIGH">high</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </Field>
                    <Field>
                        <FieldLabel htmlFor="dueDate">dueDate</FieldLabel>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button variant="outline">Choose Date</Button>
                            </PopoverTrigger>
                            <PopoverContent>
                                <CalendarWithTimezone {...form.register("dueDate")}/>
                            </PopoverContent>
                        </Popover>
                    </Field>
                     <Field orientation="horizontal">
                        <Button type="submit" disabled={isSubmitting}>
                            {
                                isSubmitting
                                    ? <><Spinner/> Creating...</>
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