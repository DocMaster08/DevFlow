import { useUpdateTask } from "../hooks/useUpdateTask";
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";
import { Edit } from "lucide-react";
import { useInlineEdit } from "@/hooks/useInlineEdit";

interface EditableDescriptionProps {
  taskId: string;
  description: string;
}

function EditableDescription({ taskId, description }: EditableDescriptionProps) {
  const inline = useInlineEdit<HTMLTextAreaElement>(description)

  const updateTaskMutation = useUpdateTask(taskId);

  function saveTask() {
    if (updateTaskMutation.isPending) return;

    const newDescription = inline.draft.trim() === ""?null: inline.draft.trim();

    if (newDescription === description) {
      inline.stopEditing()
      return;
    }

    if (newDescription && newDescription.length > 0 && newDescription.length < 3) {
      toast.error("Description must contain at least 3 characters");
      return;
    }

    updateTaskMutation.mutate(
      { description: newDescription },
      {
        onSuccess() {
          inline.stopEditing()
        },
      },
    );
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && e.ctrlKey) {
      saveTask();
    } else if (e.key === "Escape") {
      inline.cancelEditing()
    }
  }

  return (
    <div>
      {inline.editing ? (
        <Textarea
          ref={inline.inputRef}
          className="w-fit"
          value={inline.draft}
          onChange={(e) => inline.setDraft(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={saveTask}
        />
      ) : (
        <button
          className="text-primary text-left max-w-4/5"
          onClick={() => {
            inline.startEditing()
          }}
        >
          <p>
            {description || "No description"}
            <span className="inline-flex items-center align-middle ml-1">
              <Edit size={14} color="orange" strokeOpacity={0.8} />
            </span>
          </p>

        </button>
      )}
    </div>
  );
}

export default EditableDescription;
