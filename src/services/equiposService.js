import axiosInstance from "./axiosInstance"

/**
 * Realiza una solicitud HTTP GET al backend para obtener todos los equipos existentes.
 *
 * @function obtenerEquiposService
 * @returns {Promise<import('axios').AxiosResponse>} Promesa que resuelve con la respuesta del servidor.
 */
export const obtenerEquiposService = () => axiosInstance.get("/equipo/obtenerTodos");