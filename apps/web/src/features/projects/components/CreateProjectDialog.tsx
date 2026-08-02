import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Plus } from "lucide-react"
import ProjectForm from "./ProjectForm"

function CreateProjectDialog() {
    return (
        <Dialog>
            <form>
                <DialogTrigger asChild>
                    <Button ><Plus /> New Project</Button>
                </DialogTrigger>
                <DialogContent>
                    
                    <ProjectForm/>

                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">Close</Button>
                        </DialogClose>
                        <Button>Submit</Button>
                    </DialogFooter>
                </DialogContent>
            </form>
        </Dialog>
    )
}

export default CreateProjectDialog