import { useState, useEffect, useRef } from "react";

const FAQComponent = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [openItems, setOpenItems] = useState(new Set([0])); // Primeiro item aberto por padrão
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
      question: "Do que eu preciso para concorrer?",
      answer:(
        <p> Para participar da promoção <b>“Aniversário Atakarejo”</b>, o cliente deve informar seu CPF no início da compra, efetuarem compras a partir de R$ 200,00 (duzentos reais) nas lojas Atakarejo participante da promoção, contendo ao menos um produto das marcas participantes da promoção e efetuar o cadastro na promoção através do Web App <a href='https://www.aniversarioatakarejo.com.br' target='_blank'>www.aniversarioatakarejo.com.br</a>.</p>
      ),      
      popular: false,
    },
    {
      id: 1,
      category: "Participação",
      question: "Posso cadastrar uma nota de qualquer data de compra?",
      answer:(
        <p>
          As compras feitas no período de 31 de agosto de 2025 até o dia 30 de setembro de 2025. Poderá ser contemplado com um dos brindes da promoção.
        </p>
      ),        
      popular: false,
    },
    {
      id: 2,
      category: "Participação",
      question: "Posso me cadastrar mais de uma vez?",
      answer:(
        <p>Não haverá limites de chances por participante, podendo cada participante concorrer com quantas chances tiver direito, desde que atenda as condições previstas no regulamento.
        </p>
      ),        
      popular: false,
    },
    {
      id: 3,
      category: "Sorteio",
      question: "Qual o prêmio e como eu posso utilizá-lo?",
      answer:(
        <p>O prêmio é de 01 (um) Vale-compras Atakarejo no valor de R$ 750,00 (setecentos e cinquenta reais), sem função de saque, vinculado ao CPF do participante e 01 (um) prêmio de R$ 30 mil (cinquenta mil reais).
        </p>
      ),
      popular: false,
    },
    {
      id: 4,
      category: "Sorteio",
      question: "Pessoas de qualquer idade podem participar?",
      answer:(
        <p>Qualquer pessoa física com idade igual ou superior a 18 (dezoito) anos.</p>
      ),
      popular: false,
    },
    {
      id: 5,
      category: "Prêmios",
      question: "Ganhei o vale compras mais quero dar para outra pessoa, é possível?",
      answer:(
        <p>Ficam os participantes cientes desde já, que a participação na promoção é individualizada, e não poderá, em hipótese alguma, transferir e/ou dividir com outro participante qualquer valor residual, independentemente do grau de parentesco e/ou amizade. Da mesma forma, não será admitida, por força de legislação fiscal, “divisão de valores de notas fiscais” entre participantes no ato da compra.</p>
      ),
      popular: true,
    },
  // Adicione mais FAQs conforme necessário
  ];

  const toggleItem = (id: number) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(id)) {
      newOpenItems.delete(id);
    } else {
      newOpenItems.add(id);
    }
    setOpenItems(newOpenItems);
  };

  return (
    <section
      id="faq"
      ref={sectionRef}      
      className={`section bg-primary relative z-10 transition-all duration-1000 ${
            isVisible ? "opacity-100 " : "opacity-0"
          }`}
    >
    <div className="w-full h-full absolute top-0 left-0 right-0 z-20 pointer-events-none">
      <img src="./imgs/convete-top.png" alt="" />
    </div>
     <div className="w-full h-full absolute top-0 left-0 right-0 z-10 pointer-events-none">
      <img src="./imgs/confetes-back.png" alt="" />
    </div>

      <div className="container relative z-30">
        <div className="promo-logo absolute -top-40 left-1/2 transform -translate-x-1/2 max-w-[320px] 
        md:-top-56">
          <img src="./imgs/super-premios.png" alt="6 Super Prêmios de 30Mil Reais" className={`transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}/>
        </div>

        {/* Section Header */}        
        <header className={`sec_header text-center mb-8 pt-18 transition-all duration-1000 delay-300 
        md:pt-28 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}>
        <h1 className="title text-white">
          Perguntas Frequentes
          </h1>
        </header>

        {/* FAQ List */}
        <div
          id="faq-list"
          className={`max-w-4xl mx-auto transition-all duration-1000 delay-600 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {faqData.length > 0 ? (
            <div className="space-y-4">
              {faqData.map((faq, index) => (
                <div
                  key={faq.id}
                  className="card faq-card overflow-hidden"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <button
                    onClick={() => toggleItem(faq.id)}
                    className="w-full px-6 py-6 text-left focus:outline-none "
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-left text-[#901518]">
                          {faq.question}
                        </h3>
                      </div>
                      <div className="flex-shrink-0 ml-4">
                        <svg
                          className={`w-6 h-6  transition-transform duration-300 ${
                            openItems.has(faq.id) ? "transform rotate-180" : ""
                          }`}
                          fill="#901518"
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
                      <div className="border-t border-[#901518] pt-4  leading-relaxed font-weight-light ">
                        
                          {faq.answer}
                        
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
          className={`mt-8 transition-all duration-1000 delay-800 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="bg-white/20 rounded-2xl p-8  text-center text-white">
            <div className="max-w-2xl mx-auto">
             
              <h3 className="text-2xl font-bold mb-4 text-gray-800">
                Não Encontrou Sua Dúvida?
              </h3>
              <p className="text-gray-100 mb-6 leading-relaxed">
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
                  className="btn-outline-default inline-flex items-center hover-lift"
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
