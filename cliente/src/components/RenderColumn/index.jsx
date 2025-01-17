import Tasks from "@/components/Task";
import PropTypes from "prop-types";
import { FaPlus } from "react-icons/fa";  // Importando el ícono de '+'
import './styles.css'

function RenderColumn({ title, tasks, filterStatus, loading, deleteTask, setEditingTask, onAddTask }) {
    const filteredTasks = tasks.filter((task) => task.status === filterStatus);

    return (
        <div className={`column ${filterStatus}`}>
            <section>
                <h2>{title}</h2>
                {loading ? (
                    <p>Loading...</p>
                ) : filteredTasks.length > 0 ? (
                    <ul>
                        {filteredTasks.map((task, index) => (
                            <Tasks
                                key={`${task.id}-${index}`}
                                task={task}
                                handleDeleteTask={deleteTask}
                                handleEditTask={setEditingTask}
                            />
                        ))}
                    </ul>
                ) : null}
            </section>
            <button className={`add-task-btn ${filterStatus}`} onClick={onAddTask}>
                <FaPlus /> Add New Task 
            </button>
        </div>
    );
}

RenderColumn.propTypes = {
    title: PropTypes.string.isRequired,
    tasks: PropTypes.array.isRequired,
    filterStatus: PropTypes.string.isRequired,
    loading: PropTypes.bool.isRequired,
    deleteTask: PropTypes.func.isRequired,
    setEditingTask: PropTypes.func.isRequired,
    onAddTask: PropTypes.func.isRequired,
};

export default RenderColumn;
