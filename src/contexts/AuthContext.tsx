import {
  createContext,
  useState,
  type ReactNode,
  useContext,
  useCallback,
} from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api"; // 1. Importe nossa instância do Axios
import type {
  AuthContextType,
  LoginCredentials,
  LoginResult,
} from "../types/Auth";

const AuthContext = createContext<AuthContextType | undefined>(undefined);
export const AUTH_TOKEN_NAME = "authTokenWebVarejoDaSorte";
export const SECURITY_STORE_NAME = "securityVarejoDaSorte_8hpGQFSWkj";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoading, setIsLoading] = useState(false);
  // Vamos inicializar o token a partir do localStorage para persistir o login
  const [token, setToken] = useState<string | null>(
    localStorage.getItem(AUTH_TOKEN_NAME)
  );
  const navigate = useNavigate();

  // 3. Reescreva completamente a função de login
  const login = useCallback(
    async (credentials: LoginCredentials): Promise<LoginResult> => {
      setIsLoading(true);
      try {
        credentials.securityToken =
          localStorage.getItem(SECURITY_STORE_NAME) || "";

        // Faz a chamada POST para o endpoint de login da sua API
        const response = await api.post("/auth/web-login", credentials);

        // Se a API responder com sucesso (status 200-299)
        const { token: newToken } = response.data;

        if (newToken) {
          setToken(newToken);
          localStorage.setItem(AUTH_TOKEN_NAME, newToken);
          navigate("/area-cliente"); // Redireciona para a área do cliente após o login
          return { success: true };
        }

        // Caso a API responda com sucesso mas sem token (pouco provável)
        return { success: false, message: "Token não recebido." };
      } catch (error: any) {
        // Lida com erros específicos da resposta da API
        if (error.response) {
          // Erro de "Não autorizado" (email ou senha errados)
          if (error.response.status === 401) {
            return {
              success: false,
              message:
                error.response.data.message ||
                "Credenciais inválidas. Verifique seu e-mail e senha.",
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
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const logout = () => {
    setToken(null);
    localStorage.removeItem(AUTH_TOKEN_NAME);
    navigate("/");
  };

  const updateSecurityToken = useCallback(async (token: string) => {
    setIsLoading(true);
    try {
      await api.put("/auth/update-security-token", { token });
      return { success: true, message: "Atualização realizada com sucesso" };
    } catch (error: any) {
      return {
        success: false,
        message:
          error?.response?.data?.message || "Ocorreu um erro no servidor.",
      };
    } finally {
      setIsLoading(false);
    }
  }, []);

  const value = {
    isLoading,
    isAuthenticated: !!token,
    token,
    login,
    logout,
    updateSecurityToken,
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
