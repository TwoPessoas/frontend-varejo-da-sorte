import { useNavigate } from "react-router-dom";
import { useClient } from "../../../contexts/ClientContext";
import InvoiceForm from "./components/InvoiceForm";
import TimeRemaining from "./components/TimeRemaining";

const ClientAreaPage = () => {
  const { isLoading, getSummary } = useClient();
  const navigate = useNavigate();

  const handleOnClick = (url: string) => {
    navigate(url);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] p-8">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">
            Carregando área do clientge...
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
      title: "Abrir Caixa de presente",
      description: "Use suas chances disponíveis",
      icon: (
        <svg
          enable-background="new 0 0 32 32"
          version="1.1"
          viewBox="0 0 32 32"
          className="h-8 w-8"
        >
          <g id="Layer_1" />
          <g id="Layer_2">
            <g>
              <rect
                fill="none"
                height="16"
                stroke="#ffffff"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-miterlimit="10"
                stroke-width="2"
                width="24"
                x="4"
                y="14"
              />
              <rect
                fill="none"
                height="6"
                stroke="#ffffff"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-miterlimit="10"
                stroke-width="2"
                width="28"
                x="2"
                y="8"
              />
              <rect
                fill="none"
                height="16"
                stroke="#ffffff"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-miterlimit="10"
                stroke-width="2"
                width="6"
                x="13"
                y="14"
              />
              <rect
                fill="none"
                height="6"
                stroke="#ffffff"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-miterlimit="10"
                stroke-width="2"
                width="6"
                x="13"
                y="8"
              />
              <polygon
                fill="none"
                points="    16,7 19,4 18,2 16,2 14,2 13,4   "
                stroke="#ffffff"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-miterlimit="10"
                stroke-width="2"
              />
              <polyline
                fill="none"
                points="    19,4 23,3 25,5 25,8   "
                stroke="#ffffff"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-miterlimit="10"
                stroke-width="2"
              />
              <polyline
                fill="none"
                points="    13,4 9,3 7,5 7,8   "
                stroke="#ffffff"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-miterlimit="10"
                stroke-width="2"
              />
            </g>
          </g>
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
        <svg
          viewBox="0 0 256 256"
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8"
        >
          <rect fill="none" height="256" width="256" />
          <line
            fill="none"
            stroke="#0057cc"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="16"
            x1="96"
            x2="96"
            y1="56"
            y2="200"
          />
          <path
            d="M24,167.2a7.9,7.9,0,0,1,6.4-7.8,32.1,32.1,0,0,0,0-62.8A7.9,7.9,0,0,1,24,88.8V64a8,8,0,0,1,8-8H224a8,8,0,0,1,8,8V88.8a7.9,7.9,0,0,1-6.4,7.8,32.1,32.1,0,0,0,0,62.8,7.9,7.9,0,0,1,6.4,7.8V192a8,8,0,0,1-8,8H32a8,8,0,0,1-8-8Z"
            fill="none"
            stroke="#0057cc"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="16"
          />
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
        <svg version="1.1" viewBox="0 0 20 20" className="h-8 w-8">
          <title />
          <desc />
          <defs />
          <g
            fill="none"
            fill-rule="evenodd"
            id="Page-1"
            stroke="none"
            stroke-width="1"
          >
            <g
              fill="#0057cc"
              id="Core"
              transform="translate(-128.000000, -86.000000)"
            >
              <g
                id="check-circle-outline"
                transform="translate(128.000000, 86.000000)"
              >
                <path d="M5.9,8.1 L4.5,9.5 L9,14 L19,4 L17.6,2.6 L9,11.2 L5.9,8.1 L5.9,8.1 Z M18,10 C18,14.4 14.4,18 10,18 C5.6,18 2,14.4 2,10 C2,5.6 5.6,2 10,2 C10.8,2 11.5,2.1 12.2,2.3 L13.8,0.7 C12.6,0.3 11.3,0 10,0 C4.5,0 0,4.5 0,10 C0,15.5 4.5,20 10,20 C15.5,20 20,15.5 20,10 L18,10 L18,10 Z" />
              </g>
            </g>
          </g>
        </svg>
      ),
      href: "/lista-de-chances",
      color: "default",
      available: true,
    },
  ];

  return (
    <div className="p-4 lg:p-8 dashboard-area">
      {/* Page Header */}
      <div className="mb-8">
        <img
          src="./imgs/logo-campanha.png"
          className="mb-6 max-w-[280px] mx-auto"
          alt=""
        />
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between lg:flex">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">
              Área do Cliente
            </h1>
            <p className="text-gray-200">Cadestre suas compras e boa sorte</p>
          </div>

          <TimeRemaining />
        </div>
      </div>

      <InvoiceForm />

      {/* Quick Actions */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white mb-6">Ações Rápidas</h2>

        <div className="grid md:grid-cols-3 gap-6">
          {quickLinks.map((link, index) => (
            <a
              key={index}
              onClick={() => handleOnClick(link.href)}
              className={` p-6 group rounded-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-medium ${
                !link.available
                  ? "opacity-100 cursor-not-allowed"
                  : "hover-lift"
              }  ${
                link.color === "primary"
                  ? "bg-primary text-white group-hover:text-white"
                  : link.color === "secondary"
                  ? "bg-secondary-700 group-hover:text-secondary"
                  : link.color === "default"
                  ? "bg-gray-200 text-primary group-hover:text-primary-700"
                  : ""
              }`}
            >
              <div className="flex items-start space-x-4">
                <div
                  className={`flex items-center justify-center transition-colors duration-300 `}
                >
                  {link.icon}
                </div>

                <div className="flex-1">
                  <h3
                    className={`font-bold  text-base mb-1 transition-colors duration-300 ${
                      link.color === "primary"
                        ? "text-white group-hover:text-white"
                        : link.color === "secondary"
                        ? "text-primary group-hover:text-secondary"
                        : link.color === "default"
                        ? "text-primary  group-hover:text-primary-700"
                        : ""
                    }`}
                  >
                    {link.title}
                  </h3>
                  <p
                    className={` text-sm ${
                      link.color === "primary"
                        ? "text-white group-hover:text-white"
                        : link.color === "secondary"
                        ? "text-white group-hover:text-secondary"
                        : link.color === "default"
                        ? "text-gray-600  group-hover:text-primary-700"
                        : ""
                    }`}
                  >
                    {link.description}
                  </p>

                  {!link.available && (
                    <span className="inline-block mt-2 text-xs text-red-600 bg-red-50 px-2 py-1 rounded-full">
                      Indisponível
                    </span>
                  )}
                </div>

                <div className="flex-shrink-0">
                  <svg
                    className="w-5 h-5 text-gray-white/80 group-hover:text-white transition-colors duration-300"
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

      {/* Stats Cards */}
      <div>
        <h2 className="text-2xl font-bold text-white mb-6">
          Informações gerais
        </h2>

        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          {/* Chances Card */}
          <div className="card p-4 hover-lift">
            <div className="flex items-center justify-between mb-4 flex-wrap">
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">
                  Chances Disponíveis
                </h3>
              </div>
              <div className="flex items-start justify-end space-x-2 w-10">
                <span className="text-sm sm:text-3xl font-bold text-gray-900">
                  {getSummary()?.opportunitiesNotUsed || 0}
                </span>
                <span className="text-sm sm:text-lg text-gray-500 mb-1">
                  / {getSummary()?.opportunitiesTotal || 0}
                </span>
              </div>
              <p className="text-gray-600 text-sm">
                Use para abrir a caixa da sorte
              </p>
            </div>

            <div className="space-y-3">
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
          <div className="card p-4 hover-lift">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">
                  Números da Sorte
                </h3>
                <p className="text-gray-600 text-sm">Gerados até agora</p>
              </div>
              <div className="text-xl font-bold text-gray-900">
                {getSummary()?.drawNumbersTotal || 0}
              </div>
            </div>

            <div className="space-y-3">
              <div className="text-sm text-gray-600">
                Cada número é uma chance de ganhar!
              </div>
            </div>
          </div>

          {/* Invoices Card */}
          <div className="card p-4 hover-lift">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">
                  Notas Fiscais
                </h3>
                <p className="text-gray-600 text-sm">Cadastradas no sistema</p>
              </div>
              <div className="text-xl font-bold text-gray-900">
                {getSummary()?.invoicesTotal || 0}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientAreaPage;
