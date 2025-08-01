import { useState, useEffect, useRef } from "react";

const AboutComponent = () => {
  const [isVisible, setIsVisible] = useState(false);
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

  const features = [
    {
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z"
            clipRule="evenodd"
          />
        </svg>
      ),
      title: "Prêmios Incríveis",
      description:
        "Concorra a produtos de alta qualidade das melhores marcas do mercado",
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
            clipRule="evenodd"
          />
        </svg>
      ),
      title: "100% Transparente",
      description:
        "Sorteio realizado de forma transparente e auditada por órgão competente",
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "Fácil Participação",
      description:
        "Apenas seu CPF é necessário para participar. Simples, rápido e seguro",
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 011.912-2.706C6.512 5.73 6.974 6 7.5 6A1.5 1.5 0 019 7.5V8a2 2 0 004 0 2 2 0 011.523-1.943A5.977 5.977 0 0116 10c0 .34-.028.675-.083 1H15a2 2 0 00-2 2v2.197A5.973 5.973 0 0110 16v-2a2 2 0 00-2-2 2 2 0 01-2-2 2 2 0 00-1.668-1.973z"
            clipRule="evenodd"
          />
        </svg>
      ),
      title: "Alcance Nacional",
      description:
        "Campanha válida para todo o território brasileiro, sem restrições regionais",
    },
  ];

  const stats = [
    { number: "50+", label: "Prêmios Disponíveis" },
    { number: "10", label: "Marcas Parceiras" },
    { number: "30", label: "Dias de Campanha" },
    { number: "100%", label: "Gratuito" },
  ];

  return (
    <section
      id="about"
      ref={sectionRef}
      className="section bg-white relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl"></div>

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
                d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z"
                clipRule="evenodd"
              />
            </svg>
            Sobre a Campanha
          </div>

          <h2 className="text-responsive-lg font-bold text-gray-900 mb-6 text-balance">
            Uma Oportunidade
            <span className="text-gradient block">Única de Ganhar</span>
          </h2>

          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Criamos esta campanha especial para premiar nossos clientes e
            parceiros com produtos incríveis das melhores marcas do mercado.
            Participe agora e concorra a prêmios que vão transformar seu dia a
            dia!
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Left Content */}
          <div
            className={`transition-all duration-1000 delay-200 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-8"
            }`}
          >
            <div className="space-y-8">
              <div>
                <h3 className="text-3xl font-bold text-gray-900 mb-4">
                  Como Funciona Nossa Campanha?
                </h3>
                <p className="text-lg text-gray-600 leading-relaxed mb-6">
                  Nossa campanha de sorteio foi desenvolvida para ser simples,
                  transparente e acessível a todos. Queremos que você tenha a
                  melhor experiência possível ao participar.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold text-sm">
                    1
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">
                      Cadastre-se
                    </h4>
                    <p className="text-gray-600">
                      Digite seu CPF no formulário acima para participar
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold text-sm">
                    2
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">
                      Aguarde o Sorteio
                    </h4>
                    <p className="text-gray-600">
                      O sorteio será realizado ao final da campanha
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold text-sm">
                    3
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">
                      Receba seu Prêmio
                    </h4>
                    <p className="text-gray-600">
                      Ganhadores serão contatados e receberão os prêmios
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-6 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-xl border border-primary/20">
                <div className="flex items-start space-x-3">
                  <svg
                    className="w-6 h-6 text-primary mt-1 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-2">
                      Importante!
                    </h4>
                    <p className="text-gray-700 text-sm leading-relaxed">
                      Esta campanha é totalmente gratuita. Não cobramos nenhuma
                      taxa de participação ou entrega. Desconfie de qualquer
                      solicitação de pagamento.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Content - Features */}
          <div
            className={`transition-all duration-1000 delay-400 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-8"
            }`}
          >
            <div className="grid gap-6">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="card-hover p-6 group"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                      {feature.icon}
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors duration-300">
                        {feature.title}
                      </h4>
                      <p className="text-gray-600 leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div
          className={`transition-all duration-1000 delay-600 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="bg-gradient-to-r from-primary to-secondary rounded-2xl p-8 text-white">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold mb-2">
                Números da Nossa Campanha
              </h3>
              <p className="text-primary-100">
                Dados que mostram o tamanho desta oportunidade
              </p>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl lg:text-4xl font-bold mb-2">
                    {stat.number}
                  </div>
                  <div className="text-primary-100 font-medium">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div
          className={`text-center mt-16 transition-all duration-1000 delay-800 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Não Deixe Esta Oportunidade Passar!
            </h3>
            <p className="text-gray-600 mb-8">
              Milhares de pessoas já estão participando. Cadastre-se agora e
              faça parte desta campanha incrível. É gratuito e pode mudar seu
              dia!
            </p>
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
              Participar Agora
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutComponent;
