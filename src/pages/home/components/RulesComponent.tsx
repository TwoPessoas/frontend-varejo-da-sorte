import { useState, useEffect, useRef } from "react";

const RulesComponent = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState("participation");
  const sectionRef = useRef(null);

  // Intersection Observer para animações
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const tabs = [
    {
      id: "participation",
      name: "Participação",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
        </svg>
      ),
    },
    {
      id: "prizes",
      name: "Prêmios",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732L14.146 12.8l-1.179 4.456a1 1 0 01-1.934 0L9.854 12.8 6.5 10.866a1 1 0 010-1.732L9.854 7.2l1.179-4.456A1 1 0 0112 2z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    {
      id: "draw",
      name: "Sorteio",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    {
      id: "terms",
      name: "Termos",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
  ];

  const rulesContent = {
    participation: {
      title: "Como Participar",
      subtitle: "Requisitos e processo de participação",
      items: [
        {
          icon: "📝",
          title: "Cadastro Obrigatório",
          description:
            "Preencha o formulário com seu CPF válido no topo da página.",
          details: [
            "CPF deve ser válido e estar regularizado",
            "Apenas um cadastro por CPF",
            "Dados serão verificados automaticamente",
          ],
        },
        {
          icon: "🇧🇷",
          title: "Residência no Brasil",
          description:
            "Participação restrita a residentes no território brasileiro.",
          details: [
            "Comprovante de residência pode ser solicitado",
            "Entrega disponível em todo território nacional",
            "Válido para brasileiros e estrangeiros residentes",
          ],
        },
        {
          icon: "🎂",
          title: "Maior de 18 Anos",
          description:
            "Participantes devem ter idade mínima de 18 anos completos.",
          details: [
            "Documento de identidade será solicitado",
            "Menores podem participar com responsável legal",
            "Idade verificada no momento do prêmio",
          ],
        },
        {
          icon: "📅",
          title: "Período de Participação",
          description: "Cadastros aceitos até o final da campanha promocional.",
          details: [
            "Campanha válida por 30 dias",
            "Horário limite: 23h59 do último dia",
            "Cadastros após o prazo não serão considerados",
          ],
        },
      ],
    },
    prizes: {
      title: "Sobre os Prêmios",
      subtitle: "Informações detalhadas sobre premiação",
      items: [
        {
          icon: "🏆",
          title: "Mais de 50 Prêmios",
          description: "Diversos prêmios das melhores marcas parceiras.",
          details: [
            "Produtos originais com garantia",
            "Valores entre R$ 100 e R$ 5.000",
            "Categorias: eletrônicos, casa, moda, beleza",
          ],
        },
        {
          icon: "🚚",
          title: "Entrega Gratuita",
          description: "Todos os prêmios são entregues sem custo adicional.",
          details: [
            "Entrega em todo o Brasil",
            "Prazo de até 15 dias úteis",
            "Transportadora com seguro total",
          ],
        },
        {
          icon: "📋",
          title: "Documentação",
          description: "Ganhadores devem apresentar documentos para retirada.",
          details: [
            "CPF e RG originais",
            "Comprovante de residência atualizado",
            "Termo de recebimento assinado",
          ],
        },
        {
          icon: "⏰",
          title: "Prazo para Retirada",
          description:
            "Ganhadores têm 30 dias para confirmar dados e endereço.",
          details: [
            "Contato em até 48h após o sorteio",
            "Prazo de 30 dias para resposta",
            "Novo sorteio se não houver resposta",
          ],
        },
      ],
    },
    draw: {
      title: "Processo do Sorteio",
      subtitle: "Como será realizado o sorteio dos prêmios",
      items: [
        {
          icon: "🎯",
          title: "Sorteio Transparente",
          description: "Realizado através de sistema auditado e transparente.",
          details: [
            "Sistema certificado de sorteio",
            "Auditoria por empresa independente",
            "Gravação completa do processo",
          ],
        },
        {
          icon: "📊",
          title: "Algoritmo Aleatório",
          description:
            "Seleção 100% aleatória entre todos os participantes válidos.",
          details: [
            "Cada CPF tem uma chance igual",
            "Algoritmo verificado por terceiros",
            "Impossível manipulação do resultado",
          ],
        },
        {
          icon: "📺",
          title: "Transmissão ao Vivo",
          description: "Sorteio transmitido ao vivo em nossas redes sociais.",
          details: [
            "Data e horário divulgados com antecedência",
            "Transmissão simultânea em múltiplas plataformas",
            "Gravação disponível posteriormente",
          ],
        },
        {
          icon: "📢",
          title: "Divulgação dos Resultados",
          description: "Ganhadores divulgados imediatamente após o sorteio.",
          details: [
            "Lista publicada no site oficial",
            "Contato direto com ganhadores",
            "Publicação em redes sociais",
          ],
        },
      ],
    },
    terms: {
      title: "Termos e Condições",
      subtitle: "Condições gerais da promoção",
      items: [
        {
          icon: "⚖️",
          title: "Validade Legal",
          description:
            "Promoção autorizada e em conformidade com a legislação.",
          details: [
            "Registro na Secretaria da Fazenda",
            "Conforme Lei 5.768/71",
            "Alvará municipal válido",
          ],
        },
        {
          icon: "🔒",
          title: "Proteção de Dados",
          description: "Dados pessoais protegidos conforme LGPD.",
          details: [
            "Uso exclusivo para a promoção",
            "Não compartilhamento com terceiros",
            "Direito de exclusão garantido",
          ],
        },
        {
          icon: "🚫",
          title: "Restrições",
          description: "Funcionários e familiares não podem participar.",
          details: [
            "Funcionários da empresa organizadora",
            "Familiares até 2º grau",
            "Prestadores de serviço diretos",
          ],
        },
        {
          icon: "📞",
          title: "Suporte",
          description: "Canal de atendimento disponível para dúvidas.",
          details: [
            "Atendimento de segunda a sexta",
            "Horário: 9h às 18h",
            "E-mail e telefone disponíveis",
          ],
        },
      ],
    },
  };

  const currentContent = rulesContent[activeTab];

  return (
    <section
      id="rules"
      ref={sectionRef}
      className="section bg-white relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl"></div>

      <div className="container relative z-10">
        {/* Section Header */}
        <div
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="inline-flex items-center px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-bold mb-4">
            <svg
              className="w-4 h-4 mr-2"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clipRule="evenodd"
              />
            </svg>
            Regras do Sorteio
          </div>

          <h2 className="text-responsive-lg font-bold text-gray-900 mb-6 text-balance">
            Tudo que Você
            <span className="text-gradient block">Precisa Saber</span>
          </h2>

          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Leia atentamente as regras para garantir sua participação válida no
            sorteio. Transparência e clareza são nossos compromissos com você.
          </p>
        </div>

        {/* Quick Info Cards */}
        <div
          className={`grid md:grid-cols-3 gap-6 mb-16 transition-all duration-1000 delay-200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="card p-6 text-center border-l-4 border-primary">
            <div className="text-3xl mb-3">🎯</div>
            <h3 className="font-bold text-gray-900 mb-2">Simples</h3>
            <p className="text-gray-600 text-sm">
              Apenas seu CPF é necessário para participar
            </p>
          </div>
          <div className="card p-6 text-center border-l-4 border-secondary">
            <div className="text-3xl mb-3">🔒</div>
            <h3 className="font-bold text-gray-900 mb-2">Seguro</h3>
            <p className="text-gray-600 text-sm">
              Seus dados protegidos e sorteio auditado
            </p>
          </div>
          <div className="card p-6 text-center border-l-4 border-primary">
            <div className="text-3xl mb-3">🆓</div>
            <h3 className="font-bold text-gray-900 mb-2">Gratuito</h3>
            <p className="text-gray-600 text-sm">
              Participação e entrega 100% gratuitas
            </p>
          </div>
        </div>

        {/* Tabs Navigation */}
        <div
          className={`mb-12 transition-all duration-1000 delay-400 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="flex flex-wrap justify-center gap-2 p-2 bg-gray-100 rounded-xl">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                  activeTab === tab.id
                    ? "bg-white text-primary shadow-md transform scale-105"
                    : "text-gray-600 hover:text-gray-900 hover:bg-white/50"
                }`}
              >
                {tab.icon}
                <span className="ml-2">{tab.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Content Area */}
        <div
          className={`transition-all duration-1000 delay-600 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="max-w-4xl mx-auto">
            {/* Content Header */}
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold text-gray-900 mb-2">
                {currentContent.title}
              </h3>
              <p className="text-gray-600">{currentContent.subtitle}</p>
            </div>

            {/* Content Grid */}
            <div className="grid gap-8">
              {currentContent.items.map((item, index) => (
                <div
                  key={index}
                  className="card p-8 hover-lift"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-start space-x-6">
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-2xl">
                        {item.icon}
                      </div>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-xl font-bold text-gray-900 mb-3">
                        {item.title}
                      </h4>
                      <p className="text-gray-600 leading-relaxed mb-4">
                        {item.description}
                      </p>
                      <div className="space-y-2">
                        {item.details.map((detail, detailIndex) => (
                          <div
                            key={detailIndex}
                            className="flex items-start space-x-3"
                          >
                            <svg
                              className="w-4 h-4 text-primary mt-1 flex-shrink-0"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                            <span className="text-sm text-gray-600">
                              {detail}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Important Notice */}
        <div
          className={`mt-16 transition-all duration-1000 delay-800 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-2xl p-8">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <svg
                  className="w-8 h-8 text-amber-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div>
                <h4 className="text-xl font-bold text-amber-900 mb-3">
                  ⚠️ Atenção Importante
                </h4>
                <div className="space-y-2 text-amber-800">
                  <p className="font-medium">• Esta promoção é 100% GRATUITA</p>
                  <p className="font-medium">
                    • NUNCA solicitamos pagamento de taxas
                  </p>
                  <p className="font-medium">
                    • Desconfie de contatos suspeitos em seu nome
                  </p>
                  <p className="font-medium">
                    • Em caso de dúvida, entre em contato conosco
                  </p>
                </div>
                <div className="mt-4 p-4 bg-white/50 rounded-lg">
                  <p className="text-sm text-amber-700">
                    <strong>Canal Oficial:</strong> Todas as comunicações
                    oficiais serão feitas através dos canais listados no rodapé
                    deste site. Não respondemos por comunicações feitas através
                    de outros meios.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div
          className={`text-center mt-16 transition-all duration-1000 delay-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Entendeu as Regras? Agora Participe!
            </h3>
            <p className="text-gray-600 mb-8">
              Agora que você conhece todas as regras, não perca tempo! Faça seu
              cadastro e concorra aos incríveis prêmios.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#hero"
                className="btn-primary inline-flex items-center hover-lift"
              >
                <svg
                  className="w-5 h-5 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
                Fazer Cadastro
              </a>
              <a
                href="#faq"
                className="btn-outline inline-flex items-center hover-lift"
              >
                <svg
                  className="w-5 h-5 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                    clipRule="evenodd"
                  />
                </svg>
                Dúvidas Frequentes
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RulesComponent;
