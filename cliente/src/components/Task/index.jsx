import { FaTrashAlt, FaEdit } from 'react-icons/fa';

import './styles.css'

function Tasks({ task, handleDeleteTask, handleEditTask }) {
    return (
        <li className="task-card">
            <div>
                <strong>{task.title}</strong>: <p>{task.description}</p>
            </div>
            <div>
                <button className="task-btn delete-btn" onClick={() => handleDeleteTask(task.id)}>
                    <FaTrashAlt />
                </button>
                <button className="task-btn edit-btn" onClick={() => handleEditTask(task)}>
                    <FaEdit />
                </button>
            </div>

        </li>
    );
}

export default Tasks;
