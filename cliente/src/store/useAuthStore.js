import { create } from "zustand";
import * as authService from '@/services/authService';

export const useAuthStore = create((set) => ({
    user: null,
    status: "idle", // 'idle', 'checking', 'authenticated', 'not-authenticated'
    errorMessage: null,

    // Login
    startLogin: async ({ email, password }) => {
        set({ status: "checking", errorMessage: null });
        try {
            const { token, name, uid } = await authService.loginUser(email, password);
            localStorage.setItem("token", token);
            localStorage.setItem("token-init-date", new Date().getTime());
            set({ user: { name, uid }, status: "authenticated" });
            return Promise.resolve();
        } catch (error) {
            const errorMsg = error.message || "Error al iniciar sesión";
            set({ status: "not-authenticated", errorMessage: errorMsg });
            setTimeout(() => set({ errorMessage: null }), 5000); // Limpia el mensaje de error
            return Promise.reject(errorMsg);
        }
    },

    // Registro
    startRegister: async ({ name, email, password }) => {
        set({ status: "checking", errorMessage: null });
        console.log(email, 'en el store')

        try {
            const { token, user } = await authService.registerUser(name, email, password);
            localStorage.setItem("token", token);
            localStorage.setItem("token-init-date", new Date().getTime());
            set({ user, status: "authenticated" });
            return Promise.resolve();
        } catch (error) {
            const errorMsg = error.message || "Error al registrar usuario";
            set({ status: "not-authenticated", errorMessage: errorMsg });
            setTimeout(() => set({ errorMessage: null }), 5000); // Limpia el mensaje de error
            return Promise.reject(errorMsg);
        }
    },

    // Verificación del token
    checkAuthToken: async () => {
        const token = localStorage.getItem("token");

        if (!token) {
            set({ user: null, status: "not-authenticated" });
            return;
        }

        try {
            const { token: newToken, name, uid } = await authService.renewToken(token);
            localStorage.setItem("token", newToken);
            localStorage.setItem("token-init-date", new Date().getTime());
            set({ user: { name, uid }, status: "authenticated" });
        } catch (error) {
            localStorage.clear();
            set({ user: null, status: "not-authenticated" });
        }
    },

    // Logout
    startLogout: () => {
        localStorage.clear();
        set({ user: null, status: "not-authenticated" });
    },
}));
