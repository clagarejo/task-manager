import Tasks from "@/components/Task";
import PropTypes from "prop-types";
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
                ) : (
                    <p>No tasks in this column</p>
                )}
            </section>
            <button className="add-task-btn" onClick={onAddTask}>
                Add New Task
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
