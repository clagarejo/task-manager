import React from 'react';
import './styles.css';

const TaskForm = ({
    handleAddOrUpdateTask,
    editingTask,
    newTitle,
    newDescription,
    setNewTitle,
    setNewDescription
}) => {
    const handleSubmit = (e) => {
        e.preventDefault();

        if (newTitle.trim() && newDescription.trim()) { // Asegúrate de que los campos no estén vacíos
            handleAddOrUpdateTask({ title: newTitle, description: newDescription });
        } 
    };

    return (
        <form onSubmit={handleSubmit} className="task-form">
            <input
                type="text"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="Título"
                className="task-input"
            />
            <textarea
                value={newDescription}
                onChange={(e) => setNewDescription(e.target.value)}
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
