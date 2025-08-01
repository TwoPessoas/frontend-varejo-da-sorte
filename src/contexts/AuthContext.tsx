import { createContext, useState, type ReactNode, useContext } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api"; // 1. Importe nossa instância do Axios
import type {
  AuthContextType,
  LoginCredentials,
  LoginResult,
} from "../types/Auth";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  // Vamos inicializar o token a partir do localStorage para persistir o login
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("authTokenWebVarejoDaSorte")
  );
  const navigate = useNavigate();

  // 3. Reescreva completamente a função de login
  const login = async (credentials: LoginCredentials): Promise<LoginResult> => {
    try {
      // Faz a chamada POST para o endpoint de login da sua API
      const response = await api.post("/auth/web-login", credentials);

      // Se a API responder com sucesso (status 200-299)
      const { token: newToken } = response.data;

      if (newToken) {
        setToken(newToken);
        localStorage.setItem("authTokenWebVarejoDaSorte", newToken);
        navigate("/area-cliente"); // Redireciona para a área do cliente após o login
        return { success: true };
      }

      // Caso a API responda com sucesso mas sem token (pouco provável)
      return { success: false, message: "Token não recebido." };
    } catch (error: any) {
      console.error("Falha no login:", error);

      // Lida com erros específicos da resposta da API
      if (error.response) {
        // Erro de "Não autorizado" (email ou senha errados)
        if (error.response.status === 401) {
          return {
            success: false,
            message: "Credenciais inválidas. Verifique seu e-mail e senha.",
          };
        }
        // Outros erros vindos do servidor
        return {
          success: false,
          message:
            error.response.data.message || "Ocorreu um erro no servidor.",
        };
      }

      // Erro de rede ou outro problema
      return {
        success: false,
        message:
          "Não foi possível conectar ao servidor. Verifique sua conexão.",
      };
    }
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem("authTokenWebVarejoDaSorte");
    navigate("/");
  };

  const value = {
    isAuthenticated: !!token,
    token,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
