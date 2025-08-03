import { useForm } from "react-hook-form";
import { loginSchema, type LoginCredentials } from "../../../types/Auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { InputMask } from "@react-input/mask";
import { useAuth } from "../../../contexts/AuthContext";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import StringUtils from "../../../utils/StringUtils";
import { useClient } from "../../../contexts/ClientContext";

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

  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const { me, client } = useClient();
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
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label
          htmlFor="cpf"
          className="block text-sm font-bold text-gray-700 mb-2"
        >
          CPF *
        </label>
        {!client ? (
          <>
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
          </>
        ) : (
          <p>{`Você está acessando como ${client.name}`}</p>
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
  );
};
export default PreRegistrationForm;
