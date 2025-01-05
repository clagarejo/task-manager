import { FaTrashAlt } from 'react-icons/fa';

export default function Tasks({ task, handleDeleteTask }) {
    return (
        <li className="task-card">
            <div>
                <strong>{task.title}</strong>: <p>{task.description}</p>
            </div>
            <div>
                <button className="delete-btn" onClick={() => handleDeleteTask(task.id)}>
                    <FaTrashAlt />
                </button>
            </div>
        </li>
    );
}
