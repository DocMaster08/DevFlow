import { useEffect, useRef, useState } from "react";
import { useUpdateTask } from "../hooks/useUpdateTask";
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";
import { Edit } from "lucide-react";

interface EditableDescriptionProps {
  taskId: string;
  description: string;
}

function EditableDescription({ taskId, description }: EditableDescriptionProps) {
  const [editing, setEditing] = useState(false);
  const [draftDescription, setDraftDescription] = useState(description);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (editing && inputRef.current) {
      inputRef.current.focus();
      // Optional: select all text on focus
      inputRef.current.select();
    }
  }, [editing]);

  useEffect(() => {
    setDraftDescription(description);
  }, [description]);

  const updateTaskMutation = useUpdateTask(taskId);

  function saveTask() {
    if (updateTaskMutation.isPending) return;

    const newDescription = draftDescription.trim();

    if (newDescription === description) {
      setEditing(false);
      return;
    }

    if (newDescription.length > 0 && newDescription.length < 3) {
      toast.error("Description must contain at least 3 characters");
      return;
    }

    updateTaskMutation.mutate(
      { description: newDescription },
      {
        onSuccess() {
          setEditing(false);
        },
      },
    );
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter") {
      saveTask();
    } else if (e.key === "Escape") {
      setEditing(false);
      setDraftDescription(description);
    }
  }

  return (
    <div>
      {editing ? (
        <Textarea
          ref={inputRef}
          className="w-fit"
          value={draftDescription}
          onChange={(e) => setDraftDescription(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={saveTask}
        />
      ) : (
        <button
        className="text-primary text-left"
          onClick={() => {
            setEditing(true);
          }}
        >
          <p className="max-w-2/3">
            {description}
            <span className="inline-flex items-center align-middle ml-1">
              <Edit size={14} />
            </span>
          </p>
          
        </button>
      )}
    </div>
  );
}

export default EditableDescription;
