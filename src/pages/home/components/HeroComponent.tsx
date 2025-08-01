import { useState } from "react";

const HeroComponent = () => {
  const [cpf, setCpf] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Função para formatar CPF (XXX.XXX.XXX-XX)
  const formatCPF = (value: string) => {
    const numbers = value.replace(/\D/g, "");
    return numbers
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})/, "$1-$2")
      .replace(/(-\d{2})\d+?$/, "$1");
  };

  // Função para validar CPF
  const validateCPF = (cpf: string) => {
    const numbers = cpf.replace(/\D/g, "");

    if (numbers.length !== 11) return false;

    // Verifica se todos os números são iguais
    if (/^(\d)\1{10}$/.test(numbers)) return false;

    // Validação do primeiro dígito verificador
    let sum = 0;
    for (let i = 0; i < 9; i++) {
      sum += parseInt(numbers.charAt(i)) * (10 - i);
    }
    let digit = 11 - (sum % 11);
    if (digit === 10 || digit === 11) digit = 0;
    if (digit !== parseInt(numbers.charAt(9))) return false;

    // Validação do segundo dígito verificador
    sum = 0;
    for (let i = 0; i < 10; i++) {
      sum += parseInt(numbers.charAt(i)) * (11 - i);
    }
    digit = 11 - (sum % 11);
    if (digit === 10 || digit === 11) digit = 0;
    if (digit !== parseInt(numbers.charAt(10))) return false;

    return true;
  };

  const handleCpfChange = (e: any) => {
    const formattedValue = formatCPF(e.target.value);
    setCpf(formattedValue);

    // Limpa erro quando usuário começa a digitar
    if (error) setError("");
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!cpf.trim()) {
      setError("Por favor, digite seu CPF");
      return;
    }

    if (!validateCPF(cpf)) {
      setError("CPF inválido. Verifique os números digitados");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      // Simular chamada da API
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Aqui você faria a chamada real para sua API
      console.log("CPF enviado:", cpf.replace(/\D/g, ""));

      // Exemplo de sucesso
      alert("CPF cadastrado com sucesso! Boa sorte no sorteio!");
    } catch (err) {
      setError("Erro ao processar seu CPF. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setCpf("");
    setError("");
    setIsLoading(false);
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-default-bg to-secondary/5 overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-pattern opacity-30"></div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-primary/10 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute bottom-32 right-16 w-32 h-32 bg-secondary/10 rounded-full blur-xl animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-primary/5 rounded-full blur-lg animate-pulse delay-500"></div>

      <div className="container relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main Heading */}
          <div className="mb-8 fade-in">
            <h1 className="text-responsive-xl font-bold text-gray-900 mb-6 text-balance">
              Participe do Nosso
              <span className="text-gradient block mt-2">
                Sorteio de Brindes
              </span>
            </h1>
            <p className="text-responsive-md text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Cadastre seu CPF e concorra a prêmios incríveis! É rápido, fácil e
              totalmente gratuito.
            </p>
          </div>

          {/* Form Card */}
          <div className="max-w-md mx-auto fade-in">
            <div className="card p-8 shadow-strong">
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Faça seu Cadastro
                </h3>
                <p className="text-gray-600">Digite seu CPF para participar</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="cpf"
                    className="block text-sm font-bold text-gray-700 mb-2"
                  >
                    CPF *
                  </label>
                  <input
                    type="text"
                    id="cpf"
                    value={cpf}
                    onChange={handleCpfChange}
                    placeholder="000.000.000-00"
                    className={`input ${error ? "input-error" : ""}`}
                    disabled={isLoading}
                  />
                  {error && <p className="error-message">{error}</p>}
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
                      Utilizamos criptografia para proteger suas informações
                      pessoais
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="mt-12 fade-in">
            <p className="text-lg text-gray-600 mb-6">
              Não perca esta oportunidade única!
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-500">
              <div className="flex items-center space-x-2">
                <svg
                  className="w-4 h-4 text-primary"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>100% Gratuito</span>
              </div>
              <div className="flex items-center space-x-2">
                <svg
                  className="w-4 h-4 text-primary"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>Cadastro Rápido</span>
              </div>
              <div className="flex items-center space-x-2">
                <svg
                  className="w-4 h-4 text-primary"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>Dados Seguros</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-gray-400 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroComponent;
