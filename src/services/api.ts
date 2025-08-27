import axios from "axios";
import { AUTH_TOKEN_NAME } from "../contexts/AuthContext";

const api = axios.create({
  baseURL: "https://api.aniversarioatakarejo.com.br/api",
});

// ✨ Adicionando o Interceptor de Requisição ✨
api.interceptors.request.use(
  (config) => {
    // Pega o token do localStorage
    const token = localStorage.getItem(AUTH_TOKEN_NAME);

    // Se o token existir, adiciona ao cabeçalho de autorização
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Retorna a configuração modificada para a requisição continuar
    return config;
  },
  (error) => {
    // Em caso de erro na configuração da requisição
    return Promise.reject(error);
  }
);

export default api;
