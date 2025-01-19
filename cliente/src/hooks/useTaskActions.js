import { useTaskStore } from '@/store/useTaskStore';
import Swal from 'sweetalert2';

export const useTaskActions = (taskToEdit, currentStatus, setIsModalOpen) => {
    const { addTask, updateTask, moveTask } = useTaskStore();

    const saveTask = (updatedTask) => {
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

        setIsModalOpen(false);
    };

    const deleteTask = async (taskId) => {
        try {
            await deleteTask(taskId);
            setIsModalOpen(false);
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    };

    return { saveTask, deleteTask };
};
