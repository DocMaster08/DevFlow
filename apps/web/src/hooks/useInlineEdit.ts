import { useEffect, useRef, useState } from "react";

export const useInlineEdit = <T extends HTMLInputElement | HTMLTextAreaElement>(initialValue: string) => {
    const [editing, setEditing] = useState(false);
    const [draft, setDraft] = useState(initialValue);

    const inputRef = useRef<T>(null);

    useEffect(() => {
        if (editing && inputRef.current) {
            inputRef.current.focus();
            inputRef.current.select();
        }
    }, [editing]);

    useEffect(() => {
        if (!editing) setDraft(initialValue);
    }, [initialValue]);

    function startEditing() {
        setEditing(true)
    }

    function cancelEditing() {
        setEditing(false)
        setDraft(initialValue)
    }

    function stopEditing() {
        setEditing(false)
    }

    return {
        editing,
        inputRef,
        draft,
        setDraft,
        startEditing,
        cancelEditing,
        stopEditing
    }
}