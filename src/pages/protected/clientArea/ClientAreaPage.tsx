const ClientAreaPage = () => {
  /*
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Simular dados do usuário (substituir por dados reais da API)
  useEffect(() => {
    const fetchUserData = async () => {
      setIsLoading(true);

      // Simular chamada da API
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Dados mockados - substituir por dados reais
      setUserData({
        chances: {
          available: 8,
          total: 15,
          used: 7,
        },
        invoices: {
          registered: 12,
          pending: 3,
          approved: 9,
        },
        luckyNumbers: {
          count: 25,
          latest: ["00157", "00892", "01234", "02456", "03789"],
        },
        campaignEndDate: "2025-02-15T23:59:59",
      });

      setIsLoading(false);
    };

    fetchUserData();

    // Atualizar horário a cada minuto
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  // Calcular tempo restante da campanha
  const getTimeRemaining = () => {
    if (!userData) return null;

    const now = new Date();
    const endDate = new Date(userData.campaignEndDate);
    const diff = endDate - now;

    if (diff <= 0) return { expired: true };

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    return { days, hours, minutes, expired: false };
  };

  const timeRemaining = getTimeRemaining();

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
      href: "/play",
      color: "primary",
      available: userData.chances.available > 0,
    },
    {
      title: "Números da Sorte",
      description: "Veja todos os seus números",
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      href: "/lucky-numbers",
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
      href: "/used-chances",
      color: "gray",
      available: true,
    },
  ];
  */
  return (
    <div className="p-6 lg:p-8">
      {/* Page Header * /}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Dashboard
              </h1>
              <p className="text-gray-600">
                Acompanhe seu progresso no sorteio de brindes
              </p>
            </div>

            {timeRemaining && !timeRemaining.expired && (
              <div className="mt-4 lg:mt-0">
                <div className="bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
                  ⏰ {timeRemaining.days}d {timeRemaining.hours}h{" "}
                  {timeRemaining.minutes}m restantes
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Stats Cards * /}
        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          {/* Chances Card * /}
          <div className="card p-6 hover-lift">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">
                  Chances Disponíveis
                </h3>
                <p className="text-gray-600 text-sm">
                  Use para gerar números da sorte
                </p>
              </div>
              <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center">
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
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
                  {userData.chances.available}
                </span>
                <span className="text-lg text-gray-500 mb-1">
                  / {userData.chances.total}
                </span>
              </div>

              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-primary h-2 rounded-full transition-all duration-500"
                  style={{
                    width: `${
                      (userData.chances.available / userData.chances.total) *
                      100
                    }%`,
                  }}
                ></div>
              </div>

              <div className="flex justify-between text-sm">
                <span className="text-gray-600">
                  {userData.chances.used} utilizadas
                </span>
                <span className="text-primary font-medium">
                  {Math.round(
                    (userData.chances.available / userData.chances.total) * 100
                  )}
                  % disponível
                </span>
              </div>
            </div>
          </div>

          {/* Invoices Card * /}
          <div className="card p-6 hover-lift">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">
                  Notas Fiscais
                </h3>
                <p className="text-gray-600 text-sm">Cadastradas no sistema</p>
              </div>
              <div className="w-12 h-12 bg-secondary/10 text-secondary rounded-xl flex items-center justify-center">
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
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
                {userData.invoices.registered}
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="text-center p-2 bg-green-50 rounded-lg">
                  <div className="font-bold text-green-700">
                    {userData.invoices.approved}
                  </div>
                  <div className="text-green-600">Aprovadas</div>
                </div>
                <div className="text-center p-2 bg-yellow-50 rounded-lg">
                  <div className="font-bold text-yellow-700">
                    {userData.invoices.pending}
                  </div>
                  <div className="text-yellow-600">Pendentes</div>
                </div>
              </div>

              <div className="text-sm text-gray-600">
                Taxa de aprovação:{" "}
                {Math.round(
                  (userData.invoices.approved / userData.invoices.registered) *
                    100
                )}
                %
              </div>
            </div>
          </div>

          {/* Lucky Numbers Card * /}
          <div className="card p-6 hover-lift">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">
                  Números da Sorte
                </h3>
                <p className="text-gray-600 text-sm">Gerados até agora</p>
              </div>
              <div className="w-12 h-12 bg-green-600/10 text-green-600 rounded-xl flex items-center justify-center">
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>

            <div className="space-y-3">
              <div className="text-3xl font-bold text-gray-900">
                {userData.luckyNumbers.count}
              </div>

              <div>
                <div className="text-sm text-gray-600 mb-2">
                  Últimos números:
                </div>
                <div className="flex flex-wrap gap-2">
                  {userData.luckyNumbers.latest.map((number, index) => (
                    <span
                      key={index}
                      className="bg-primary/10 text-primary px-2 py-1 rounded text-sm font-mono font-bold"
                    >
                      {number}
                    </span>
                  ))}
                </div>
              </div>

              <div className="text-sm text-gray-600">
                Cada número é uma chance de ganhar!
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions * /}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Ações Rápidas
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {quickLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                className={`card p-6 group transition-all duration-300 hover:-translate-y-1 hover:shadow-medium ${
                  !link.available
                    ? "opacity-50 cursor-not-allowed"
                    : "hover-lift"
                }`}
                onClick={
                  !link.available ? (e) => e.preventDefault() : undefined
                }
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

        {/* Recent Activity & Campaign Info * /}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Activity Feed * /}
          <div className="card p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Atividade Recente
            </h3>

            <div className="space-y-4">
              {[
                {
                  type: "number_generated",
                  message: "Novo número da sorte gerado: 03789",
                  time: "2 horas atrás",
                  icon: "🎯",
                },
                {
                  type: "invoice_approved",
                  message: "Nota fiscal aprovada - 3 chances adicionadas",
                  time: "1 dia atrás",
                  icon: "✅",
                },
                {
                  type: "chance_used",
                  message: "Chance utilizada para gerar número 02456",
                  time: "2 dias atrás",
                  icon: "🎲",
                },
                {
                  type: "registration",
                  message: "Cadastro realizado com sucesso",
                  time: "5 dias atrás",
                  icon: "🎉",
                },
              ].map((activity, index) => (
                <div
                  key={index}
                  className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg activity-item"
                >
                  <span className="text-xl">{activity.icon}</span>
                  <div className="flex-1">
                    <p className="text-gray-900 text-sm">{activity.message}</p>
                    <p className="text-gray-500 text-xs mt-1">
                      {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Campaign Info * /}
          <div className="card p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Informações da Campanha
            </h3>

            <div className="space-y-4">
              <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <svg
                    className="w-5 h-5 text-primary"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <h4 className="font-bold text-primary">Data do Sorteio</h4>
                </div>
                <p className="text-gray-700">
                  15 de Fevereiro de 2025 às 20:00
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  Transmissão ao vivo no YouTube
                </p>
              </div>

              <div className="p-4 bg-secondary/5 border border-secondary/20 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <svg
                    className="w-5 h-5 text-secondary"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732L14.146 12.8l-1.179 4.456a1 1 0 01-1.934 0L9.854 12.8 6.5 10.866a1 1 0 010-1.732L9.854 7.2l1.179-4.456A1 1 0 0112 2z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <h4 className="font-bold text-secondary">Total de Prêmios</h4>
                </div>
                <p className="text-gray-700">Mais de 50 prêmios incríveis</p>
                <p className="text-sm text-gray-600 mt-1">
                  Valores de R\$ 100 a R\$ 5.000
                </p>
              </div>

              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <svg
                    className="w-5 h-5 text-green-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <h4 className="font-bold text-green-700">Seu Status</h4>
                </div>
                <p className="text-green-700">✅ Participação confirmada</p>
                <p className="text-sm text-green-600 mt-1">
                  Você está concorrendo a todos os prêmios!
                </p>
              </div>
            </div>
          </div>
        </div>
        */}
    </div>
  );
};

export default ClientAreaPage;
