import { Navigate } from "react-router-dom";

const PublicRoute = ({ user, loading, children }) => {

    if (loading) return null;

    return user ? <Navigate to="/home" replace /> : children;
};

export default PublicRoute;