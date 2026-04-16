import { Navigate } from "react-router-dom";

/**
 * `PrivateRoute` - Componente de orden superior (HOC) para protección de rutas.
 * * Este componente actúa como un middleware de seguridad en el frontend. 
 * Verifica si existe un usuario autenticado antes de permitir el acceso al contenido.
 * * @example
 * <Route path="/dashboard" element={
 * <PrivateRoute user={user} loading={loading}>
 * <Dashboard />
 * </PrivateRoute>
 * } />
 * * @param {Object} props
 * @param {Object|null} props.user - El objeto de usuario autenticado. Si es null, se deniega el acceso.
 * @param {boolean} props.loading - Estado de carga de la autenticación. Evita redirecciones prematuras mientras se valida el token.
 * @param {React.ReactNode} props.children - El componente o página protegida que se desea renderizar.
 * * @returns {JSX.Element|null} Retorna los componentes hijos si está autenticado, de lo contrario redirige a la raíz.
 */
const PrivateRoute = ({ user, loading, children }) => {

    /* Si la sesión aún se está verificando (ej. llamando a la API de Firebase o Auth0),
       retornamos null para no mostrar nada y evitar que el usuario sea redirigido 
       al login por error durante un segundo.
    */
    if ( loading ) return null;

    /* Si el usuario existe, renderizamos el contenido protegido (children).
       Si no, redirigimos al login ('/') reemplazando el historial para que no pueda volver atrás.
    */
    return user ? children : <Navigate to="/" replace />;
};

export default PrivateRoute;