import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FaPlus } from 'react-icons/fa';
import Tasks from "@/components/Task";
import TaskModal from '../TaskModal';
import './styles.css';
import { useTaskStore } from '@/store/useTaskStore';

function RenderColumn({ title, tasks, filterStatus, loading, deleteTask }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [taskToEdit, setTaskToEdit] = useState(null);
    const [currentStatus, setCurrentStatus] = useState('Selecciona una opción');
    const { addTask, updateTask, moveTask } = useTaskStore();

    const handleAddTask = (status) => {
        const statusString = typeof status === 'string' ? status : status?.name || 'Selecciona una opción';
        setTaskToEdit(null);
        setIsModalOpen(true);
        setCurrentStatus(statusString);
    };

    const handleEditTask = (task) => {
        setTaskToEdit(task);
        setIsModalOpen(true);
    };

    const handleSaveTask = (updatedTask) => {
        if (taskToEdit) {
            updatedTask.id = taskToEdit.id;
            if (updatedTask.status !== taskToEdit.status) {
                moveTask(updatedTask.id, updatedTask.status);
            } else {
                updateTask(updatedTask);
            }
        } else {
            updatedTask.status = currentStatus;
            addTask(updatedTask);
        }

        setTaskToEdit(null);
        setCurrentStatus('Selecciona una opción');
        setIsModalOpen(false);
    };




    const handleDeleteTask = async (taskId) => {
        try {
            await deleteTask(taskId);
            setIsModalOpen(false);
        } catch (error) {
            console.error("Error deleting task:", error);
        }
    };

    const filteredTasks = tasks.filter((task) => task.status === filterStatus);

    return (
        <div className={`column ${filterStatus}`}>
            <h2 className={`column-title ${filterStatus}`}>{title}</h2>
            <section className={filteredTasks ? 'margin-bottom: 10px' : ''}>
                {loading ? (
                    <p>Loading...</p>
                ) : filteredTasks.length > 0 ? (
                    <ul>
                        {filteredTasks.map((task, index) => (
                            <Tasks
                                key={task.id || index}
                                task={task}
                                handleEditTask={handleEditTask}
                            />
                        ))}
                    </ul>
                ) : null}
            </section>
            <button className={`add-task-btn ${filterStatus}`} onClick={() => handleAddTask(filterStatus)}>
                <FaPlus /> Add New Task
            </button>

            <TaskModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSaveTask}
                onDelete={handleDeleteTask}
                task={taskToEdit}
                currentStatus={currentStatus}
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
};

export default RenderColumn;
