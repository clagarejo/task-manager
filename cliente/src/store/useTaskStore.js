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
        set({ error: null });
        try {
            const response = await taskServices.addTask(task);
            set((state) => ({ tasks: [...state.tasks, response.data] }));
        } catch (error) {
            set({ error: "Error al agregar la tarea." });
        }
    },

    deleteTask: async (taskId) => {
        set({ error: null });
        try {
            await taskServices.deleteTask(taskId);
            set((state) => ({
                tasks: state.tasks.filter((task) => task.id !== taskId),
            }));
        } catch (error) {
            set({ error: "Error al eliminar la tarea." });
        }
    },

    updateTask: async (updatedTask) => {
        set({ error: null });
        try {
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

    clearError: () => set({ error: null }),
}));
