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
      name: "Sorteio Semanal",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
        </svg>
      ),
    },
    {
      id: "prizes",
      name: "Vale-Compras",
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
  ];

  const rulesContent: any = {
    participation: {
      title: "Sorteio Semanal",
      subtitle: "Requisitos e processo de participação",
      content: (
        <div className="regulamento-text text-gray-800">
          <h3 className="">"ANIVERSÁRIO ATAKAREJO 2025"</h3>
          <ol>
            <li>Empresa Mandatária
              <ol>
                <li>Razão Social: Pax Marketing e Eventos Ltda </li>
                <li>Endereço: Av. Tancredo Neves, 620 – Caminho das Árvores – Salvador/BA</li>
                <li>CNPJ nº. 34.394.645/0001-78 </li>
              </ol>
            </li>
            <li>Empresa Aderente
              <ol>
                <li>Razão Social: Atakarejo Distribuidor de Alimentos e Bebidas S.A</li>
                <li>Endereço: Av. Santiago de Compostela, 425 – Brotas – Salvador/BA – CEP: 40.279-1500</li>
                <li>CNPJ nº. 73.849.952/0010-49</li>
              </ol>
            </li>
            <p>A Empresa Mandatária e as Empresas Aderentes são referidas neste documento em conjunto como “Promotora”.  </p>
          </ol>
        </div>
      ),
      
    },
    prizes: {
      title: "Vale-Compras",
      subtitle: "Informações detalhadas sobre premiação",
      content: (
        <div className="regulamento-text">
          <h3 className="">"ANIVERSÁRIO ATAKAREJO 2025"</h3>
          <ol>
            <li>Empresa Mandatária
              <ol>
                <li>Razão Social: Pax Marketing e Eventos Ltda </li>
                <li>Endereço: Av. Tancredo Neves, 620 – Caminho das Árvores – Salvador/BA</li>
                <li>CNPJ nº. 34.394.645/0001-78 </li>
              </ol>
            </li>
            <li>Empresa Aderente
              <ol>
                <li>Razão Social: Atakarejo Distribuidor de Alimentos e Bebidas S.A</li>
                <li>Endereço: Av. Santiago de Compostela, 425 – Brotas – Salvador/BA – CEP: 40.279-1500</li>
                <li>CNPJ nº. 73.849.952/0010-49</li>
              </ol>
            </li>
            <p>A Empresa Mandatária e as Empresas Aderentes são referidas neste documento em conjunto como “Promotora”.  </p>
          </ol>
        </div>
      ),
    },
   
  };

  const currentContent = rulesContent[activeTab];

  return (
    <section
      id="rules"
      ref={sectionRef}      
      className={`section rules_section relative z-10 transition-all duration-1000 delay-400 
          md:pb-36 ${
            isVisible ? "opacity-100 " : "opacity-0"
          }`}
    >
      
      <div className="ballon-wrapper justify-start -top-32  right-0 w-[30vw] 
                      md:w-[150px] md:-top-20" >
          <img src="./imgs/balao-laranja.png" alt=" " className="ballon ballon-animated ml-[50%]" />
      </div>
      
      <div className="ballon-wrapper justify-end bottom-32  left-0 w-[30vw]
                      md:w-[180px] md:bottom-20 md:left-[2vw]" >
          <img src="./imgs/balao-azul.png" alt=" " className="ballon ballon-animated mr-[30%] md:mr-0" />
      </div>
      

      <div className="container relative z-10">
        
        <header className="sec_header">
          <h1 className="title text-primary text-center mb-8 uppercase">
            Regulamento
          </h1>
        </header>
        

        {/* Tabs Navigation */}
        <div
          className={`mb-12 transition-all duration-1000 delay-400 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="flex flex-wrap justify-center gap-2 ">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center justify-center px-6 py-3  w-full md:w-auto  text-center rounded-lg font-medium transition-all duration-300 ${
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
          className={`transition-all duration-1000 delay-600 tab-content bg-white bg-opacity-50 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="max-w-4xl mx-auto py-8 px-6">
            {/* Content Header */}
            <header className="tab_content-header text-center mb-12">
              <h3 className="text-3xl font-bold text-gray-900 mb-2">
                {currentContent.title}
              </h3>
              <p className="text-gray-600">{currentContent.subtitle}</p>
            </header>


            {/* Content  */}
            <div className="content text-gray-900">
              {currentContent.content}
            </div>
          </div>
        </div>

        

        {/* Call to Action */}
        <div
          className={`text-center mt-6 transition-all duration-1000 delay-1000 mb-20 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="max-w-2xl mx-auto">
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/regulamento"
                className="btn-outline inline-flex items-center hover-lift"
              >
                Conferir Regulamento completo 
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
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RulesComponent;
