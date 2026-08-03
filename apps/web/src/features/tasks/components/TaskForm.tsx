import { Controller, useForm } from "react-hook-form";
import { createTaskSchema, type createTaskDTO } from "../schemas/createTask.schema"
import { zodResolver } from "@hookform/resolvers/zod";
import { Field, FieldContent, FieldDescription, FieldError, FieldGroup, FieldLabel, FieldLegend, FieldSet } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { CalendarWithTime } from "@/components/common/CalenderWithTime";
import { Spinner } from "@/components/ui/spinner";
import { DialogClose } from "@/components/ui/dialog";
import { datetimeToString } from "../utils/datetimeToString";

interface TaskFormProps {
    onSubmit: (data: createTaskDTO) => void
    isSubmitting: boolean
}

function TaskForm({ onSubmit, isSubmitting }: TaskFormProps) {
    const form = useForm<createTaskDTO>({
        resolver: zodResolver(createTaskSchema),

    });

    return (
        <form onSubmit={form.handleSubmit(onSubmit, (errors) => console.log(errors))}>
            <FieldSet>
                <FieldLegend>Create New Task</FieldLegend>
                <FieldDescription>Add a new task to your project.</FieldDescription>
                <FieldGroup>
                    <Controller
                        name="title"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor={field.name}>Title</FieldLabel>
                                <Input
                                    {...field}
                                    id={field.name}
                                    aria-invalid={fieldState.invalid}
                                    placeholder="Task title..."
                                    autoComplete="off"
                                />
                                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                            </Field>
                        )}
                    />

                    <Controller
                        name="description"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor={field.name}>Description</FieldLabel>
                                <Textarea
                                    {...field}
                                    id={field.name}
                                    aria-invalid={fieldState.invalid}
                                    placeholder="Describe your task..."
                                    autoComplete="off"
                                />
                                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                            </Field>
                        )}
                    />

                    <Controller
                        name="priority"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field orientation="responsive" data-invalid={fieldState.invalid}>

                                <FieldLabel htmlFor="priority">
                                    Priority
                                </FieldLabel>

                                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}

                                <Select
                                    name={field.name}
                                    value={field.value}
                                    onValueChange={field.onChange}
                                >
                                    <SelectTrigger
                                        id="priority"
                                        aria-invalid={fieldState.invalid}
                                        className="min-w-30"
                                    >
                                        <SelectValue placeholder="Priority" />
                                    </SelectTrigger>
                                    <SelectContent position="item-aligned">
                                        <SelectItem value="LOW">Low</SelectItem>
                                        <SelectItem value="MEDIUM">Medium</SelectItem>
                                        <SelectItem value="HIGH">High</SelectItem>
                                    </SelectContent>
                                </Select>
                            </Field>
                        )}
                    />

                    <Controller
                        name="dueDate"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field orientation="responsive" data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor="dueDate">Due Date</FieldLabel>

                                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}

                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button variant="outline">{ field.value?datetimeToString(field.value):"Select Date"}</Button>
                                    </PopoverTrigger>
                                    <PopoverContent>
                                        <CalendarWithTime value={field.value} onChange={field.onChange}/>
                                    </PopoverContent>
                                </Popover>
                            </Field>
                        )}
                    />

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