import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Plus } from "lucide-react"
import ProjectForm from "./ProjectForm"
import { useCreateProject } from "../hooks/useCreateProject"
import type { CreateProjectDTO } from "../schemas/createProject.schema"
import { useState } from "react"

function CreateProjectDialog() {

    const createProjectMutation = useCreateProject()

    function handleSubmit(
        data: CreateProjectDTO
    ) {
        createProjectMutation.mutate(data, {
            onSuccess() {
                setOpen(false)
            }
        });
    }

    const [open, setOpen] = useState(false);

    return (

        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button ><Plus /> New Project</Button>
            </DialogTrigger>
            <DialogContent>

                <ProjectForm onSubmit={handleSubmit} isSubmitting={createProjectMutation.isPending} />

            </DialogContent>

        </Dialog>
    )
}

export default CreateProjectDialog