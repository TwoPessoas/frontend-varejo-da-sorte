import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Scanner,
  type IDetectedBarcode,
  type IScannerStyles,
} from "@yudiel/react-qr-scanner";
import { useEffect, useRef, useState } from "react";
import type { InvoiceResponse } from "../../../../types/Invoice";
import { useClient } from "../../../../contexts/ClientContext";
import { useCurrencyFormatter } from "../../../../utils/NumberUtils";

const invoiceSchema = z.object({
  fiscalCode: z
    .string()
    .length(44, { message: "O código deve conter exatamente 44 caracteres." })
    .regex(/^\d+$/, { message: "O código deve conter apenas números." }),
});

export type InvoiceCredentials = z.infer<typeof invoiceSchema>;

const InvoiceForm = () => {
  const [invoiceFormState, setInvoiceFormState] = useState("initial"); // initial, submitting, success, error
  const [submissionResultMessage, setSubmissionResultMessage] =
    useState<InvoiceResponse | null>(null);
  const [showQrReader, setShowQrReader] = useState(false);
  const [showHelpTooltip, setShowHelpTooltip] = useState(false);
  const { addInvoice } = useClient();
  const { formatCurrency } = useCurrencyFormatter();
  const tooltipRef = useRef(null); // Ref para o tooltip
  const isInited = useRef(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    reset,
  } = useForm<InvoiceCredentials>({
    resolver: zodResolver(invoiceSchema),
    defaultValues: {
      fiscalCode: "",
    },
  });

  // --- Lógica para fechar tooltip ao clicar fora ---
  useEffect(() => {
    if (isInited.current) return;
    isInited.current = true;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        tooltipRef.current &&
        !(tooltipRef.current as HTMLElement).contains(event.target as Node)
      ) {
        setShowHelpTooltip(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // --- Submissão do Formulário de Nota Fiscal ---
  const onSubmitInvoice = async (data: InvoiceCredentials) => {
    setInvoiceFormState("submitting");
    setSubmissionResultMessage(null);

    try {
      const result = await addInvoice(data);
      if (!result || result.status !== "success") {
        throw new Error(result?.message || "Erro ao cadastrar nota fiscal.");
      }
      setInvoiceFormState("success");
      setSubmissionResultMessage(result);
      reset();
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      setSubmissionResultMessage({
        status: "error",
        message: message || "Erro ao cadastrar nota fiscal.",
      });
      setInvoiceFormState("error");
    }
  };

  // --- Lógica do QR Reader ---
  const handleScan = (data: IDetectedBarcode[]) => {
    if (data.length > 0) {
      // Assumindo que o QR Code contém apenas o código da nota fiscal
      // Pode ser necessário parsear o QR Code se ele contiver mais dados
      const scannedCode = data[0].rawValue.replace(/\D/g, "").substring(0, 44); // Limita a 44 caracteres numéricos
      alert("Código escaneado:" + JSON.stringify(data));
      setValue("fiscalCode", scannedCode, { shouldValidate: true });
      setShowQrReader(false);
    }
  };

  const handleError = (err: unknown) => {
    console.error(err);
    alert("Erro ao acessar a câmera. Verifique as permissões.");
    setShowQrReader(false);
  };

  const getStyles = (): IScannerStyles => {
    return {
      container: { width: "100%", padding: "20px 0" },
      video: { borderRadius: "8px" },
    };
  };

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold text-white mb-6">
        Cadastrar Nota Fiscal
      </h2>
      <div className="card p-6 overflow-visible">
        {invoiceFormState === "success" && submissionResultMessage ? (
          // --- Card de Sucesso ---
          <div className="flex flex-col items-center justify-center text-center py-4">
            <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4">
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Nota Fiscal Cadastrada com Sucesso!
            </h3>
            <p className="text-gray-600 mb-6">
              Suas chances foram adicionadas e seus números gerados.
            </p>

            <div className="bg-gray-50 p-6 rounded-xl w-full text-left space-y-4">
              {/* Produtos Participantes */}
              <div>
                <span className="font-bold text-gray-800">
                  Produtos Participantes:{" "}
                </span>
                {submissionResultMessage?.data?.invoice.hasItem ? (
                  <span className="text-green-600 font-medium">Sim</span>
                ) : (
                  <span className="text-red-600 font-medium">Não</span>
                )}

                {/* 
                {submissionResultMessage?.data?.invoice.hasItem && (
                  <ul className="list-disc list-inside text-gray-700 text-sm">
                    {submissionResultMessage?.data?.products
                      .slice(0, 3)
                      .map((product, idx) => (
                        <li key={idx}>{product.description}</li>
                      ))}
                  </ul>
                )} 
                 */}

              </div>

              {/* Cartão de Crédito da Promoção */}
              <div>
                <span className="font-bold text-gray-800">
                  Usou Cartão da Promoção:{" "}
                </span>
                {submissionResultMessage?.data?.invoice.hasCreditcard ? (
                  <span className="text-green-600 font-medium">Sim</span>
                ) : (
                  <span className="text-red-600 font-medium">Não</span>
                )}
              </div>

              {/* Valor da Nota */}
              <div>
                <span className="font-bold text-gray-800">
                  Valor da Nota Fiscal:{" "}
                </span>
                <span className="text-gray-700">
                  R${" "}
                  {formatCurrency(
                    submissionResultMessage?.data?.invoice.invoceValue
                  )}
                </span>
              </div>

              {/* Multiplicador */}
              <div>
                <span className="font-bold text-gray-800">Multiplicador: </span>
                {submissionResultMessage?.data?.invoice.hasCreditcard ||
                submissionResultMessage?.data?.invoice.hasItem ? (
                  <span className="text-green-600 font-medium">Sim</span>
                ) : (
                  <span className="text-red-600 font-medium">Não</span>
                )}
              </div>

              {/* Chances Ganhas */}
              <div>
                <span className="font-bold text-gray-800">
                  Chances Ganhas:{" "}
                </span>
                <span className="text-primary font-bold text-lg">
                  {submissionResultMessage?.data?.invoiceGameChances}
                </span>
              </div>

              {/* Números da Sorte Gerados */}
              <div>
                <span className="font-bold text-gray-800">
                  Números da Sorte Gerados:{" "}
                </span>
                <div className="flex flex-wrap gap-2 mt-1">
                  {submissionResultMessage?.data?.drawNumbers.map(
                    (num, idx) => (
                      <span
                        key={idx}
                        className="bg-primary/10 text-primary px-2 py-1 rounded text-sm font-mono font-bold"
                      >
                        {num}
                      </span>
                    )
                  )}
                </div>
              </div>
            </div>

            <button
              onClick={() => setInvoiceFormState("initial")}
              className="btn-primary mt-6"
            >
              Cadastrar Nova Nota Fiscal
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmitInvoice)} className="space-y-4">
            {/* Exibição de Erro */}
            {invoiceFormState === "error" && submissionResultMessage && (
              <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg flex items-start space-x-3 alert-box">
                <svg
                  className="w-5 h-5 flex-shrink-0 mt-0.5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
                <p className="text-sm">{submissionResultMessage.message}</p>
              </div>
            )}
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Código da Nota Fiscal (44 caracteres)
            </label>

            <div className="flex flex-col sm:flex-row gap-3 items-start">
              <div className="relative flex-grow w-full sm:w-auto">
                <input
                  type="text"
                  {...register("fiscalCode")}
                  className={`input pr-10 ${
                    errors.fiscalCode ? "input-error" : ""
                  }`}
                  placeholder="Digite o código da nota fiscal"
                  maxLength={44}
                  inputMode="numeric"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <button
                    type="button"
                    onClick={() => setShowHelpTooltip(!showHelpTooltip)}
                    className="text-gray-400 hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary/50 rounded-full p-1 transition-colors duration-200"
                    aria-label="Onde encontrar o código da nota fiscal"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>

                {showHelpTooltip && (
                  <div
                    ref={tooltipRef}
                    className="absolute z-10 w-64 p-3 mt-2 text-sm text-gray-700 bg-blue-100 rounded-lg shadow-lg border border-blue-600 right-0 transform translate-x-1/4 md:translate-x-0"
                  >
                    <h4 className="font-bold mb-2 text-base">Onde encontrar o código?</h4>
                    <img
                      src="./imgs/nota-fiscal.jpg" // Substitua pela sua imagem real
                      alt="Exemplo de localização do código da nota fiscal"
                      className="w-full h-auto rounded"
                    />
                    <p className="mt-2">
                      Geralmente, o código de 44 dígitos fica no rodapé da nota,
                      após a chave de acesso.
                    </p>
                  </div>
                )}
              </div>

              <button
                type="button"
                onClick={() => setShowQrReader(!showQrReader)}
                className="btn-secondary flex-shrink-0 flex items-center justify-center space-x-2 w-full sm:w-auto"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h14a1 1 0 001-1V5a1 1 0 00-1-1H3zm0 2h14v8H3V6zm4 1a1 1 0 00-1 1v2a1 1 0 102 0V8a1 1 0 00-1-1zm5 0a1 1 0 00-1 1v2a1 1 0 102 0V8a1 1 0 00-1-1z" />
                </svg>
                <span>{showQrReader ? "Fechar QR" : "Ler QR Code"}</span>
              </button>
            </div>

            {errors.fiscalCode && (
              <p className="error-message">{errors.fiscalCode.message}</p>
            )}

            {showQrReader && (
              <div className="mt-4 p-4 border border-gray-200 rounded-lg bg-gray-50 text-center">
                <h4 className="text-gray-800 font-bold mb-2">
                  Posicione o QR Code na câmera
                </h4>
                <div className="w-full max-w-sm mx-auto overflow-hidden rounded-lg">
                  <Scanner
                    onScan={handleScan}
                    onError={handleError}
                    constraints={{ facingMode: "environment" }} // Prioriza câmera traseira
                    scanDelay={500} // Atraso na leitura para melhor performance
                    styles={getStyles()}
                  />
                </div>
              </div>
            )}

            <button
              type="submit"
              className="btn-primary w-full mt-4"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <span className="spinner mr-2 submit-spinner"></span>
                  Processando...
                </>
              ) : (
                "Cadastrar Nota Fiscal"
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default InvoiceForm;
