import { Navigate } from "react-router-dom";
import { useAuthStore } from "@/store/useAuthStore";

const PrivateRoute = ({ children }) => {
    const { status } = useAuthStore();

    if (status === "checking") {
        return <div>Loading...</div>;
    }

    if (status === "not-authenticated") {
        return <Navigate to="/" />;
    }

    return children;
};

export default PrivateRoute;
