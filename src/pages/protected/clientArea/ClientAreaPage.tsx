import { useClient } from "../../../contexts/ClientContext";
import InvoiceForm from "./components/InvoiceForm";
import TimeRemaining from "./components/TimeRemaining";

const ClientAreaPage = () => {
  const { isLoading, getSummary } = useClient();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] p-8">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">
            Carregando dashboard...
          </h2>
          <p className="text-gray-600">
            Buscando suas informações mais recentes
          </p>
        </div>
      </div>
    );
  }

  const quickLinks = [
    {
      title: "Jogar Agora",
      description: "Use suas chances disponíveis",
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z"
            clipRule="evenodd"
          />
        </svg>
      ),
      href: "/jogar-agora",
      color: "primary",
      available: (getSummary()?.opportunitiesNotUsed || 0) > 0,
    },
    {
      title: "Números da Sorte",
      description: "Veja todos os seus números",
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      href: "/numeros-da-sorte",
      color: "secondary",
      available: true,
    },
    {
      title: "Lista de Chances",
      description: "Histórico de participações",
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"
            clipRule="evenodd"
          />
        </svg>
      ),
      href: "/lista-de-chances",
      color: "gray",
      available: true,
    },
  ];

  return (
    <div className="p-6 lg:p-8">
      {/* Page Header */}
      <div className="mb-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
            <p className="text-gray-600">
              Acompanhe seu progresso no sorteio de brindes
            </p>
          </div>
          <TimeRemaining />
        </div>
      </div>

      <InvoiceForm />

      {/* Stats Cards */}
      <div className="grid lg:grid-cols-3 gap-6 mb-8">
        {/* Chances Card */}
        <div className="card p-6 hover-lift">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-1">
                Chances Disponíveis
              </h3>
              <p className="text-gray-600 text-sm">
                Use para abrir a caixa da sorte
              </p>
            </div>
            <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-end space-x-2">
              <span className="text-3xl font-bold text-gray-900">
                {getSummary()?.opportunitiesNotUsed || 0}
              </span>
              <span className="text-lg text-gray-500 mb-1">
                / {getSummary()?.opportunitiesTotal || 0}
              </span>
            </div>

            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-primary h-2 rounded-full transition-all duration-500"
                style={{
                  width: `${
                    ((getSummary()?.opportunitiesNotUsed || 0) /
                      (getSummary()?.opportunitiesTotal || 0)) *
                    100
                  }%`,
                }}
              ></div>
            </div>

            <div className="flex justify-between text-sm">
              <span className="text-gray-600">
                {getSummary()?.opportunitiesNotUsed || 0} utilizadas
              </span>
              <span className="text-primary font-medium">
                {Math.round(
                  ((getSummary()?.opportunitiesNotUsed || 0) /
                    (getSummary()?.opportunitiesTotal || 1)) *
                    100
                )}
                % disponível
              </span>
            </div>
          </div>
        </div>

        {/* Lucky Numbers Card */}
        <div className="card p-6 hover-lift">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-1">
                Números da Sorte
              </h3>
              <p className="text-gray-600 text-sm">Gerados até agora</p>
            </div>
            <div className="w-12 h-12 bg-green-600/10 text-green-600 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>

          <div className="space-y-3">
            <div className="text-3xl font-bold text-gray-900">
              {getSummary()?.drawNumbersTotal || 0}
            </div>

            <div className="text-sm text-gray-600">
              Cada número é uma chance de ganhar!
            </div>
          </div>
        </div>

        {/* Invoices Card */}
        <div className="card p-6 hover-lift">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-1">
                Notas Fiscais
              </h3>
              <p className="text-gray-600 text-sm">Cadastradas no sistema</p>
            </div>
            <div className="w-12 h-12 bg-secondary/10 text-secondary rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>

          <div className="space-y-3">
            <div className="text-3xl font-bold text-gray-900">
              {getSummary()?.invoicesTotal || 0}
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Ações Rápidas</h2>

        <div className="grid md:grid-cols-3 gap-6">
          {quickLinks.map((link, index) => (
            <a
              key={index}
              href={link.href}
              className={`card p-6 group transition-all duration-300 hover:-translate-y-1 hover:shadow-medium ${
                !link.available ? "opacity-50 cursor-not-allowed" : "hover-lift"
              }`}
              onClick={!link.available ? (e) => e.preventDefault() : undefined}
            >
              <div className="flex items-start space-x-4">
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors duration-300 ${
                    link.color === "primary"
                      ? "bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white"
                      : link.color === "secondary"
                      ? "bg-secondary/10 text-secondary group-hover:bg-secondary group-hover:text-white"
                      : "bg-gray-100 text-gray-600 group-hover:bg-gray-600 group-hover:text-white"
                  }`}
                >
                  {link.icon}
                </div>

                <div className="flex-1">
                  <h3
                    className={`font-bold text-gray-900 mb-1 transition-colors duration-300 ${
                      link.color === "primary"
                        ? "group-hover:text-primary"
                        : link.color === "secondary"
                        ? "group-hover:text-secondary"
                        : ""
                    }`}
                  >
                    {link.title}
                  </h3>
                  <p className="text-gray-600 text-sm">{link.description}</p>

                  {!link.available && (
                    <span className="inline-block mt-2 text-xs text-red-600 bg-red-50 px-2 py-1 rounded-full">
                      Indisponível
                    </span>
                  )}
                </div>

                <div className="flex-shrink-0">
                  <svg
                    className="w-5 h-5 text-gray-400 group-hover:text-primary transition-colors duration-300"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ClientAreaPage;
