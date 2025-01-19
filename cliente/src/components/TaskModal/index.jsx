import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './styles.css';
import Swal from 'sweetalert2';

const TaskModal = ({ isOpen, onClose, task, onSave, onDelete, currentStatus }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState(currentStatus);

    useEffect(() => {
        if (task) {
            setTitle(task.title);
            setDescription(task.description);
            setStatus(task.status);
        } else {
            setTitle('');
            setDescription('');
            setStatus(currentStatus);
        }
    }, [task, currentStatus]);

    const handleSave = () => {
        if (!title || !description || !status) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Todos los campos son requeridos.',
            });
            return;
        }
        const updatedTask = { title, description, status };
        onSave(updatedTask);
    };

    const handleDelete = () => {
        if (task) {
            onDelete(task.id);
        }
    };

    const getColumnOptions = () => {
        const allStatuses = ['Backlog', 'ToDo', 'InProgress', 'Done'];
        return allStatuses.filter((option) => option.toLowerCase() !== status.toLowerCase());
    };

    return (
        isOpen && (
            <div className="modal-overlay">
                <div className="modal-content">
                    <button className="close-btn" onClick={onClose}>
                        X
                    </button>
                    <h2>{task ? 'Editar tarea' : 'Agregar nueva tarea'}</h2>

                    <div className="modal-body">
                        <label>
                            Título:
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="Título"
                                style={{ width: '100%' }}
                            />
                        </label>
                        <label>
                            Descripción:
                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Descripción"
                                style={{ width: '100%' }}
                            />
                        </label>

                        {task && (
                            <label>
                                Estado:
                                <select
                                    value={status}
                                    onChange={(e) => setStatus(e.target.value)}
                                    style={{ width: '105%' }}
                                >
                                    <option value="">{status}</option>
                                    {getColumnOptions().map((option) => (
                                        <option key={option} value={option}>
                                            {option}
                                        </option>
                                    ))}
                                </select>
                            </label>
                        )}
                    </div>

                    <div className="modal-footer">
                        {task && (
                            <button className="delete-btn" onClick={handleDelete}>
                                Eliminar tarea
                            </button>
                        )}
                        <button
                            className="save-btn"
                            onClick={handleSave}
                        >
                            {task ? 'Guardar cambios' : 'Agregar nueva tarea'}
                        </button>
                    </div>
                </div>
            </div>
        )
    );
};

TaskModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    task: PropTypes.object,
    onSave: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    currentStatus: PropTypes.string.isRequired,
};

export default TaskModal;
