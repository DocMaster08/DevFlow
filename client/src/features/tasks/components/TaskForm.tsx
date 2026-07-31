import { useState } from "react"

interface TaskFormProps {
    onCreateTask: (title: string) => void;
}

function TaskForm({ onCreateTask }: TaskFormProps) {
    const [title, setTitle] = useState('')

    function handleSubmit(e: React.FormEvent) {
        
        e.preventDefault();

        if (title.trim().length < 3) return;

        onCreateTask(title);

        setTitle("");
    }

    return (
        <form onSubmit={handleSubmit}>
            <input className="bg-gray-200" value={title} onChange={(e) => setTitle(e.target.value)} />
            <button>Create</button>
        </form>
    )
}

export default TaskForm