import axios from "axios";

/**
 * @file apiClient.js
 * @description Configuración centralizada de Axios para las peticiones al backend.
 * Incluye la configuración de la URL base, manejo de cookies (CORS) e interceptores
 * de seguridad para la gestión de sesiones.
 */

/**
 * Instancia personalizada de Axios.
 * * Configurada con:
 * - `baseURL`: Punto de acceso a la API (Node.js/Express).
 * - `withCredentials`: Permite el envío de cookies (HttpOnly tokens) en las peticiones.
 */
const client = axios.create({
    baseURL: "http://localhost:5000/api",
    withCredentials: true,
});

/**
 * Interceptor de Respuesta.
 * * Este middleware actúa sobre todas las respuestas que regresan del servidor.
 * * Lógica de seguridad:
 * Si el servidor devuelve un estado **401 (Unauthorized)**, significa que el token 
 * ha expirado o es inválido. En este caso, se fuerza una redirección al login
 * para proteger el acceso a los datos.
 */
client.interceptors.response.use(

    /**
     * Si la respuesta es exitosa (2xx), se retorna tal cual.
     * @param {Object} response - Objeto de respuesta de Axios.
     * @returns {Object}
     */
    response => response,

    /**
     * Manejo centralizado de errores.
     * @param {Object} error - Objeto de error de la petición.
     * @returns {Promise} Rechaza la promesa con el error para manejo local si es necesario.
     */
    error => {
        if(error.response?.status === 401) {
            window.location.href = "/";
        }

        return Promise.reject(error);
    }
);

export default client;