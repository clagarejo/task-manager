import { create } from "zustand";
import taskApi from "@/api/taskApi";

export const useAuthStore = create((set) => ({
    // Estado inicial
    status: 'not-authenticated', // El estado de autenticación (checking, authenticated, not-authenticated)
    user: null,         // Usuario actual
    errorMessage: null, // Mensaje de error

    // Método de inicio de sesión
    startLogin: async ({ email, password }) => {
        set({ status: 'checking' });
        try {
            const { data } = await taskApi.post('/auth', { email, password });
            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime());
            set({
                user: { name: data.name, uid: data.uid },
                status: 'authenticated',
            });
        } catch (error) {
            set({
                errorMessage: 'Credenciales incorrectas',
                status: 'not-authenticated',
            });
            setTimeout(() => {
                set({ errorMessage: null });
            }, 10);
        }
    },

    // Método de registro
    startRegister: async ({ name, email, password }) => {
        set({ status: 'checking' });
        try {
            const { data } = await taskApi.post('/auth/new', { name, email, password });
            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime());
            set({
                user: { name: data.name, uid: data.uid },
                status: 'authenticated',
            });
        } catch (error) {
            set({
                errorMessage: error.response?.data?.msg || 'Error con los datos ingresados',
                status: 'not-authenticated',
            });
            setTimeout(() => {
                set({ errorMessage: null });
            }, 10);
        }
    },



    // Método para verificar el token de autenticación
    checkAuthToken: async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            set({ status: 'not-authenticated', user: null });
            return;
        }

        try {
            const { data } = await taskApi.get('/auth/renew', {
                headers: {
                    'x-token': token,
                },
            });
            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime());
            set({
                user: { name: data.name, uid: data.uid },
                status: 'authenticated',
            });
        } catch (error) {
            localStorage.clear();
            set({ status: 'not-authenticated', user: null });
        }
    },

    // Método para cerrar sesión
    startLogout: () => {
        localStorage.clear();
        set({ status: 'not-authenticated', user: null, errorMessage: null });
    },
}));
