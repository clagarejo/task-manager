import { create } from "zustand";
import taskApi from "@/api/taskApi";
import Swal from "sweetalert2";

export const useAuthStore = create((set) => ({
    status: 'not-authenticated',
    user: null,
    errorMessage: null,

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
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Credenciales incorrectas',
            });
            setTimeout(() => {
                set({ errorMessage: null });
            }, 10);
        }
    },

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
            const errorMsg = error.response?.data?.msg || 'Error con los datos ingresados';
            set({
                errorMessage: errorMsg,
                status: 'not-authenticated',
            });
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: errorMsg,
            });
            setTimeout(() => {
                set({ errorMessage: null });
            }, 10);
        }
    },

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
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Token inválido, por favor inicie sesión nuevamente',
            });
        }
    },

    startLogout: () => {
        localStorage.clear();
        set({ status: 'not-authenticated', user: null, errorMessage: null });
    },
}));
