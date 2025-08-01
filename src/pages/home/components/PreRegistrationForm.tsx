import { useForm } from "react-hook-form";
import { loginSchema, type LoginCredentials } from "../../../types/Auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { LogIn, XCircle } from "lucide-react";
import { InputMask } from "@react-input/mask";

interface PreRegistrationFormProps {
  onSubmit: (data: LoginCredentials) => Promise<void>; // Função chamada no submit
  isLoading?: boolean; // Estado de carregamento para o botão de submit
}

export default function PreRegistrationForm({
  onSubmit,
  isLoading = false,
}: PreRegistrationFormProps) {
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
}
