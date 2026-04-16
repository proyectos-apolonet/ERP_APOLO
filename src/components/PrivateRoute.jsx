import { Navigate } from "react-router-dom";

const PrivateRoute = ({ user, loading, children }) => {

    if ( loading ) return null;

    return user ? children : <Navigate to="/" replace />;
};

export default PrivateRoute;