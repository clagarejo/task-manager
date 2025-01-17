import './styles.css';
import { FaEdit } from 'react-icons/fa';

function Tasks({ task, handleEditTask }) {
    return (
        <li className="task-card">
            <div className="task-header">
                <FaEdit className="edit-icon" onClick={() => handleEditTask(task)} />
            </div>
            <p>
                <strong>{task.title}</strong> <br />
                {task.description}
            </p>
        </li>
    );
}

export default Tasks;
