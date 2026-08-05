import {
    Field,
    FieldDescription,
    FieldError,
    FieldGroup,
    FieldLabel,
    FieldLegend,
    FieldSet,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { projectColors } from "../utils/mockColors"
import { DialogClose } from "@/components/ui/dialog"
import { createProjectSchema, type CreateProjectDTO } from "../schemas/createProject.schema"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Spinner } from "@/components/ui/spinner"
import InputField from "@/components/common/InputField"
import TextareaField from "@/components/common/TextareaField"

interface ProjectFormProps {
    onSubmit: (data: CreateProjectDTO) => void
    isSubmitting: boolean
}


function ProjectForm({ onSubmit, isSubmitting }: ProjectFormProps) {
    const form = useForm<CreateProjectDTO>({
        resolver: zodResolver(createProjectSchema),
        defaultValues: {
            name: "",
            description: "",
            color: "blue",
            icon: "folder",
        },
    });

    return (
        <form onSubmit={form.handleSubmit(onSubmit)}>
            <FieldSet>
                <FieldLegend>Create New Project</FieldLegend>
                <FieldDescription>This is where you manage your tasks.</FieldDescription>
                <FieldGroup>
                    <InputField form={form} name="name" placeholder="Project Name..." />

                    <TextareaField form={form} name="description" placeholder="Project Description..."/>

                    <Field>
                        <FieldLabel htmlFor="color">Project Color</FieldLabel>
                        <FieldDescription>Choose a unique color to quickly spot your project.</FieldDescription>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button variant="outline">Select Color</Button>
                            </PopoverTrigger>
                            <PopoverContent>
                                <div className="grid grid-cols-4">
                                    {projectColors.map(color => <div key={color.name} className={`w-4 h-4 border ${color.className}`}></div>)}
                                </div>
                            </PopoverContent>
                        </Popover>
                    </Field>

                    <Field orientation="horizontal">
                        <Button type="submit" disabled={isSubmitting}>
                            {
                                isSubmitting
                                    ? <><Spinner /> Creating...</>
                                    : "Create Project"
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

export default ProjectForm


