import { useState } from 'react';

export const useModal = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [taskToEdit, setTaskToEdit] = useState(null);
    const [currentStatus, setCurrentStatus] = useState('Selecciona una opción');

    const openModalForNewTask = (status) => {
        const statusString = typeof status === 'string' ? status : status?.name;
        setTaskToEdit(null);
        setIsModalOpen(true);
        setCurrentStatus(statusString);
    };

    const openModalForEditTask = (task) => {
        setTaskToEdit(task);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setTaskToEdit(null);
        setCurrentStatus('Selecciona una opción');
    };

    return {
        isModalOpen,
        taskToEdit,
        currentStatus,
        openModalForNewTask,
        openModalForEditTask,
        closeModal,
        setCurrentStatus,
    };
};
