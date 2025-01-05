import React, { useState } from 'react';

const TaskForm = ({ onAddTask }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!title || !description) {
            setError('Todos los campos son requeridos');
            return;
        }

        onAddTask({ title, description });
        setTitle('');
        setDescription('');
        setError('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="task-form-input">
                <label htmlFor="title">Título</label>
                <input
                    id="title"
                    type="text"
                    placeholder='Título'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="description">Descripción</label>
                <input
                    id="description"
                    type="text"
                    value={description}
                    placeholder='Descripción'
                    onChange={(e) => setDescription(e.target.value)}

                />
            </div>
            <button type="submit">Agregar tarea</button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </form>
    );
};

export default TaskForm;
