import { useState, useEffect, useRef } from "react";
import type { Brand } from "../../../types/Brand";

const BrandsComponent = () => {
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

  const brands: Brand[] = [
    {
      category: "diamante",
      logos: [
        "./imgs/marcas/diamante/itaipava-premium.png",
        "./imgs/marcas/diamante/tnt.png",
        "./imgs/marcas/diamante/ala.png",
        "./imgs/marcas/diamante/seda.png",
        "./imgs/marcas/diamante/sadia.png",
        "./imgs/marcas/diamante/vitarella.png",
        "./imgs/marcas/diamante/piraque.png",
        "./imgs/marcas/diamante/ninho.png",
      ],
    },
    {
      category: "ouro",
      logos: [
        "./imgs/marcas/ouro/sao-braz.png",
        "./imgs/marcas/ouro/seara.png",
        "./imgs/marcas/ouro/fofura-baby.png",
        "./imgs/marcas/ouro/coca.png",
        "./imgs/marcas/ouro/ype.png",
        "./imgs/marcas/ouro/neve.png",
        "./imgs/marcas/ouro/marilan.png",
        "./imgs/marcas/ouro/brahma.png",
        "./imgs/marcas/ouro/yoki.png",
        "./imgs/marcas/ouro/ekobom.png",
      ],
    },
    {
      category: "prata",
      logos: [
        "./imgs/marcas/prata/pantene.png",
        "./imgs/marcas/prata/camil.png",
        "./imgs/marcas/prata/francis.png",
        "./imgs/marcas/prata/ox.png",
        "./imgs/marcas/prata/betania.png",
        "./imgs/marcas/prata/batavo.png",
        "./imgs/marcas/prata/marata.png",
        "./imgs/marcas/prata/nestle-grego.png",
        "./imgs/marcas/prata/mauricea.png",
        "./imgs/marcas/prata/petybon.png",
        "./imgs/marcas/prata/johnson-baby.png",
        "./imgs/marcas/prata/baygon.png",
        "./imgs/marcas/prata/bemtevi.png",
        "./imgs/marcas/prata/baly.png",
        "./imgs/marcas/prata/amstel.png",
        "./imgs/marcas/prata/melitta.png",
        "./imgs/marcas/prata/santa-clara.png",
        "./imgs/marcas/prata/heinz.png",
        "./imgs/marcas/prata/yopro.png",
        "./imgs/marcas/prata/aurora.png",
        "./imgs/marcas/prata/colgate.png",
      ],
    },
    {
      category: "bronze",
      logos: [
        "./imgs/marcas/bronze/rj-alimentos.png",
        "./imgs/marcas/bronze/above.png",
        "./imgs/marcas/bronze/dragao.png",
        "./imgs/marcas/bronze/enerup.png",
        "./imgs/marcas/bronze/nestle-sorvetes.png",
        "./imgs/marcas/bronze/elseve.png",
        "./imgs/marcas/bronze/italac.png",
        "./imgs/marcas/bronze/slight.png",
        "./imgs/marcas/bronze/herbissimo.png",
        "./imgs/marcas/bronze/sempre.png",
        "./imgs/marcas/bronze/qboa.png",
        "./imgs/marcas/bronze/elefante.png",
        "./imgs/marcas/bronze/condor.png",
        "./imgs/marcas/bronze/babysec.png",
        "./imgs/marcas/bronze/ccgl.png",
        "./imgs/marcas/bronze/uauingleza.png",
        "./imgs/marcas/bronze/dentalclean.png",
        "./imgs/marcas/bronze/plasutil.png",
        "./imgs/marcas/bronze/bauducco.png",
      ],
    },
  ];

  return (
    <section
      id="brands"
      ref={sectionRef}
      className={`section relative z-10 pb-[340px] 
                  md:pb-[430px] 
                  lg:pb-10
                  transition-all duration-1000 ${
                    isVisible ? "opacity-100 " : "opacity-0 "
                  }`}
    >
      {/* Background Elements */}
      <div className="absolute bottom-0 left-0 w-full z-20">
        <img
          src="./imgs/modelo-campanha.png"
          alt="Concorra a centenas de vale-coompras de R$750,00 "
          className="max-w-[280px] mx-auto 
                    md:max-w-[360px]
                    lg:ml-[2vw]
                    xl:w-[40%] xl:max-w-[480px] xl:ml-[5vw]
                    2xl:ml-[10vw]"
        />
      </div>

      <div
        className="ballon-wrapper justify-start -top-32  right-0 w-[30vw] 
                      md:w-[150px] md:-top-20"
      >
        <img
          src="./imgs/balao-azul.png"
          alt=" "
          className="ballon ballon-animated ml-[50%]"
        />
      </div>

      <div
        className="ballon-wrapper justify-end bottom-32  left-0 w-[30vw] z-10
                      md:w-[180px] md:bottom-20 md:left-[2vw]
                      lg:bottom-[initial] lg:top-2"
      >
        <img
          src="./imgs/balao-laranja.png"
          alt=" "
          className="ballon ballon-animated mr-[30%] md:mr-0"
        />
      </div>

      {/* SECTION CONTENT */}
      <div
        className={`container relative z-10 transition-all duration-1000 delay-200 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        {/* Section Header */}
        <header className="sec_header text-center mb-12">
          <h1 className="title uppercase text-white">Nossos Parceiros</h1>
        </header>

        <div
          className="marcas-wrapper brands 
                        lg:w-[60%] lg:ml-auto"
        >
          {brands.map((brand, index) => (
            <div key={index} className={`g-3 ${brand.category}`}>
              {brand.logos.map((logo, logoIndex) => (
                <div className="g-3">
                  <div className="marca-item">
                    <img
                      key={logoIndex}
                      src={logo}
                      className={`logo lazyload ${
                        brand.category === "diamante" ? "g-4" : ""
                      }`}
                    />
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrandsComponent;
