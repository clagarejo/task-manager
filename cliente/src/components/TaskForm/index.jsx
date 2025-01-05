import { useState } from "react";

function TaskForm({ onAddTask }) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!title || !description) {
            setError("Todos los campos son requeridos");
            return;
        }

        onAddTask({ title, description });
        setTitle("");
        setDescription("");
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="task-form-input">
                <label>Título</label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </div>

            <div>
                <label>Descripción</label>
                <input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </div>

            <button type="submit">Agregar tarea</button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </form>
    );
}

export default TaskForm;
