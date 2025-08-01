import { useState } from "react";
import { LogIn } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext"; // Importa o AuthContext para usar a função de login
import { type LoginCredentials } from "../../types/Auth";
import toast from "react-hot-toast";
import PreRegistrationForm from "./components/PreRegistrationForm";

export default function HomePage() {
  const { login } = useAuth(); // Utilize o método de login do contexto
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data: LoginCredentials) => {
    try {
      const result = await login(data);
      if (!result.success) {
        toast.error(
          "Erro ao criar cliente. Por favor, verifique os dados e tente novamente."
        );
      }
    } catch (err: any) {
      console.error("Erro ao criar cliente:", err);
      toast.error(
        "Erro inesperado ao criar cliente. Tente novamente mais tarde."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Header da página de autenticação */}
      <div className="auth-header">
        <div className="flex items-center justify-center mb-4">
          <div className="w-12 h-12 bg-primary-600 rounded-xl flex items-center justify-center">
            <LogIn className="w-6 h-6 text-white" />
          </div>
        </div>
        <h1 className="auth-title">Bem-vindo de volta</h1>
        <p className="auth-subtitle">
          Entre com suas credenciais para acessar o painel administrativo
        </p>
      </div>

      <PreRegistrationForm onSubmit={onSubmit} isLoading={isLoading} />
    </>
  );
}
