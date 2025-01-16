import { FaTrashAlt, FaEdit } from "react-icons/fa";
import {useTaskStore} from "@/store/useTaskStore";
import "./styles.css";

function Tasks({ task, onEdit }) {
    const { deleteTask } = useTaskStore();

    const handleDelete = () => {
        deleteTask(task.id);
    };

    return (
        <li className="task-card">
            <div>
                <strong>{task.title}</strong>: <p>{task.description}</p>
            </div>
            <div>
                <button className="task-btn delete-btn" onClick={handleDelete}>
                    <FaTrashAlt />
                </button>
                <button className="task-btn edit-btn" onClick={() => onEdit(task)}>
                    <FaEdit />
                </button>
            </div>
        </li>
    );
}

export default Tasks;
