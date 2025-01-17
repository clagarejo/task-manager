import { create } from 'zustand';
import * as taskServices from '@/services/taskService';

export const useTaskStore = create((set) => ({
    tasks: [],
    error: null,
    loading: false,

    fetchTasks: async () => {
        set({ loading: true, error: null });
        try {
            const response = await taskServices.getTasks();
            set({ tasks: response.data });
        } catch (error) {
            set({ error: "Error al cargar las tareas." });
        } finally {
            set({ loading: false });
        }
    },

    addTask: async (task) => {
        try {
            const newTask = { id: Date.now(), ...task };
            console.log("Nueva tarea creada:", newTask); // Verifica que la tarea tiene un id
            set((state) => ({ tasks: [...state.tasks, newTask] }));
        } catch (error) {
            console.error('Error adding task', error);
        }
    },


    updateTask: async (updatedTask) => {
        set({ error: null });
        try {
            console.log('ID de la tarea a actualizar:', updatedTask.id); // Verificar el id
            // Verificar que el id es un número válido
            const taskId = parseInt(updatedTask.id, 10);
            if (isNaN(taskId)) {
                throw new Error('ID no válido');
            }

            updatedTask.id = taskId;

            const response = await taskServices.updateTask(updatedTask);
            set((state) => ({
                tasks: state.tasks.map((task) =>
                    task.id === updatedTask.id ? response.data : task
                ),
            }));
        } catch (error) {
            set({ error: "Error al actualizar la tarea." });
        }
    },



    deleteTask: async (taskId) => {
        try {
            set((state) => ({
                tasks: state.tasks.filter((task) => task.id !== taskId),
            }));
        } catch (error) {
            console.error('Error deleting task', error);
        }
    },



    // Mover una tarea a otra columna (actualiza el estado)
    moveTask: async (taskId, newStatus) => {
        set({ error: null });
        try {
            const taskToUpdate = { id: taskId, status: newStatus };
            const response = await taskServices.updateTask(taskToUpdate); // Llama a la API para actualizar el estado
            set((state) => ({
                tasks: state.tasks.map((task) =>
                    task.id === taskId ? response.data : task
                ),
            }));
        } catch (error) {
            set({ error: "Error al mover la tarea." });
        }
    },

    clearError: () => set({ error: null }),
}));
