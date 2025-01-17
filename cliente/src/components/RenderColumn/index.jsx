import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FaPlus } from 'react-icons/fa';
import Tasks from "@/components/Task";
import TaskModal from '../TaskModal'
import './styles.css';

function RenderColumn({ title, tasks, filterStatus, loading, deleteTask, onAddTask }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [taskToEdit, setTaskToEdit] = useState(null);

    const handleAddTask = () => {
        setTaskToEdit(null);
        setIsModalOpen(true);
    };

    const handleEditTask = (task) => {
        setTaskToEdit(task);
        setIsModalOpen(true);
    };

    const handleSaveTask = (updatedTask) => {
        if (taskToEdit) {
        } else {
        }
        setIsModalOpen(false);
    };

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
                                handleEditTask={handleEditTask}
                            />
                        ))}
                    </ul>
                ) : null}
            </section>
            <button className={`add-task-btn ${filterStatus}`} onClick={handleAddTask}>
                <FaPlus /> Add New Task
            </button>

            <TaskModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSaveTask}
                task={taskToEdit}
                currentStatus={filterStatus}
            />
        </div>
    );
}

RenderColumn.propTypes = {
    title: PropTypes.string.isRequired,
    tasks: PropTypes.array.isRequired,
    filterStatus: PropTypes.string.isRequired,
    loading: PropTypes.bool.isRequired,
    deleteTask: PropTypes.func.isRequired,
    onAddTask: PropTypes.func.isRequired,
};

export default RenderColumn;
