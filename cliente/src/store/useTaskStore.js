import { create } from 'zustand';
import taskApi from '@/api/taskApi';
import { useAuthStore } from '@/store/useAuthStore'; // Asegúrate de tener acceso al usuario logueado

export const useTaskStore = create((set, get) => ({
    tasks: [],
    error: null,
    loading: false,

    // Fetch tasks for the logged-in user
    fetchTasks: async () => {
        const { user } = useAuthStore.getState(); // Obtener el usuario logueado
        if (!user) return set({ error: 'No hay un usuario autenticado.' });

        set({ loading: true, error: null });
        try {
            const response = await taskApi.get(`/tasks?userId=${user.uid}`); // Filtrar tareas por el usuario logueado
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
        const { user } = useAuthStore.getState();
        if (!user) return set({ error: 'No hay un usuario autenticado.' });
        set({ error: null });

        try {
            const response = await taskApi.post('/tasks', {
                title: task.title,
                description: task.description,
                status: task.status,
                userId: user.uid,
            });

            console.log(response, 'responseee')

            const newTask = {
                ...response.data,
                id: response.data.id,
            };

            console.log(newTask, 'datos del usuario')

            set((state) => ({ tasks: [...state.tasks, newTask] }));
        } catch (error) {
            set({ error: 'Error al agregar la tarea.' });
        }
    },

    updateTask: async (updatedTask) => {
        const { user } = useAuthStore.getState();
        if (!user) return set({ error: 'No hay un usuario autenticado.' });

        set({ error: null });
        try {
            const response = await taskApi.put(`/tasks/${updatedTask.id}`, {
                title: updatedTask.title,
                description: updatedTask.description,
                status: updatedTask.status,
                userId: user.uid,
            });
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
        const { user } = useAuthStore.getState();
        if (!user) return set({ error: 'No hay un usuario autenticado.' });

        set({ error: null });
        try {
            await taskApi.delete(`/tasks/${taskId}`, {
                data: { userId: user.uid }, 
                headers: { 'x-token': user.token }
            });
            set((state) => ({
                tasks: state.tasks.filter((task) => task.id !== taskId),
            }));
        } catch (error) {
            set({ error: 'Error al eliminar la tarea.' });
        }
    },


    // Move a task to a new status (validate ownership)
    moveTask: async (taskId, newStatus) => {
        const { user } = useAuthStore.getState();
        if (!user) return set({ error: 'No hay un usuario autenticado.' });

        set({ error: null });
        try {
            const taskToUpdate = { id: taskId, status: newStatus, userId: user.uid };
            const response = await taskApi.put(`/tasks/${taskId}`, taskToUpdate);
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

    // Clear error
    clearError: () => set({ error: null }),
}));
