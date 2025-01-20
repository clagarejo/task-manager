import { useEffect } from "react";
import { FaSignOutAlt } from "react-icons/fa";
import { useTaskStore } from "@/store/useTaskStore";
import { useLogout } from "@/hooks/useLogout";
import TaskBoard from "../TaskBoard";
import { useAuthStore } from "@/store/useAuthStore";

const MainApp = () => {
    const { error, fetchTasks } = useTaskStore();
    const { handleLogout } = useLogout();
    const { user, checkAuthToken } = useAuthStore();

    useEffect(() => {
        const verifyToken = async () => {
            await checkAuthToken(); 
        };
        verifyToken();
    }, [checkAuthToken]);

    useEffect(() => {
        if (user) {
            fetchTasks(); 
        }
    }, [fetchTasks, user]); 

    return (
        <div className="tasks-container">
            <div className="header">
                <h1>Task manager</h1>
                <div className="logout-container" onClick={handleLogout}>
                    <FaSignOutAlt size={20} />
                </div>
            </div>
            <TaskBoard />
        </div>
    );
};

export default MainApp;
