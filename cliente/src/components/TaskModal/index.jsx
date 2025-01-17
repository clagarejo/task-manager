import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './styles.css';

const TaskModal = ({ isOpen, onClose, onSave, onDelete, task, currentStatus }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState(currentStatus);

    useEffect(() => {
        if (task) {
            setTitle(task.title);
            setDescription(task.description);
            setStatus(task.status);
        }
    }, [task]);

    const getColumnOptions = () => {
        if (currentStatus === 'backlog') {
            return ['Selecciona una opción', 'To Do', 'In Progress', 'Done'];
        }
        if (currentStatus === 'todo') {
            return ['Selecciona una opción', 'Backlog', 'In Progress', 'Done'];
        }
        if (currentStatus === 'in-progress') {
            return ['Selecciona una opción', 'Backlog', 'To Do', 'Done'];
        }
        if (currentStatus === 'done') {
            return ['Selecciona una opción', 'Backlog', 'To Do', 'In Progress'];
        }
        return [];
    };

    const handleSave = () => {
        const updatedTask = {
            title,
            description,
            status,
        };
        onSave(updatedTask);
        onClose();
    };

    const isSaveDisabled = !title || !description;

    return (
        isOpen && (
            <div className="modal-overlay">
                <div className="modal-content">
                    <button className="close-btn" onClick={onClose}>
                        X
                    </button>
                    <h2>{task ? 'Edit Task' : 'Add New Task'}</h2>

                    <div className="modal-body">
                        <label>
                            Title:
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="Enter task title"
                                style={{ width: '100%' }}
                            />
                        </label>
                        <label>
                            Description:
                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Enter task description"
                                style={{ width: '100%' }}
                            />
                        </label>

                        {task && (
                            <label>
                                Move Task to:
                                <select
                                    value={status}
                                    onChange={(e) => setStatus(e.target.value)}
                                    style={{ width: '105%' }}
                                >
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
                            <button
                                className="delete-btn"
                                onClick={() => {
                                    onDelete(task);
                                    onClose();
                                }}
                            >
                                Delete Task
                            </button>
                        )}
                        <button
                            className="save-btn"
                            onClick={handleSave}
                            disabled={isSaveDisabled}
                        >
                            {task ? 'Save Changes' : 'Add New Task'}
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
    onSave: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    task: PropTypes.object,
    currentStatus: PropTypes.string.isRequired,
};

export default TaskModal;
