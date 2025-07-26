import axiosInstance from "./axiosInstance"

/**
 * Realiza una solicitud HTTP GET al backend para obtener todos los arbitros existentes.
 *
 * @function obtenerArbitrosServices
 * @returns {Promise<import('axios').AxiosResponse>} Promesa que resuelve con la respuesta del servidor.
 */
export const obtenerArbitrosService = () => axiosInstance.get("/arbitro/obtenerTodos");