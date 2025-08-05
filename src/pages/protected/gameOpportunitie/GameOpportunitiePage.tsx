import { useState, useEffect, useRef } from "react";
import useGameOpportunity from "../../../hooks/useGameOpportunity";

export const GIFT_NAO_FOI_DESSA_VEZ = "Não foi dessa vez. Tente novamente!";

const GameOpportunitiePage = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("all");
  //const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("desc"); // desc = mais recente primeiro
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const { isLoading, opportunities, getMyOpportunities, clearOpportunities } = useGameOpportunity();
  const isInited = useRef(false);

  useEffect(() => {
    if (isInited.current) return;

    isInited.current = true;
    getMyOpportunities();

    return () => {
      clearOpportunities();
    };
  }, []);

  // Filtrar chances
  const filteredOpportunities = opportunities.filter((item) => {
    //const matchesSearch = item.gift?.includes(searchTerm) || true;

    let matchesPeriod = true;
    if (selectedPeriod !== "all") {
      const itemDate = new Date(item.createdAt);
      const today = new Date();

      switch (selectedPeriod) {
        case "today":
          matchesPeriod = itemDate.toDateString() === today.toDateString();
          break;
        case "week":
          const weekAgo = new Date(today);
          weekAgo.setDate(weekAgo.getDate() - 7);
          matchesPeriod = itemDate >= weekAgo;
          break;
        case "month":
          const monthAgo = new Date(today);
          monthAgo.setMonth(monthAgo.getMonth() - 1);
          matchesPeriod = itemDate >= monthAgo;
          break;
        default:
          matchesPeriod = true;
      }
    }

    //return matchesSearch && matchesPeriod;
    return matchesPeriod;
  });

  // Ordenar chances
  const sortedOpportunities = [...filteredOpportunities].sort((a, b) => {
    const dateA = new Date(a.createdAt);
    const dateB = new Date(b.createdAt);

    return sortOrder === "desc"
      ? dateB.getTime() - dateA.getTime()
      : dateA.getTime() - dateB.getTime();
  });

  // Paginação
  const totalPages = Math.ceil(sortedOpportunities.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedOpportunities = sortedOpportunities.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const formatDate = (dateString: string) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return date.toLocaleString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatDateShort = (dateString: string) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return date.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
    });
  };

  // Estatísticas
  const stats = {
    total: opportunities.length,
    used: opportunities.filter((o) => !!o.usedAt).length,
    available: opportunities.filter((o) => !o.usedAt).length,
    thisWeek: opportunities.filter((o) => {
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      return new Date(o.createdAt) >= weekAgo;
    }).length,
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] p-8">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">
            Carregando chances...
          </h2>
          <p className="text-gray-600">
            Buscando seu histórico de oportunidades
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 lg:p-8">
      {/* Page Header */}
      <div className="mb-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              🎲 Lista de Chances
            </h1>
            <p className="text-gray-600">
              Histórico completo de suas oportunidades de jogo
            </p>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="card p-4 text-center">
          <div className="text-2xl font-bold text-primary">{stats.total}</div>
          <div className="text-sm text-gray-600">Total de Chances</div>
        </div>
        <div className="card p-4 text-center">
          <div className="text-2xl font-bold text-red-600">{stats.used}</div>
          <div className="text-sm text-gray-600">Utilizadas</div>
        </div>
        <div className="card p-4 text-center">
          <div className="text-2xl font-bold text-green-600">
            {stats.available}
          </div>
          <div className="text-sm text-gray-600">Disponíveis</div>
        </div>
        <div className="card p-4 text-center">
          <div className="text-2xl font-bold text-secondary">
            {stats.thisWeek}
          </div>
          <div className="text-sm text-gray-600">Esta Semana</div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="card p-6 mb-6">
        <div className="grid lg:grid-cols-5 gap-4">
          {/* Period Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Período
            </label>
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="input"
            >
              <option value="all">Todos</option>
              <option value="today">Hoje</option>
              <option value="week">Última Semana</option>
              <option value="month">Último Mês</option>
            </select>
          </div>

          {/* Sort Order */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Ordenar por
            </label>
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="input"
            >
              <option value="desc">Mais Recente</option>
              <option value="asc">Mais Antigo</option>
            </select>
          </div>
        </div>

        {/* Results Info */}
        <div className="mt-4 flex items-center justify-between text-sm text-gray-600">
          <span>
            Mostrando {paginatedOpportunities.length} de{" "}
            {filteredOpportunities.length} chances
          </span>
          <span>
            Página {currentPage} de {totalPages}
          </span>
        </div>
      </div>

      {/* Opportunities List */}
      <div className="card overflow-hidden">
        {paginatedOpportunities.length > 0 ? (
          <>
            {/* Desktop Table */}
            <div className="hidden lg:block overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">
                      ID
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">
                      Criado em
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">
                      Data de Uso
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">
                      Código Fiscal
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {paginatedOpportunities.map((item, index) => (
                    <tr
                      key={item.id}
                      className="hover:bg-gray-50 transition-colors duration-200"
                      style={{ animationDelay: `${index * 30}ms` }}
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-3">
                          <div
                            className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs ${
                              !!item.usedAt
                                ? "bg-red-100 text-red-700"
                                : "bg-green-100 text-green-700"
                            }`}
                          >
                            #{item.id}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            !!item.usedAt
                              ? "bg-red-100 text-red-800"
                              : "bg-green-100 text-green-800"
                          }`}
                        >
                          {!!item.usedAt ? (
                            <>
                              <svg
                                className="w-3 h-3 mr-1"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.293l-3-3a1 1 0 00-1.414 1.414L10.586 9.5 9.293 10.793a1 1 0 101.414 1.414l2-2a1 1 0 000-1.414z"
                                  clipRule="evenodd"
                                />
                              </svg>
                              Utilizada
                            </>
                          ) : (
                            <>
                              <svg
                                className="w-3 h-3 mr-1"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                  clipRule="evenodd"
                                />
                              </svg>
                              Disponível
                            </>
                          )}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-gray-900 text-sm">
                          {formatDate(item.createdAt)}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-gray-900 text-sm">
                          {item.usedAt ? (
                            formatDate(item.usedAt)
                          ) : (
                            <span className="text-gray-400 italic">
                              Não utilizada
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-mono text-sm font-medium text-gray-900">
                          {item.fiscalCode}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="lg:hidden divide-y divide-gray-200">
              {paginatedOpportunities.map((item, index) => (
                <div
                  key={item.id}
                  className="p-4 hover:bg-gray-50 transition-colors duration-200"
                  style={{ animationDelay: `${index * 30}ms` }}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div
                        className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs ${
                          !!item.usedAt
                            ? "bg-red-100 text-red-700"
                            : "bg-green-100 text-green-700"
                        }`}
                      >
                        #{item.id}
                      </div>
                    </div>
                    <span
                      className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        !!item.usedAt
                          ? "bg-red-100 text-red-800"
                          : "bg-green-100 text-green-800"
                      }`}
                    >
                      {!!item.usedAt ? "Utilizada" : "Disponível"}
                    </span>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Criada em:</span>
                      <span className="font-medium">
                        {formatDateShort(item.createdAt)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Usada em:</span>
                      <span className="font-medium">
                        {item.usedAt ? (
                          formatDateShort(item.usedAt)
                        ) : (
                          <span className="text-gray-400 italic">-</span>
                        )}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      {item.fiscalCode}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="p-12 text-center">
            <svg
              className="w-16 h-16 text-gray-300 mx-auto mb-4"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clipRule="evenodd"
              />
            </svg>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Nenhuma chance encontrada
            </h3>
            <p className="text-gray-600 mb-6">
              {selectedPeriod !== "all"
                ? "Tente ajustar os filtros de busca"
                : "Você ainda não possui chances cadastradas"}
            </p>
            {selectedPeriod === "all" && (
              <a href="/dashboard" className="btn-primary">
                Voltar ao Dashboard
              </a>
            )}
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-6 flex items-center justify-between">
          <div className="text-sm text-gray-600">
            Mostrando {startIndex + 1} a{" "}
            {Math.min(startIndex + itemsPerPage, filteredOpportunities.length)}{" "}
            de {filteredOpportunities.length} chances
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Anterior
            </button>

            <div className="flex items-center space-x-1">
              {[...Array(totalPages)].map((_, index) => {
                const page = index + 1;
                if (
                  page === 1 ||
                  page === totalPages ||
                  (page >= currentPage - 1 && page <= currentPage + 1)
                ) {
                  return (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`px-3 py-2 text-sm font-medium rounded-lg ${
                        currentPage === page
                          ? "bg-primary text-white"
                          : "text-gray-700 bg-white border border-gray-300 hover:bg-gray-50"
                      }`}
                    >
                      {page}
                    </button>
                  );
                } else if (
                  page === currentPage - 2 ||
                  page === currentPage + 2
                ) {
                  return (
                    <span key={page} className="px-2 text-gray-400">
                      ...
                    </span>
                  );
                }
                return null;
              })}
            </div>

            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Próximo
            </button>
          </div>
        </div>
      )}

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
              Sobre suas Chances
            </h3>
            <div className="space-y-2 text-sm text-gray-600">
              <p>
                • Cada nota fiscal aprovada gera chances de acordo com seu valor
              </p>
              <p>• Chances utilizadas não podem ser reutilizadas</p>
              <p>• O código fiscal é único para cada chance gerada</p>
              <p>
                • Continue cadastrando notas fiscais para ganhar mais chances!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameOpportunitiePage;
