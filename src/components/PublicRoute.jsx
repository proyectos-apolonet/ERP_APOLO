import { Navigate } from "react-router-dom";

/**
 * `PublicRoute` - Componente de protección para rutas de acceso público (Login, Registro, etc.).
 * * Este componente asegura que un usuario ya autenticado no pueda acceder a rutas 
 * que son exclusivamente para usuarios anónimos. Si el usuario está logueado, 
 * es redirigido automáticamente al área principal de la aplicación.
 * * @example
 * <Route path="/" element={
 * <PublicRoute user={user} loading={loading}>
 * <Login />
 * </PublicRoute>
 * } />
 * * @param {Object} props
 * @param {Object|null} props.user - El objeto de usuario autenticado.
 * @param {boolean} props.loading - Estado de validación de la sesión.
 * @param {React.ReactNode} props.children - Componentes (Login/Signup) que se muestran si NO hay sesión.
 * * @returns {JSX.Element|null} Redirige a '/home' si hay usuario, de lo contrario muestra los hijos.
 */
const PublicRoute = ({ user, loading, children }) => {

    /* Mientras se valida la sesión, no renderizamos nada para evitar parpadeos visuales
       o redirecciones incorrectas antes de tiempo. */
    if (loading) return null;

    /* Lógica inversa: 
       - Si el usuario YA existe: Lo mandamos al Home (evita que vuelva al Login).
       - Si NO existe: Le permitimos ver la página (children). 
    */
    return user ? <Navigate to="/home" replace /> : children;
};

export default PublicRoute;