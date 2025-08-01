import React, { useState, useEffect, useRef } from "react";

const FAQComponent = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [openItems, setOpenItems] = useState(new Set([0])); // Primeiro item aberto por padrão
  const [searchTerm, setSearchTerm] = useState("");
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

  const faqData = [
    {
      id: 0,
      category: "Participação",
      question: "Como faço para participar do sorteio?",
      answer:
        "É muito simples! Basta preencher o formulário no topo da página com seu CPF válido. Após o cadastro, você automaticamente estará participando do sorteio. Não é necessário nenhum pagamento ou compra.",
      popular: true,
    },
    {
      id: 1,
      category: "Participação",
      question: "Posso participar mais de uma vez?",
      answer:
        "Não, cada CPF pode participar apenas uma vez. Tentativas de cadastro duplicado serão automaticamente rejeitadas pelo sistema. Isso garante que todos tenham chances iguais de ganhar.",
      popular: true,
    },
    {
      id: 2,
      category: "Participação",
      question: "Preciso pagar alguma taxa para participar?",
      answer:
        "Não! A participação é 100% gratuita. Nunca solicitamos pagamento de taxas, frete ou qualquer outro valor. Se alguém solicitar pagamento em nosso nome, é golpe - denuncie!",
      popular: true,
    },
    {
      id: 3,
      category: "Sorteio",
      question: "Quando será realizado o sorteio?",
      answer:
        "O sorteio será realizado ao final da campanha, que tem duração de 30 dias. A data exata será divulgada com 7 dias de antecedência em nosso site e redes sociais. O sorteio será transmitido ao vivo.",
      popular: false,
    },
    {
      id: 4,
      category: "Sorteio",
      question: "Como posso ter certeza de que o sorteio é legítimo?",
      answer:
        "Nosso sorteio é auditado por empresa independente e certificada. Todo o processo é gravado e transmitido ao vivo. Utilizamos sistema de sorteio aleatório verificado e aprovado pelos órgãos competentes.",
      popular: false,
    },
    {
      id: 5,
      category: "Prêmios",
      question: "Quais são os prêmios disponíveis?",
      answer:
        "Temos mais de 50 prêmios de diversas categorias: eletrônicos, produtos para casa, moda, beleza, esporte e muito mais. Os valores variam de R$ 100 a R$ 5.000. Todos os produtos são originais e com garantia.",
      popular: true,
    },
    {
      id: 6,
      category: "Prêmios",
      question: "Como recebo meu prêmio se for sorteado?",
      answer:
        "Ganhadores serão contatados em até 48h após o sorteio. Você terá 30 dias para confirmar seus dados e endereço. A entrega é gratuita e feita em todo o Brasil através de transportadora com seguro.",
      popular: true,
    },
    {
      id: 7,
      category: "Prêmios",
      question: "Posso trocar o prêmio por dinheiro?",
      answer:
        "Não, os prêmios não podem ser trocados por dinheiro ou outros produtos. Cada ganhador receberá exatamente o produto sorteado para seu CPF. Esta é uma regra legal das promoções comerciais.",
      popular: false,
    },
    {
      id: 8,
      category: "Dados",
      question: "Meus dados pessoais estão seguros?",
      answer:
        "Sim! Seguimos rigorosamente a LGPD (Lei Geral de Proteção de Dados). Seus dados são usados exclusivamente para esta promoção e não são compartilhados com terceiros. Você pode solicitar exclusão a qualquer momento.",
      popular: false,
    },
    {
      id: 9,
      category: "Dados",
      question: "Por que preciso fornecer meu CPF?",
      answer:
        "O CPF é necessário para validar sua participação e evitar cadastros duplicados. É também exigência legal para promoções comerciais. Garantimos total segurança e privacidade dos seus dados.",
      popular: false,
    },
    {
      id: 10,
      category: "Suporte",
      question: "Como posso tirar outras dúvidas?",
      answer:
        "Você pode entrar em contato através do nosso canal oficial de atendimento, disponível de segunda a sexta, das 9h às 18h. Nossos contatos estão no rodapé do site. Não respondemos por outros canais.",
      popular: false,
    },
    {
      id: 11,
      category: "Suporte",
      question: "E se eu não conseguir me cadastrar?",
      answer:
        "Verifique se seu CPF está correto e válido. Se o problema persistir, limpe o cache do navegador ou tente em outro dispositivo. Se ainda assim não funcionar, entre em contato com nosso suporte.",
      popular: false,
    },
  ];

  const categories = [
    "Todas",
    "Participação",
    "Sorteio",
    "Prêmios",
    "Dados",
    "Suporte",
  ];
  const [activeCategory, setActiveCategory] = useState("Todas");

  // Filtrar FAQs
  const filteredFAQs = faqData.filter((faq) => {
    const matchesCategory =
      activeCategory === "Todas" || faq.category === activeCategory;
    const matchesSearch =
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const popularFAQs = faqData.filter((faq) => faq.popular);

  const toggleItem = (id: number) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(id)) {
      newOpenItems.delete(id);
    } else {
      newOpenItems.add(id);
    }
    setOpenItems(newOpenItems);
  };

  const openAll = () => {
    setOpenItems(new Set(filteredFAQs.map((faq) => faq.id)));
  };

  const closeAll = () => {
    setOpenItems(new Set());
  };

  return (
    <section
      id="faq"
      ref={sectionRef}
      className="section bg-gradient-to-br from-gray-50 to-white relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-secondary/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>

      <div className="container relative z-10">
        {/* Section Header */}
        <div
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="inline-flex items-center px-4 py-2 bg-secondary/10 text-secondary rounded-full text-sm font-bold mb-4">
            <svg
              className="w-4 h-4 mr-2"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                clipRule="evenodd"
              />
            </svg>
            Perguntas Frequentes
          </div>

          <h2 className="text-responsive-lg font-bold text-gray-900 mb-6 text-balance">
            Tire Todas as Suas
            <span className="text-gradient block">Dúvidas Aqui</span>
          </h2>

          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Preparamos as respostas para as dúvidas mais comuns sobre nosso
            sorteio. Se não encontrar o que procura, entre em contato conosco!
          </p>
        </div>

        {/* Popular Questions */}
        <div
          className={`mb-16 transition-all duration-1000 delay-200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              Dúvidas Mais Comuns
            </h3>
            <p className="text-gray-600">As perguntas que mais recebemos</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {popularFAQs.slice(0, 3).map((faq, index) => (
              <div
                key={faq.id}
                className="card p-6 cursor-pointer group hover-lift"
                onClick={() => {
                  setActiveCategory(faq.category);
                  setOpenItems(new Set([faq.id]));
                  document
                    .getElementById("faq-list")
                    .scrollIntoView({ behavior: "smooth" });
                }}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-start space-x-3 mb-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary/10 text-primary rounded-full flex items-center justify-center">
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <span className="text-xs text-primary font-medium bg-primary/10 px-2 py-1 rounded-full">
                    {faq.category}
                  </span>
                </div>
                <h4 className="font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors duration-300">
                  {faq.question}
                </h4>
                <p className="text-sm text-gray-600 line-clamp-3">
                  {faq.answer}
                </p>
                <div className="mt-3 text-primary text-sm font-medium">
                  Clique para ver resposta completa →
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Search and Filters */}
        <div
          className={`mb-12 transition-all duration-1000 delay-400 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="max-w-2xl mx-auto">
            {/* Search Bar */}
            <div className="relative mb-8">
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
                placeholder="Buscar por palavra-chave..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input pl-10 text-center"
              />
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap justify-center gap-2 mb-6">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    activeCategory === category
                      ? "bg-primary text-white shadow-lg"
                      : "bg-white text-gray-700 border border-gray-200 hover:border-primary hover:text-primary"
                  }`}
                >
                  {category}
                  {category !== "Todas" && (
                    <span className="ml-1 text-xs opacity-75">
                      (
                      {
                        faqData.filter((faq) => faq.category === category)
                          .length
                      }
                      )
                    </span>
                  )}
                </button>
              ))}
            </div>

            {/* Control Buttons */}
            <div className="flex justify-center space-x-4">
              <button
                onClick={openAll}
                className="btn-outline text-sm px-4 py-2"
              >
                Expandir Todas
              </button>
              <button
                onClick={closeAll}
                className="btn-ghost text-sm px-4 py-2"
              >
                Recolher Todas
              </button>
            </div>
          </div>
        </div>

        {/* FAQ List */}
        <div
          id="faq-list"
          className={`max-w-4xl mx-auto transition-all duration-1000 delay-600 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {filteredFAQs.length > 0 ? (
            <div className="space-y-4">
              {filteredFAQs.map((faq, index) => (
                <div
                  key={faq.id}
                  className="card overflow-hidden"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <button
                    onClick={() => toggleItem(faq.id)}
                    className="w-full px-6 py-6 text-left focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-inset"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <span className="text-xs text-primary font-medium bg-primary/10 px-2 py-1 rounded-full">
                            {faq.category}
                          </span>
                          {faq.popular && (
                            <span className="text-xs text-secondary font-medium bg-secondary/10 px-2 py-1 rounded-full">
                              Popular
                            </span>
                          )}
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 text-left">
                          {faq.question}
                        </h3>
                      </div>
                      <div className="flex-shrink-0 ml-4">
                        <svg
                          className={`w-6 h-6 text-gray-400 transition-transform duration-300 ${
                            openItems.has(faq.id) ? "transform rotate-180" : ""
                          }`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                    </div>
                  </button>

                  <div
                    className={`accordion-content ${
                      openItems.has(faq.id) ? "open" : ""
                    }`}
                  >
                    <div className="px-6 pb-6">
                      <div className="border-t border-gray-100 pt-4">
                        <p className="text-gray-600 leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
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
                Nenhuma pergunta encontrada
              </h3>
              <p className="text-gray-600">
                Tente ajustar sua busca ou categoria selecionada
              </p>
            </div>
          )}
        </div>

        {/* Contact Section */}
        <div
          className={`mt-16 transition-all duration-1000 delay-800 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-8 border border-primary/20 text-center">
            <div className="max-w-2xl mx-auto">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/20 rounded-full mb-6">
                <svg
                  className="w-8 h-8 text-primary"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Não Encontrou Sua Dúvida?
              </h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Nossa equipe de suporte está pronta para ajudar! Entre em
                contato através dos nossos canais oficiais e receba atendimento
                personalizado.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="#footer"
                  className="btn-primary inline-flex items-center hover-lift"
                >
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                  Entrar em Contato
                </a>
                <a
                  href="#hero"
                  className="btn-outline inline-flex items-center hover-lift"
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
                  Participar Agora
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQComponent;
