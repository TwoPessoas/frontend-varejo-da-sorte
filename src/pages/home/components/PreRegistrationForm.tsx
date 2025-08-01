import { useForm } from "react-hook-form";
import { loginSchema, type LoginCredentials } from "../../../types/Auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { LogIn, XCircle } from "lucide-react";
import { InputMask } from "@react-input/mask";
import { useAuth } from "../../../contexts/AuthContext";
import { useState } from "react";
import toast from "react-hot-toast";
import moment from "moment";

const PreRegistrationForm = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<LoginCredentials>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      cpf: "",
    },
  });

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
      {/* Formulário de login */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* CPF */}
        <div className="form-group">
          <label htmlFor="cpf" className="form-label">
            CPF <span className="text-red-500">*</span>
          </label>
          <InputMask
            type="tel" // Alterado para text, pois tel pode ter comportamento diferente em alguns browsers
            mask="___.___.___-__"
            replacement={{ _: /\d/ }}
            placeholder="999.999.999-99"
            {...register("cpf")}
            onChange={(e) => setValue("cpf", e.target.value)} // Atualiza o valor no React Hook Form
            className={`form-input ${errors.cpf ? "border-red-300" : ""}`}
          />
          {errors.cpf && (
            <p className="form-error flex items-center">
              <XCircle className="w-4 h-4 mr-1" /> {errors.cpf.message}
            </p>
          )}
        </div>

        {/* Botão de submit */}
        <button
          type="submit"
          disabled={isLoading}
          className={`btn btn-primary w-full ${
            isLoading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {isLoading ? (
            <div className="flex items-center justify-center">
              <div className="loading-spinner mr-2"></div>
              Autenticando...
            </div>
          ) : (
            <div className="flex items-center justify-center">
              <LogIn className="w-4 h-4 mr-2" />
              Entrar
            </div>
          )}
        </button>
      </form>
    </>
  );
};
export default PreRegistrationForm;
