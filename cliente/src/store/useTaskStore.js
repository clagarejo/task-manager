import { create } from 'zustand';
import * as taskServices from '@/services/taskService';

export const useTaskStore = create((set) => ({
    tasks: [],
    error: null,
    loading: false,

    // Obtener tareas del backend
    fetchTasks: async () => {
        set({ loading: true, error: null });
        try {
            const response = await taskServices.getTasks();  // Asegúrate de que la respuesta tenga 'status'
            console.log(response.data, "Tareas con estado asignado");
            set({ tasks: response.data });  // Las tareas deben tener el 'status' correcto ahora
        } catch (error) {
            set({ error: "Error al cargar las tareas." });
        } finally {
            set({ loading: false });
        }
    },


    // Agregar una nueva tarea
    addTask: async (task) => {
        set({ error: null });
        try {
            const response = await taskServices.addTask(task);
            set((state) => ({ tasks: [...state.tasks, response.data] }));
        } catch (error) {
            set({ error: "Error al agregar la tarea." });
        }
    },

    // Eliminar una tarea
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

    // Actualizar una tarea (incluye el estado `status`)
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

    // Limpiar errores
    clearError: () => set({ error: null }),
}));
