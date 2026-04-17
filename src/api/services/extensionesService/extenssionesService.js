import client from "../../client.js";

/**
 * @file extensionesService.js
 * @description Servicios para la gestión de extensiones telefónicas o del sistema.
 * Utiliza la instancia configurada de 'client' para realizar peticiones HTTP.
 */

/**
 * Obtiene la lista completa de extensiones registradas en el sistema.
 * @async
 * @function getExtensiones
 * @returns {Promise<Array<Object>>} Una promesa que resuelve con el array de objetos de extensiones.
 * @throws {Error} Si el cliente de API devuelve un error (ej. 401, 500).
 */
export const getExtensiones = () => client.get("/extensiones").then(r => r.data);

/**
 * Registra una nueva extensión en la base de datos.
 * @async
 * @function postExtensiones
 * @param {Object} extensionesData - Objeto que contiene los datos de la nueva extensión.
 * @param {string} extensionesData.nombre - Nombre asignado a la extensión.
 * @param {string|number} extensionesData.numero - Número de la extensión.
 * // Añade aquí otros campos según tu modelo de base de datos
 * @returns {Promise<Object>} Promesa con la respuesta del servidor tras la creación.
 */
export const postExtensiones = (extensionesData) => client.post("extensiones", extensionesData).then(r => r.data);