import { Routes, Route, Navigate } from "react-router-dom";
import { useAuthStore } from "@/store/useAuthStore";
import PrivateRoute from "@/components/PrivateRoute";
import LoginRegister from "@/pages";
import MainApp from "@/components/MainApp";

const AppRouter = () => {
    const { status } = useAuthStore();

    return (
        <Routes>
            {status === "authenticated" ? (
                <>
                    <Route
                        path="/tasks"
                        element={
                            <PrivateRoute>
                                <MainApp />
                            </PrivateRoute>
                        }
                    />
                    <Route path="/*" element={<Navigate to="/tasks" />} />
                </>
            ) : (
                <>
                    <Route path="/" element={<LoginRegister />} />
                    <Route path="/*" element={<Navigate to="/" />} />
                </>
            )}
        </Routes>
    );
};

export default AppRouter;
