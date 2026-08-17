import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import type { TaskComment } from "@/types/comment"
import { formatDatetime } from "@/utils/formatDate"
import { ThumbsDown, ThumbsUp } from "lucide-react"

interface CommentItemProps {
    comment: TaskComment
}

function CommentItem({ comment }: CommentItemProps) {
    return (
        <div className="flex gap-2">
            <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div>
                <div className="flex gap-2">
                    <p className="text-sm font-semibold">@DocLag123</p>
                    <p className="text-sm text-muted-foreground">{formatDatetime(comment.createdAt)}</p>
                </div>
                <p className="">{comment.content}</p>
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                        <ThumbsUp size={14} />
                        <p className="text-primary">0</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <ThumbsDown size={14} />
                        <p className="text-primary">0</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CommentItem