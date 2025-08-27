import { useEffect, useRef, useState } from "react";
import useDrawNumber from "../../../hooks/useDrawNumber";

const DrawNumberPage = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("desc"); // desc = mais recente primeiro
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const { isLoading, drawNumbers, getMyDrawNumbers, clearDrawNumbers } = useDrawNumber();
  const isInited = useRef(false);

  useEffect(() => {
    if (isInited.current) return;

    isInited.current = true;
    getMyDrawNumbers();

    return () => {
      clearDrawNumbers();
    };
  }, []);

  // Filtrar números
  const filteredNumbers = drawNumbers.filter((item) => {
    const matchesSearch = item.number.toString().includes(searchTerm);

    let matchesPeriod = true;
    if (selectedPeriod !== "all") {
      const itemDate = new Date(item.updatedAt);
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

    return matchesSearch && matchesPeriod;
  });

  // Ordenar números
  const sortedNumbers = [...filteredNumbers].sort((a, b) => {
    const dateA = new Date(a.updatedAt).getTime();
    const dateB = new Date(b.updatedAt).getTime();

    return sortOrder === "desc" ? dateB - dateA : dateA - dateB;
  });

  // Paginação
  const totalPages = Math.ceil(sortedNumbers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedNumbers = sortedNumbers.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const formatDate = (dateString: string) => {
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
    const date = new Date(dateString);
    return date.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] p-8">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">
            Carregando números...
          </h2>
          <p className="text-gray-600">Buscando seus números da sorte</p>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-6 lg:p-8 dashboard-area">
      <div className="container">
        {/* Page Header */}
        <div className="mb-8">
          <img src="./imgs/logo-campanha.png" className="mb-6 max-w-[280px] mx-auto" alt="" />
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">
                Números da Sorte
              </h1>
              <p className="text-gray-100">
                Todos os seus números gerados para o sorteio
              </p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="card p-4 text-center">
            <div className="text-2xl font-bold text-primary">
              {drawNumbers.length}
            </div>
            <div className="text-sm text-gray-600">Total de Números</div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="card p-6 mb-6 hidden">
          <div className="grid lg:grid-cols-4 gap-4">
            {/* Search */}
            <div className="lg:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Buscar Número
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg
                    className="h-5 w-5 text-gray-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Digite o número..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="input pl-10"
                />
              </div>
            </div>

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
              Mostrando {paginatedNumbers.length} de {filteredNumbers.length}{" "}
              números
            </span>
            <span>
              Página {currentPage} de {totalPages}
            </span>
          </div>
        </div>

        {/* Numbers List */}
        <div className="card overflow-hidden">
          {paginatedNumbers.length > 0 ? (
            <>
              {/* Desktop Table */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">
                        Número da Sorte
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">
                        Data
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">
                        Nota fiscal
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {paginatedNumbers.map((item, index) => (
                      <tr
                        key={item.id}
                        className="hover:bg-gray-50 transition-colors duration-200"
                        style={{ animationDelay: `${index * 50}ms` }}
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-primary/10 text-primary rounded-lg flex items-center justify-center font-bold text-sm">
                              #{item.id}
                            </div>
                            <div className="text-xl font-mono font-bold text-gray-900">
                              {item.number}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-gray-900">
                            {formatDate(item.updatedAt)}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800`}
                          >
                            {item.fiscalCode || "-"}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile Cards */}
              <div className="md:hidden divide-y divide-gray-200">
                {paginatedNumbers.map((item, index) => (
                  <div
                    key={item.id}
                    className="p-4 hover:bg-gray-50 transition-colors duration-200"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-primary/10 text-primary rounded-lg flex items-center justify-center font-bold text-xs">
                          #{item.id}
                        </div>
                        <div className="text-lg font-mono font-bold text-gray-900">
                          {item.number}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2 text-sm">
                      <div className="flex ">
                        <span className="text-gray-600">Data:</span>
                        <span className="font-medium ml-2">
                          {formatDateShort(item.updatedAt)}
                        </span>
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
                Nenhum número encontrado
              </h3>
              <p className="text-gray-600 mb-6">
                {searchTerm || selectedPeriod !== "all"
                  ? "Tente ajustar os filtros de busca"
                  : "Você ainda não gerou nenhum número da sorte"}
              </p>
            </div>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-6 flex items-center justify-between">
            <div className="text-sm text-gray-600">
              Mostrando {startIndex + 1} a{" "}
              {Math.min(startIndex + itemsPerPage, filteredNumbers.length)} de{" "}
              {filteredNumbers.length} números
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
                Sobre seus Números da Sorte
              </h3>
              <div className="space-y-2 text-sm text-gray-600">
                <p>
                  • Cada número gerado é uma chance de ganhar no sorteio Semanal
                </p>                
                <p>
                  • Continue cadastrando notas fiscais para gerar mais números e
                  aumentar suas chances!
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default DrawNumberPage;
