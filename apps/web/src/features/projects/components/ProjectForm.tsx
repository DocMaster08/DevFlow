import {
    Field,
    FieldDescription,
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
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { bgColors, colors } from "../utils/mockColors"

function ProjectForm() {
    return (
        <FieldSet>
            <FieldLegend>Create New Project</FieldLegend>
            <FieldDescription>This is where you manage your tasks.</FieldDescription>
            <FieldGroup>
                <Field>
                    <FieldLabel htmlFor="name">Project name</FieldLabel>
                    <Input id="name" autoComplete="off" placeholder="DevFlow" />
                </Field>
                <Field>
                    <FieldLabel htmlFor="description">Description</FieldLabel>
                    <Textarea id="description" />
                </Field>
                <Field>
                    <FieldLabel htmlFor="color">Project Color</FieldLabel>
                    <FieldDescription>Choose a unique color to quickly spot your project.</FieldDescription>
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button variant="outline">Open Popover</Button>
                        </PopoverTrigger>
                        <PopoverContent>
                                <div className="grid grid-cols-4">
                                    {bgColors.map(color => <div className={`w-4 h-4 border ${color}`}></div>)}
                                </div>
                        </PopoverContent>
                    </Popover>
                </Field>
            </FieldGroup>
        </FieldSet>
    )
}

export default ProjectForm