import { Input } from "@/components/ui/input"
import { useEffect, useRef, useState, type BaseSyntheticEvent, type SyntheticEvent } from "react"
import { useUpdateTask } from "../hooks/useUpdateTask"

interface EditableTitleProps {
    taskId: string
    title: string
}

function EditableTitle({ taskId, title }: EditableTitleProps) {
    const [editing, setEditing] = useState(false)
    const [draftTitle, setDraftTitle] = useState(title)
    const inputRef = useRef(null);

    useEffect(() => {
        if (editing && inputRef.current) {
            inputRef.current.focus();
            // Optional: select all text on focus
            inputRef.current.select();
        }
    }, [editing]);

    const updateTaskMutation = useUpdateTask(taskId)

    function saveTask() {
        setEditing(false)
        if (title === draftTitle.trim()) return
        updateTaskMutation.mutate({ title: draftTitle })

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