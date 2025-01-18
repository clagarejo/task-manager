import React from 'react';
import PropTypes from 'prop-types';
import './styles.css';
import { FaEdit } from 'react-icons/fa';

function Task({ task, handleEditTask }) {
    return (
        <li className="task-card">
            <div className="task-header">
                <FaEdit
                    className="edit-icon"
                    onClick={() => handleEditTask(task)}
                    title="Editar tarea"
                />
            </div>
            <p>
                <strong>{task.title}</strong> <br />
                {task.description}
            </p>
        </li>
    );
}

Task.propTypes = {
    task: PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        status: PropTypes.string,
    }).isRequired,
    handleEditTask: PropTypes.func.isRequired,
};

export default Task;
