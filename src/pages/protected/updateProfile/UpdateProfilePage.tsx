import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { useClient } from "../../../contexts/ClientContext";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { InputMask } from "@react-input/mask";

// Esquema de validação Zod para os dados do cliente
const clientSchema = z.object({
  name: z
    .string()
    .nonempty("O nome é obrigatório")
    .min(3, "O nome deve ter pelo menos 3 caracteres")
    .regex(/^[A-Za-zÀ-ÿ\s]+$/, "Nome deve conter apenas letras e espaços"),
  cpf: z.string(),
  birthday: z
    .string()
    .nonempty("Data de nascimento é obrigatória")
    .regex(
      /^\d{4}-\d{2}-\d{2}$/,
      "Formato de data inválido. Use o seletor de data."
    )
    .refine(
      (dateStr) => {
        const today = new Date();
        const birthDate = new Date(dateStr);
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        if (
          monthDiff < 0 ||
          (monthDiff === 0 && today.getDate() < birthDate.getDate())
        ) {
          age--;
        }
        return age >= 18;
      },
      { message: "Você deve ter pelo menos 18 anos." }
    ),
  cel: z
    .string()
    .nonempty("Celular é obrigatório")
    .regex(
      /^\(\d{2}\) \d{5}-\d{4}$/,
      "O Celular deve estar no formato (99) 99999-9999"
    ),
  email: z.email("E-mail inválido").nonempty("E-mail é obrigatório"),
  dataConfirmation: z.boolean(),
  termsAcceptance: z.boolean(),
});

type ClientFormValues = z.infer<typeof clientSchema>;

const UpdateProfilePage = () => {
  const isInited = useRef(false);
  const { isLoading, updateClient, client, me } = useClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<ClientFormValues>({
    resolver: zodResolver(clientSchema),
    defaultValues: {
      name: client?.name,
      cpf: client?.cpf,
      birthday: client?.birthday || "",
      cel: client?.cel || "",
      email: client?.email || "",
      dataConfirmation: false,
      termsAcceptance: false,
    },
  });

  // Watch checkbox values
  const dataConfirmation = watch("dataConfirmation");
  const termsAcceptance = watch("termsAcceptance");

  // Simular carregamento dos dados do usuário
  useEffect(() => {
    if (isInited.current) return;
    isInited.current = true;

    me();
  }, []);

  // Submissão do formulário
  const onSubmit = async (data: ClientFormValues) => {
    try {
      await updateClient(data);

    } catch (error) {
      console.error("Erro ao atualizar perfil:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] p-8">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">
            Carregando dados...
          </h2>
          <p className="text-gray-600">Buscando suas informações atuais</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 lg:p-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          👤 Atualizar Dados Pessoais
        </h1>
        <p className="text-gray-600">
          Mantenha suas informações sempre atualizadas para garantir o
          recebimento dos prêmios
        </p>
      </div>

      <div className="max-w-2xl mx-auto">
        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="card p-8">
          <div className="space-y-6">
            {/* Nome Completo */}
            <div>
              <label className="block text-sm font-bold text-gray-900 mb-2">
                Nome Completo *
              </label>
              <input
                type="text"
                {...register("name")}
                className={`input ${
                  errors.name ? "border-red-500 focus:ring-red-500" : ""
                }`}
                placeholder="Digite seu nome completo"
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* CPF */}
            <div>
              <label className="block text-sm font-bold text-gray-900 mb-2">
                CPF *
              </label>
              <input
                type="tel"
                {...register("cpf", {
                    disabled: true,
                })}
                className={`input bg-gray-200 text-gray-90`}
              />
            </div>

            {/* Data de Nascimento */}
            <div>
              <label className="block text-sm font-bold text-gray-900 mb-2">
                Data de Nascimento *
              </label>
              <input
                type="date"
                {...register("birthday")}
                className={`input ${
                  errors.birthday ? "border-red-500 focus:ring-red-500" : ""
                }`}
                max={new Date().toISOString().split("T")[0]}
              />
              {errors.birthday && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.birthday.message}
                </p>
              )}
            </div>

            {/* Celular */}
            <div>
              <label className="block text-sm font-bold text-gray-900 mb-2">
                Celular *
              </label>
              <InputMask
                type="tel" // Alterado para text
                mask="(__) _____-____"
                replacement={{ _: /\d/ }}
                {...register("cel")}
                id="cel"
                className={`input ${
                  errors.cel ? "border-red-500 focus:ring-red-500" : ""
                }`}
                placeholder="(99) 99999-9999"
                onChange={(e:any) => setValue("cel", e.target.value)}
              />
              {errors.cel && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.cel.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-bold text-gray-900 mb-2">
                E-mail *
              </label>
              <input
                type="email"
                {...register("email")}
                className={`input ${
                  errors.email ? "border-red-500 focus:ring-red-500" : ""
                }`}
                placeholder="seu@email.com"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Alert Box - Confirmação de Dados */}
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <svg
                  className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                <div className="flex-1">
                  <h4 className="font-bold text-amber-900 mb-2">
                    ⚠️ Confirmação de Responsabilidade
                  </h4>
                  <div className="flex items-start space-x-3">
                    <input
                      type="checkbox"
                      {...register("dataConfirmation", {
                        required: "Você deve confirmar a veracidade dos dados",
                      })}
                      className="mt-1 w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                    />
                    <div>
                      <p className="text-amber-800 text-sm leading-relaxed">
                        <strong>
                          Confirmo que todos os dados preenchidos são reais e
                          verdadeiros, assumindo total responsabilidade pelas
                          informações fornecidas.
                        </strong>
                        Estou ciente de que dados falsos podem resultar na
                        desqualificação da participação no sorteio.
                      </p>
                      {errors.dataConfirmation && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.dataConfirmation.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Termos da Campanha */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  {...register("termsAcceptance", {
                    required: "Você deve aceitar os termos da campanha",
                  })}
                  className="mt-1 w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                />
                <div className="flex-1">
                  <p className="text-blue-800 text-sm leading-relaxed">
                    <strong>
                      Li e aceito os{" "}
                      <a
                        href="#terms"
                        className="text-primary hover:underline font-bold"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Termos e Condições da Campanha
                      </a>{" "}
                      e o{" "}
                      <a
                        href="#privacy"
                        className="text-primary hover:underline font-bold"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Regulamento do Sorteio
                      </a>
                      .
                    </strong>{" "}
                    Estou ciente das regras de participação e premiação.
                  </p>
                  {errors.termsAcceptance && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.termsAcceptance.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={isLoading || !dataConfirmation || !termsAcceptance}
                className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Atualizando dados...</span>
                  </>
                ) : (
                  <>
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>Atualizar Dados</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </form>

        {/* Info Section */}
        <div className="mt-8 card p-6">
          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center flex-shrink-0">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Informações Importantes
              </h3>
              <div className="space-y-2 text-sm text-gray-600">
                <p>• Todos os campos marcados com (*) são obrigatórios</p>
                <p>• Seus dados são protegidos conforme a LGPD</p>
                <p>
                  • Mantenha seus dados sempre atualizados para receber os
                  prêmios
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfilePage;
