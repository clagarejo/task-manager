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
            const tasks = response.data.map((task) => ({
                ...task,
                id: task.id, 
            }));
            set({ tasks });
        } catch (error) {
            set({ error: 'Error al cargar las tareas.' });
        } finally {
            set({ loading: false });
        }
    },


    addTask: async (task) => {
        set({ error: null });
        try {
            const response = await taskServices.addTask(task);
            const newTask = {
                ...response.data,
                id: response.data.id,
            };
            set((state) => ({ tasks: [...state.tasks, newTask] }));
        } catch (error) {
            set({ error: 'Error al agregar la tarea.' });
        }
    },

    updateTask: async (updatedTask) => {
        set({ error: null });
        try {
            const response = await taskServices.updateTask(updatedTask);
            const updated = {
                ...response.data,
                id: response.data.id,
            };
            set((state) => ({
                tasks: state.tasks.map((task) =>
                    task.id === updatedTask.id ? updated : task
                ),
            }));
        } catch (error) {
            set({ error: 'Error al actualizar la tarea.' });
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
            set({ error: 'Error al eliminar la tarea.' });
        }
    },

    moveTask: async (taskId, newStatus) => {
        set({ error: null });
        try {
            const taskToUpdate = { id: taskId, status: newStatus };
            const response = await taskServices.updateTask(taskToUpdate);
            const updated = {
                ...response.data,
                id: response.data.id,
            };
            set((state) => ({
                tasks: state.tasks.map((task) =>
                    task.id === taskId ? updated : task
                ),
            }));
        } catch (error) {
            set({ error: 'Error al mover la tarea.' });
        }
    },

    clearError: () => set({ error: null }),
}));
