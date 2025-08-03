import { createContext, useState, type ReactNode, useContext } from "react";
import type { Client, ClientContextType } from "../types/Client";
import api from "../services/api";
import { useAuth } from "./AuthContext";

const ClientContext = createContext<ClientContextType | undefined>(undefined);

export const ClientProvider = ({ children }: { children: ReactNode }) => {
  const [client, setClient] = useState<Client | null>(null);
  const { isAuthenticated, logout } = useAuth();
  /*

  // Vamos inicializar o token a partir do localStorage para persistir o login
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("authTokenWebVarejoDaSorte")
  );
  const navigate = useNavigate();
  
  // 3. Reescreva completamente a função de login
  const login = async (credentials: LoginCredentials): Promise<LoginResult> => {
    try {
      console.log("[LOGIN] 0");
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
    */
  const me = async () => {
    try {
      if (!isAuthenticated) return false;

      await api.get(`/clients/me`);
      return true;
    } catch (err: any) {
      //Não autorizado
      if ((err.status = 401)) {
        setClient(null);
        logout();
      }
      return false;
    }
  };

  const value = {
    client,
    me,
  };

  return (
    <ClientContext.Provider value={value}>{children}</ClientContext.Provider>
  );
};

export const useClient = () => {
  const context = useContext(ClientContext);
  if (context === undefined) {
    throw new Error("useClient must be used within an ClientProvider");
  }
  return context;
};
