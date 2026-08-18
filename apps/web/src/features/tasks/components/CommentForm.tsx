import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { SmilePlus } from "lucide-react"
import { useState } from "react"
import { useCreateTaskComment } from "../hooks/useCreateTaskComment"
import { Field, FieldError } from "@/components/ui/field"

interface CommentFormProps {
    taskId: string
}

function CommentForm({ taskId }: CommentFormProps) {
    const [commentInput, setCommentInput] = useState("")
    const [error, setError] = useState(null)

    const createCommentMutation = useCreateTaskComment(taskId)

    function handleSubmit() {
        const newComment = commentInput.trim()
        
        if (newComment.length === 0) {
            setError("Comment cannot be empty")
            return
        }
        if (newComment.length > 1000) {
            setError("Comment Is too large")
            return
        }

        createCommentMutation.mutate({
            content: newComment
        })
    }

    function cancelCommenting() {
        setCommentInput("")
    }

    function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
        if (e.key === "Enter" && e.ctrlKey) {
            handleSubmit()
        } else if (e.key === "Escape") {
            cancelCommenting()
        }
    }

    return (
        <Field className="p-4" data-invalid={error != null}>
            <Input onKeyDown={handleKeyDown} value={commentInput} onChange={(e) => { setCommentInput(e.target.value); setError(null) }} aria-invalid={error != null} placeholder="Add a comment..." />
            <FieldError>{error}</FieldError>
            <div className="flex items-center justify-between">
                <div className="p-2 rounded-full hover:bg-muted">
                    <SmilePlus size={20} />
                </div>
                <div className="flex gap-2">
                    <Button onClick={cancelCommenting} variant="ghost">Cancel</Button>
                    <Button disabled={commentInput.length === 0 || commentInput.length > 1000} onClick={handleSubmit}>Submit</Button>
                </div>
            </div>
        </Field>
    )
}

export default CommentForm