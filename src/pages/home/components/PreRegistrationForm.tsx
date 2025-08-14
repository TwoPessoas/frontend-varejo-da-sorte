import { useForm } from "react-hook-form";
import { loginSchema, type LoginCredentials } from "../../../types/Auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { InputMask } from "@react-input/mask";
import { useAuth } from "../../../contexts/AuthContext";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import StringUtils from "../../../utils/StringUtils";
import { useClient } from "../../../contexts/ClientContext";
import { useNavigate } from "react-router-dom";

const PreRegistrationForm = () => {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<LoginCredentials>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      cpf: "",
    },
  });

  const navigate = useNavigate();
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const { me, client, clear } = useClient();
  const isInited = useRef(false);

  useEffect(() => {
    if (isInited.current) return;

    isInited.current = true;
    const getMe = async () => {
      await me();
    };

    getMe();
  }, []);

  const onSubmit = async (data: LoginCredentials) => {
    try {
      setIsLoading(true);

      if (!data.cpf.trim()) {
        toast.error("Por favor, digite seu CPF");
        return;
      }

      if (!StringUtils.validateCPF(data.cpf)) {
        toast.error("CPF inválido. Verifique os números digitados");
        return;
      }

      const result = await login(data);
      if (!result.success) {
        toast.error(
          result.message ||
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

  const handleReset = () => {
    reset();
    setIsLoading(false);
  };

  return (
    <div className="max-w-md mx-auto fade-in">
      <div className="card p-8 shadow-strong">
        {!client ? (
          <>
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Faça seu Cadastro
              </h3>
              <p className="text-gray-600">Digite seu CPF para participar</p>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label
                  htmlFor="cpf"
                  className="block text-sm font-bold text-gray-700 mb-2"
                >
                  CPF *
                </label>

                <InputMask
                  type="tel"
                  mask="___.___.___-__"
                  replacement={{ _: /\d/ }}
                  placeholder="999.999.999-99"
                  {...register("cpf")}
                  onChange={(e) => setValue("cpf", e.target.value)}
                  className={`input ${errors.cpf ? "input-error" : ""}`}
                  disabled={isLoading}
                />
                {errors.cpf && (
                  <p className="error-message">{errors.cpf.message}</p>
                )}
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="btn-primary flex-1 relative"
                >
                  {isLoading ? (
                    <>
                      <span className="spinner mr-2"></span>
                      Processando...
                    </>
                  ) : (
                    "Participar do Sorteio"
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleReset}
                  disabled={isLoading}
                  className="btn-outline sm:w-auto"
                >
                  Limpar
                </button>
              </div>
            </form>
          </>
        ) : (
          <>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              Identificamos seu cadastro
            </h3>
            <p className="text-gray-600 py-5">
              Você está acessando como{" "}
              <span className="font-bold">{` ${client.name}`}</span>
            </p>
            <div className="flex flex-col sm:flex-row gap-3 pt-5">
              <button
                disabled={isLoading}
                className="btn-primary flex-1 relative"
                onClick={() => navigate("/area-cliente")}
              >
                Minha área
              </button>

              <button
                type="button"
                onClick={() => clear()}
                disabled={isLoading}
                className="btn-outline sm:w-auto"
              >
                Não sou eu
              </button>
            </div>
          </>
        )}
        {/* Security Note */}
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <div className="flex items-start space-x-2">
            <svg
              className="w-5 h-5 text-primary mt-0.5 flex-shrink-0"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                clipRule="evenodd"
              />
            </svg>
            <div>
              <p className="text-sm font-medium text-gray-900">
                Seus dados estão seguros
              </p>
              <p className="text-xs text-gray-600 mt-1">
                Utilizamos criptografia para proteger suas informações pessoais
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default PreRegistrationForm;
