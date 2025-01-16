import React, { useState, useEffect } from "react";
import { useTaskStore } from "@/store/useTaskStore";
import "./styles.css";

const TaskForm = ({ editingTask, setEditingTask }) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const { addTask, updateTask } = useTaskStore();

    useEffect(() => {
        if (editingTask) {
            setTitle(editingTask.title);
            setDescription(editingTask.description);
        } else {
            setTitle("");
            setDescription("");
        }
    }, [editingTask]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (title.trim() && description.trim()) {
            if (editingTask) {
                updateTask({ ...editingTask, title, description });
               
            } else {
                addTask({ title, description });
            }
            setTitle("");
            setDescription("");
            setEditingTask("")
        }
    };

    return (
        <form onSubmit={handleSubmit} className="task-form" role="form">
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Título"
                className="task-input"
            />
            <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Descripción"
                className="task-textarea"
            />
            <button type="submit" className="task-button">
                {editingTask ? "Actualizar tarea" : "Agregar tarea"}
            </button>
        </form>
    );
};

export default TaskForm;
