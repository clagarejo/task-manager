import React from 'react';
import PropTypes from 'prop-types';
import { FaPlus } from 'react-icons/fa';
import TaskModal from '../TaskModal';
import { useModal } from '@/hooks/useModal';
import { useTaskActions } from '@/hooks/useTaskActions';
import './styles.css';
import TaskList from '../TaskList';

function RenderColumn({ title, tasks, filterStatus, loading, deleteTask }) {
    const {
        isModalOpen,
        taskToEdit,
        currentStatus,
        openModalForNewTask,
        openModalForEditTask,
        closeModal,
    } = useModal();

    const { saveTask } = useTaskActions(taskToEdit, currentStatus, closeModal);

    return (
        <div className={`column ${filterStatus}`}>
            <h2 className={`column-title ${filterStatus}`} style={tasks ? { marginBottom: '1rem' } : {}}>
                {title}
            </h2>
            <TaskList tasks={tasks} handleEditTask={openModalForEditTask} loading={loading} filterStatus={filterStatus} />
            <button className={`add-task-btn ${filterStatus}`} onClick={() => openModalForNewTask(filterStatus)}>
                <FaPlus /> Agregar nueva tarea
            </button>

            <TaskModal
                isOpen={isModalOpen}
                onClose={closeModal}
                onSave={saveTask}
                onDelete={deleteTask}
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
