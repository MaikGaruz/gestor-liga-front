import axiosInstance from "./axiosInstance";

/**
 * Realiza una solicitud HTTP GET al backend para obtener todos los jugadores existentes.
 *
 * @function obtenerJugadoresService
 * @returns {Promise<import('axios').AxiosResponse>} Promesa que resuelve con la respuesta del servidor.
 */
export const obtenerJugadoresService = () => axiosInstance.get("/jugador/obtenerTodos");