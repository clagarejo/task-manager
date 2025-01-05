import React from 'react';

import './styles.css'

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

        handleAddOrUpdateTask({ title: newTitle, description: newDescription });
    };

    return (
        <form onSubmit={handleSubmit} className="task-form">
            <input
                type="text"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="Título de la tarea"
                className="task-input"
            />
            <textarea
                value={newDescription}
                onChange={(e) => setNewDescription(e.target.value)}
                placeholder="Descripción de la tarea"
                className="task-textarea"
            />
            <button type="submit" className="task-button">
                {editingTask ? "Actualizar tarea" : "Agregar tarea"}
            </button>
        </form>
    );
};

export default TaskForm;
