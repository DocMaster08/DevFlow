import { useForm } from "react-hook-form";
import {
  createTaskSchema,
  type createTaskDTO,
} from "../schemas/createTask.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { DialogClose } from "@/components/ui/dialog";
import InputField from "@/components/common/InputField";
import TextareaField from "@/components/common/TextareaField";
import SelectField from "@/components/common/SelectField";
import CalendarWithTimeField from "@/components/common/CalendarWithTimeField";
import { priorityItems } from "../utils/selectItems";

interface TaskFormProps {
  onSubmit: (data: createTaskDTO) => void;
  isSubmitting: boolean;
}

function TaskForm({ onSubmit, isSubmitting }: TaskFormProps) {
  const form = useForm<createTaskDTO>({
    resolver: zodResolver(createTaskSchema),
    defaultValues: {
      title: "",
      priority: "MEDIUM",
    },
  });

  

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit, (errors) => console.log(errors))}
    >
      <FieldSet>
        <FieldLegend>Create New Task</FieldLegend>
        <FieldDescription>Add a new task to your project.</FieldDescription>
        <FieldGroup>
          <InputField form={form} name="title" placeholder="Task title..." />

          <TextareaField
            form={form}
            name="description"
            placeholder="Task description..."
          />

          <SelectField
            form={form}
            name="priority"
            placeholder="Priority"
            selectItems={priorityItems}
          />

          <CalendarWithTimeField
            form={form}
            name="dueDate"
            placeholder="Task Due Date"
          />

          <Field orientation="horizontal">
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Spinner /> Creating...
                </>
              ) : (
                "Create Task"
              )}
            </Button>
            <DialogClose asChild>
              <Button variant="outline" type="button">
                Cancel
              </Button>
            </DialogClose>
          </Field>
        </FieldGroup>
      </FieldSet>
    </form>
  );
}

export default TaskForm;
