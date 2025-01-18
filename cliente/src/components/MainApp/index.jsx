import { useEffect } from "react";
import { FaSignOutAlt } from "react-icons/fa";
import ErrorNotification from "@/components/ErrorNotification";
import { useTaskStore } from "@/store/useTaskStore";
import { useLogout } from "@/hooks/useLogout";
import TaskBoard from "../TaskBoard";

const MainApp = () => {
    const { error, fetchTasks } = useTaskStore();
    const { handleLogout } = useLogout();

    useEffect(() => {
        fetchTasks();
    }, [fetchTasks]);

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
