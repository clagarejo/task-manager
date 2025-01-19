import { useEffect } from "react";
import { FaSignOutAlt } from "react-icons/fa";
import ErrorNotification from "@/components/ErrorNotification";
import { useTaskStore } from "@/store/useTaskStore";
import { useLogout } from "@/hooks/useLogout";
import TaskBoard from "../TaskBoard";
import { useAuthStore } from "@/store/useAuthStore";

const MainApp = () => {
    const { error, fetchTasks } = useTaskStore();
    const { handleLogout } = useLogout();
    const { user, checkAuthToken } = useAuthStore(); // Obtener el usuario y la función de verificación

    useEffect(() => {
        const verifyToken = async () => {
            await checkAuthToken(); // Verificar el token
        };
        verifyToken(); // Ejecutar la verificación del token al cargar el componente
    }, [checkAuthToken]);

    useEffect(() => {
        if (user) {
            fetchTasks(); // Solo ejecutar fetchTasks si el usuario está logueado
        }
    }, [fetchTasks, user]); // Ejecutar fetchTasks cuando el usuario cambie

    return (
        <div className="tasks-container">
            <div className="header">
                <h1>Task Manager</h1>
                <div className="logout-container" onClick={handleLogout}>
                    <FaSignOutAlt size={20} />
                </div>
            </div>
            {error && <ErrorNotification message={error} />}
            <TaskBoard />
        </div>
    );
};

export default MainApp;
