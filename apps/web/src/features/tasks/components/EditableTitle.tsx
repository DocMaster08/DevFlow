import { Input } from "@/components/ui/input"
import { useEffect, useRef, useState } from "react"
import { useUpdateTask } from "../hooks/useUpdateTask"
import { toast } from "sonner"

interface EditableTitleProps {
    taskId: string
    title: string
}

function EditableTitle({ taskId, title }: EditableTitleProps) {
    const [editing, setEditing] = useState(false)
    const [draftTitle, setDraftTitle] = useState(title)
    const inputRef = useRef<HTMLInputElement>(null);


    useEffect(() => {
        if (editing && inputRef.current) {
            inputRef.current.focus();
            // Optional: select all text on focus
            inputRef.current.select();
        }
    }, [editing]);

    useEffect(() => {
        setDraftTitle(title)
    }, [title])

    const updateTaskMutation = useUpdateTask(taskId)

    function saveTask() {
        if (updateTaskMutation.isPending) return;

        const newTitle = draftTitle.trim()

        if (newTitle === title) {
            setEditing(false)
            return
        }

        if (newTitle.length < 3) {
            toast.error("Title must contain at least 3 characters")
            return
        }

        updateTaskMutation.mutate(
            { title: newTitle },
            {
                onSuccess() {
                    setEditing(false)
                }
            }
        )

    }

    function handleKeyDown(e) {
        if (e.key === "Enter") {
            saveTask()
        }
        else if (e.key === "Escape") {
            setEditing(false)
            setDraftTitle(title)
        }
    }

    return (
        <div>
            {
                editing ?
                    <Input ref={inputRef} className="w-md" value={draftTitle} onChange={(e) => setDraftTitle(e.target.value)} onKeyDown={handleKeyDown} onBlur={saveTask} />
                    :
                    <button onClick={() => { setEditing(true) }} className="text-lg">{title}</button>
            }
        </div>
    )
}

export default EditableTitle