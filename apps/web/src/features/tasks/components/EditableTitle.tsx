import { Input } from "@/components/ui/input";
import { useUpdateTask } from "../hooks/useUpdateTask";
import { toast } from "sonner";
import { Edit } from "lucide-react";
import { useInlineEdit } from "@/hooks/useInlineEdit";

interface EditableTitleProps {
  taskId: string;
  title: string;
}

function EditableTitle({ taskId, title }: EditableTitleProps) {
  const inline = useInlineEdit<HTMLInputElement>(title)

  const updateTaskMutation = useUpdateTask(taskId);

  function saveTask() {
    if (updateTaskMutation.isPending) return;

    const newTitle = inline.draft.trim();

    if (newTitle === title) {
      inline.stopEditing();
      return;
    }

    if (newTitle.length < 3) {
      toast.error("Title must contain at least 3 characters");
      return;
    }

    updateTaskMutation.mutate(
      { title: newTitle },
      {
        onSuccess() {
          inline.stopEditing();
        },
      },
    );
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      saveTask();
    } else if (e.key === "Escape") {
      inline.cancelEditing()
    }
  }

  return (
    <div>
      {inline.editing ? (
        <Input
          ref={inline.inputRef}
          className="w-fit"
          value={inline.draft}
          onChange={(e) => inline.setDraft(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={saveTask}
        />
      ) : (
        <button className="text-xl font-semibold flex items-center gap-2"
          onClick={() => {
            inline.startEditing();
          }}
        >
          {title}
          <Edit size={18} color="orange" strokeOpacity={0.8} />
        </button>
      )}
    </div>
  );
}

export default EditableTitle;
