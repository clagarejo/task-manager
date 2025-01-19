import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FaPlus } from 'react-icons/fa';
import Task from "@/components/Task";
import TaskModal from '../TaskModal';
import './styles.css';
import { useTaskStore } from '@/store/useTaskStore';
import Swal from 'sweetalert2';

function RenderColumn({ title, tasks, filterStatus, loading, deleteTask }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [taskToEdit, setTaskToEdit] = useState(null);
    const [currentStatus, setCurrentStatus] = useState('Selecciona una opción');
    const { addTask, updateTask, moveTask } = useTaskStore();

    const handleAddTask = (status) => {
        const statusString = typeof status === 'string' ? status : status?.name;
        setTaskToEdit(null);
        setIsModalOpen(true);
        setCurrentStatus(statusString);
    };

    const handleEditTask = (task) => {
        setTaskToEdit(task);
        setIsModalOpen(true);
    };

    const handleSaveTask = (updatedTask) => {
        if (!updatedTask.title || !updatedTask.description || !updatedTask.status) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Todos los campos son requeridos.',
            });
            return;
        }

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

    const filteredTasks = tasks
        .filter((task) => task.status === filterStatus)
        .map((task) => ({
            ...task,
            id: task.id || task._id
        }));

    return (
        <div className={`column ${filterStatus}`}>
            <h2
                className={`column-title ${filterStatus}`}
                style={tasks ? { marginBottom: '1rem' } : {}}
            >
                {title}
            </h2>
            <section className={filteredTasks ? 'margin-bottom: 10px' : ''}>
                {loading ? (
                    <p>Cargando...</p>
                ) : filteredTasks.length > 0 ? (
                    <ul>
                        {filteredTasks.map((task, index) => (
                            <Task
                                key={task.id || index}
                                task={task}
                                handleEditTask={handleEditTask}
                            />
                        ))}
                    </ul>
                ) : null}
            </section>
            <button className={`add-task-btn ${filterStatus}`} onClick={() => handleAddTask(filterStatus)}>
                <FaPlus /> Agregar nueva tarea
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
