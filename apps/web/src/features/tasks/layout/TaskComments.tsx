import { Spinner } from "@/components/ui/spinner";
import { useTaskComments } from "../hooks/useTaskComments"
import CommentItem from "../components/CommentItem";
import CommentForm from "../components/CommentForm";

interface TaskCommentsProps {
    taskId: string
}

function TaskComments({ taskId }: TaskCommentsProps) {
    const { data: comments, isLoading, isError } = useTaskComments(taskId);

    if (isLoading) {
        return <Spinner />
    }
    if (isError) {
        return <h1>Failed to load comments</h1>
    }

    return (
        <div className="p-4">
            <p className="font-semibold text-xl p-2 border-b-4 border-accent w-md mb-4">Comments</p>
            <CommentForm taskId={taskId} />
            <div className="flex flex-col gap-4">
                {comments.map(comment => <CommentItem key={comment.id} comment={comment} />)}
            </div>
        </div>
    )
}

export default TaskComments