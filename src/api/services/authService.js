import axios from "axios"

/**
 * @file authService.js
 * @description Servicios para la gestión del ciclo de vida de la sesión del usuario.
 * Maneja la verificación de identidad, el inicio de sesión y el cierre de sesión.
 */

/**
 * Instancia de Axios especializada para la autenticación.
 * * @constant {AxiosInstance}
 * - `baseURL`: Apunta específicamente al endpoint de '/auth'.
 * - `withCredentials`: Necesario para que el navegador almacene y envíe las cookies HttpOnly (tokens).
 */
const api = axios.create({
    baseURL: "http://localhost:5000/api/auth",
    withCredentials: true,
});

/**
 * Recupera la información del usuario actualmente autenticado.
 * Útil para la persistencia de la sesión al recargar la página.
 * @async
 * @function getMe
 * @returns {Promise<Object>} Datos del usuario obtenidos desde la sesión activa.
 * @throws {Error} Si el token no existe o ha expirado (Error 401).
 */
export const getMe = async () => {
    const result = await api.get("/me");
    return result.data;
};

/**
 * Autentica a un usuario mediante sus credenciales.
 * @async
 * @function loginUser
 * @param {Object} credentials - Objeto de credenciales.
 * @param {string} credentials.email - Correo electrónico del usuario.
 * @param {string} credentials.password - Contraseña.
 * @returns {Promise<Object>} El objeto 'user' procesado y devuelto por el backend.
 */
export const loginUser = async ({ email, password }) => {
    const result = await api.post("/login", { email, password });
    return result.data.user;
};

/**
 * Solicita al servidor el cierre de la sesión y la eliminación de las cookies de autenticación.
 * @async
 * @function logoutUser
 * @returns {Promise<Object>} La respuesta íntegra del servidor confirmando el cierre.
 */
export const logoutUser = async () => {
    const result = await api.post("/logout");
    return result;
};