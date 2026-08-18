import { Button } from "@/components/ui/button"
import { useCreateTask } from "../hooks/useCreateTask"
import type { CreateTaskDTO } from "../schemas/createTask.schema"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Plus } from "lucide-react"
import TaskForm from "./TaskForm"
import { useState } from "react"

interface CreateTaskDialogProps {
  projectId: string
}

function CreateTaskDialog({projectId}:CreateTaskDialogProps) {
  
    const createTaskMutation = useCreateTask(projectId)

    function handleSubmit (data:CreateTaskDTO){
      createTaskMutation.mutate(data, {
        onSuccess(){
          setOpen(false)
        }
      })
    }

    const [open, setOpen] = useState(false)

  return (
     <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button ><Plus /> New Task</Button>
            </DialogTrigger>
            <DialogContent>

                <TaskForm onSubmit={ handleSubmit} isSubmitting={createTaskMutation.isPending}/>

            </DialogContent>

        </Dialog>
  )
}

export default CreateTaskDialog