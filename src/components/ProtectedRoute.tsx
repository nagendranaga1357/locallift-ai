import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

interface ProtectedRouteProps {
    children: React.ReactNode;
    requireAdmin?: boolean;
    requireBusinessOwner?: boolean;
}

const ProtectedRoute = ({
    children,
    requireAdmin = false,
    requireBusinessOwner = false,
}: ProtectedRouteProps) => {
    const { isLoggedIn, isAdmin, isBusinessOwner } = useAuth();
    const location = useLocation();

    if (!isLoggedIn) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    if (requireAdmin && !isAdmin) {
        return <Navigate to="/discover" replace />;
    }

    if (requireBusinessOwner && !isBusinessOwner) {
        return <Navigate to="/discover" replace />;
    }

    return <>{children}</>;
};

export default ProtectedRoute;
