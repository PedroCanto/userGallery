import axios from "axios";

/**
 * Função apiSWApi
 *
 * Esta função cria e retorna uma instância do Axios configurada para fazer chamadas à API do Star Wars (SWAPI).
 *
 * @returns {AxiosInstance} - Retorna uma instância do Axios configurada com a base URL da SWAPI.
 */
export function apiUserGallery() {
  const api = axios.create({
    baseURL: import.meta.env.VITE_APP_API_URL,
  });

  api.interceptors.request.use(
    (response) => {
      const token = localStorage.getItem("token");

      if (token) {
        console.log(`Bearer ${token}`);
        response.headers.Authorization = `Bearer ${token}`;
      }
      return response;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  return api;
}
