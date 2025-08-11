import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const SecurityChangeConsentPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { isLoading, updateSecurityToken } = useAuth();

  const [pageState, setPageState] = useState("loading"); // loading, success, error, invalid
  const [errorMessage, setErrorMessage] = useState("");

  // Capturar token da URL
  const token = searchParams.get("q");

  useEffect(() => {
    const validateToken = () => {
      // Verificar se existe token na URL
      if (!token) {
        setPageState("invalid");
        return;
      } else {
        setPageState("success");
      }
    };

    validateToken();
  }, [token]);

  const handleConsent = async (consent: boolean) => {
    try {
      if (!token) return;

      if (!consent) {
        setPageState("rejected");
        return;
      }

      // Simular chamada da API para validar o token
      // Substituir por chamada real da API
      const response = await updateSecurityToken(token);

      if (response.success) {
        setPageState("approved");
      } else {
        setErrorMessage(response.message || "Token inválido ou expirado");
        setPageState("error");
      }
    } catch (error: any) {
      console.error("Erro ao validar token:", error);
      setErrorMessage(
        error.message || "Erro interno do servidor. Tente novamente mais tarde."
      );
      setPageState("error");
    }
  };

  const goToHome = () => {
    navigate("/");
  };

  // Loading State
  if (pageState === "loading" || isLoading) {
    return (
      <div className="min-h-screen bg-default-bg flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-strong p-8 text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">
            {pageState === "loading"
              ? "Validando solicitação..."
              : "Processando sua resposta..."}
          </h2>
          <p className="text-gray-600">
            {pageState === "loading"
              ? "Aguarde enquanto verificamos a autenticidade da solicitação"
              : "Aguarde enquanto processamos sua decisão"}
          </p>
        </div>
      </div>
    );
  }

  // Invalid Token State
  if (pageState === "invalid") {
    return (
      <div className="min-h-screen bg-default-bg flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-strong p-8 text-center">
          <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Link Inválido
          </h2>
          <p className="text-gray-600 mb-6">
            O link que você acessou é inválido ou está mal formatado. Verifique
            se copiou o link completo do e-mail.
          </p>
          <button onClick={goToHome} className="btn-primary w-full">
            Ir para o Site
          </button>
        </div>
      </div>
    );
  }

  // Error State
  if (pageState === "error") {
    return (
      <div className="min-h-screen bg-default-bg flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-strong p-8 text-center">
          <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Erro na Validação
          </h2>
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <p className="text-red-700 text-sm">{errorMessage}</p>
          </div>
          <div className="space-y-3">
            <button
              onClick={() => window.location.reload()}
              className="btn-outline w-full"
            >
              Tentar Novamente
            </button>
            <button onClick={goToHome} className="btn-ghost w-full">
              Ir para o Site
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Success State - Aguardando consentimento
  if (pageState === "success") {
    return (
      <div className="min-h-screen bg-default-bg flex items-center justify-center p-4">
        <div className="max-w-lg w-full bg-white rounded-2xl shadow-strong overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-primary to-secondary p-6 text-white text-center">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <h1 className="text-2xl font-bold mb-2">
              Confirmação de Segurança
            </h1>
            <p className="text-primary-100">
              Solicitação de alteração de token de segurança
            </p>
          </div>

          {/* Content */}
          <div className="p-8">
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
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
                <div>
                  <h4 className="font-bold text-amber-900 mb-1">
                    ⚠️ Importante
                  </h4>
                  <p className="text-amber-800 text-sm">
                    Alguém solicitou a alteração do token de segurança associado
                    ao seu CPF. Se você não fez esta solicitação,{" "}
                    <strong>REJEITE</strong> imediatamente e entre em contato
                    conosco.
                  </p>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="font-bold text-gray-900 mb-3">
                Você autoriza esta alteração?
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                Esta ação não pode ser desfeita. Escolha com cuidado.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => handleConsent(false)}
                className="flex items-center justify-center space-x-2 px-6 py-3 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition-colors duration-200"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>Rejeitar</span>
              </button>

              <button
                onClick={() => handleConsent(true)}
                className="flex items-center justify-center space-x-2 px-6 py-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition-colors duration-200"
              >
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
                <span>Autorizar</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Approved State
  if (pageState === "approved") {
    return (
      <div className="min-h-screen bg-default-bg flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-strong p-8 text-center">
          <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            ✅ Alteração Autorizada
          </h2>
          <p className="text-gray-600 mb-6">
            Você autorizou com sucesso a alteração do token de segurança. A
            mudança será processada em alguns minutos.
          </p>
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
            <p className="text-green-700 text-sm">
              <strong>Importante:</strong> Você receberá um e-mail de
              confirmação quando a alteração for concluída.
            </p>
          </div>
          <button onClick={goToHome} className="btn-primary w-full">
            Ir para o Site
          </button>
        </div>
      </div>
    );
  }

  // Rejected State
  if (pageState === "rejected") {
    return (
      <div className="min-h-screen bg-default-bg flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-strong p-8 text-center">
          <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            ❌ Alteração Rejeitada
          </h2>
          <p className="text-gray-600 mb-6">
            Você rejeitou a solicitação de alteração do token de segurança.
            Nenhuma mudança foi realizada em sua conta.
          </p>
          <div className="space-y-3">
            <button onClick={goToHome} className="btn-primary w-full">
              Ir para o Site
            </button>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default SecurityChangeConsentPage;
