import { useCallback } from "react";

export const useLogout = () => {
    const handleLogout = useCallback(() => {
        localStorage.removeItem("token");
        window.location.href = "/";
    }, []);

    return { handleLogout };
};
