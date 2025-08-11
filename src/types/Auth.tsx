import z from "zod";

// Defina o tipo para as credenciais do formulário
export const loginSchema = z.object({
  securityToken: z.string().optional(),
  cpf: z
    .string()
    .nonempty("O CPF é obrigatório")
    .regex(
      /^\d{3}\.\d{3}\.\d{3}-\d{2}$/,
      "O CPF deve estar no formato 999.999.999-99."
    ),
});

export type LoginCredentials = z.infer<typeof loginSchema>;

// Tipagem para o retorno da função login
export interface LoginResult {
  success: boolean;
  message?: string;
}

// 2. Atualize a interface do contexto
export interface AuthContextType {
  isLoading: boolean;
  isAuthenticated: boolean;
  token: string | null;
  login: (credentials: LoginCredentials) => Promise<LoginResult>; // A função agora recebe credenciais e é assíncrona
  logout: () => void;
  updateSecurityToken: (token: string) => Promise<{
    success: boolean;
    message: any;
  }>;
}
