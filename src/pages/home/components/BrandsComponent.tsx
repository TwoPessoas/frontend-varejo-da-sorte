import { useState, useEffect, useRef } from "react";
import type { Brand, BrandCategory, LogoProps } from "../../../types/Brand";

const BrandsComponent = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeCategory, setActiveCategory] = useState("all");
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

  // Dados das marcas (você pode substituir pelos logos reais)
  const brands: Brand[] = [
    {
      id: 1,
      name: "TechPro",
      category: "tecnologia",
      logo: "/api/placeholder/120/60",
      description: "Eletrônicos e gadgets inovadores",
      featured: true,
    },
    {
      id: 2,
      name: "StyleWear",
      category: "moda",
      logo: "/api/placeholder/120/60",
      description: "Moda e acessórios premium",
      featured: false,
    },
    {
      id: 3,
      name: "HomeComfort",
      category: "casa",
      logo: "/api/placeholder/120/60",
      description: "Produtos para casa e decoração",
      featured: true,
    },
    {
      id: 4,
      name: "FitLife",
      category: "esporte",
      logo: "/api/placeholder/120/60",
      description: "Equipamentos e suplementos fitness",
      featured: false,
    },
    {
      id: 5,
      name: "BeautyGlow",
      category: "beleza",
      logo: "/api/placeholder/120/60",
      description: "Cosméticos e cuidados pessoais",
      featured: true,
    },
    {
      id: 6,
      name: "GamerZone",
      category: "tecnologia",
      logo: "/api/placeholder/120/60",
      description: "Games e acessórios para gamers",
      featured: false,
    },
    {
      id: 7,
      name: "BookWorld",
      category: "educacao",
      logo: "/api/placeholder/120/60",
      description: "Livros e materiais educacionais",
      featured: false,
    },
    {
      id: 8,
      name: "AutoParts",
      category: "automotivo",
      logo: "/api/placeholder/120/60",
      description: "Peças e acessórios automotivos",
      featured: true,
    },
    {
      id: 9,
      name: "KitchenMaster",
      category: "casa",
      logo: "/api/placeholder/120/60",
      description: "Utensílios e eletrodomésticos",
      featured: false,
    },
    {
      id: 10,
      name: "TravelGear",
      category: "viagem",
      logo: "/api/placeholder/120/60",
      description: "Equipamentos para viagem",
      featured: false,
    },
  ];

  const categories: BrandCategory[] = [
    { id: "all", name: "Todas as Marcas", icon: "🏢" },
    { id: "tecnologia", name: "Tecnologia", icon: "💻" },
    { id: "moda", name: "Moda", icon: "👕" },
    { id: "casa", name: "Casa & Decoração", icon: "🏠" },
    { id: "esporte", name: "Esporte & Fitness", icon: "🏃‍♂️" },
    { id: "beleza", name: "Beleza", icon: "💄" },
    { id: "educacao", name: "Educação", icon: "📚" },
    { id: "automotivo", name: "Automotivo", icon: "🚗" },
    { id: "viagem", name: "Viagem", icon: "✈️" },
  ];

  const filteredBrands =
    activeCategory === "all"
      ? brands
      : brands.filter((brand) => brand.category === activeCategory);

  const featuredBrands = brands.filter((brand) => brand.featured);

  // Componente para placeholder de logo
  const LogoPlaceholder = ({ name, featured }: LogoProps) => (
    <div
      className={`w-full h-16 rounded-lg flex items-center justify-center text-white font-bold text-lg ${
        featured
          ? "bg-gradient-to-r from-primary to-secondary"
          : "bg-gradient-to-r from-gray-400 to-gray-600"
      }`}
    >
      {name.substring(0, 2).toUpperCase()}
    </div>
  );

  return (
    <section
      id="brands"
      ref={sectionRef}
      className="section relative "
    >
      {/* Background Elements */}
      <div className="absolute bottom-0 left-10 w-64 ">
        <img src="./imgs/modelo-campanha.png" alt="Concorra a centenas de vale-coompras de R$750,00 " />
      </div>
      <div className="absolute bottom-20 left-10 w-80 h-80 bg-secondary/5 rounded-full blur-3xl"></div>

      <div className="container relative z-10">
        {/* Section Header */}
        <div
          className={`text-center mb-4 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <header className="sec_header">
            <h1 className="title uppercase text-white">NOssos Parceiros</h1>
          </header>
        </div>

        {/* BRANDS */}
        <div className="marcas-wrapper brands">
                {/* <!-- DIAMANTE --> */}
                <div className="diamante">
                  <div className="g-3">
                    <div className="marca-item">
                          <img src="./imgs/marcas/diamante/itaipava-premium.png" className="logo lazyload g-4" />
                        </div>
                    </div>

                    <div className="g-3">
                        <div className="marca-item brand_item">
                          <img src="./imgs/marcas/diamante/tnt.png" className="logo lazyload g-4" />
                        </div>
                    </div>

                    <div className="g-3">
                        <div className="marca-item">
                          <img src="./imgs/marcas/diamante/ala.png" className="logo lazyload g-4" />
                        </div>
                    </div>

                    <div className="g-3">
                        <div className="marca-item">
                          <img src="./imgs/marcas/diamante/seda.png" className="logo lazyload g-4" />
                        </div>
                    </div>        
                    
                    <div className="g-3">
                        <div className="marca-item">
                          <img src="./imgs/marcas/diamante/sadia.png" className="logo lazyload g-4" />
                        </div>
                    </div>
                    
                    <div className="g-3">
                        <div className="marca-item">
                          <img src="./imgs/marcas/diamante/vitarella.png" className="logo lazyload g-4" />
                        </div>
                    </div>
                    <div className="g-3">
                        <div className="marca-item">
                          <img src="./imgs/marcas/diamante/piraque.png" className="logo lazyload g-4" />
                        </div>
                    </div>

                    <div className="g-3">
                        <div className="marca-item">
                          <img src="./imgs/marcas/diamante/ninho.png" className="logo lazyload g-4" />
                        </div>
                    </div>
                    
                </div>

                {/* <!-- OURO --> */}
                <div className="ouro">
                    <div className="g-3">
                        <div className="marca-item">
                          <img src="./imgs/marcas/ouro/sao-braz.png" className="logo lazyload " />
                        </div>
                    </div>
                    <div className="g-3">
                        <div className="marca-item">
                          <img src="./imgs/marcas/ouro/seara.png" className="logo lazyload " />
                        </div>
                    </div>
                    <div className="g-3">
                        <div className="marca-item">
                          <img src="./imgs/marcas/ouro/fofura-baby.png" className="logo lazyload " />
                        </div>
                    </div>
                    <div className="g-3">
                        <div className="marca-item">
                        <img src="./imgs/marcas/ouro/coca.png" className="logo lazyload " />
                        </div>
                    </div>
                    <div className="g-3">
                        <div className="marca-item">
                        <img src="./imgs/marcas/ouro/ype.png" className="logo lazyload " />
                        </div>
                    </div>
                    <div className="g-3">
                        <div className="marca-item">
                        <img src="./imgs/marcas/ouro/neve.png" className="logo lazyload " />
                        </div>
                    </div>                   
                    <div className="g-3">
                        <div className="marca-item">
                        <img src="./imgs/marcas/ouro/marilan.png" className="logo lazyload " />
                        </div>
                    </div>
                    <div className="g-3">
                        <div className="marca-item">
                        <img src="./imgs/marcas/ouro/brahma.png" className="logo lazyload " />
                        </div>
                    </div>                    
                    <div className="g-3">
                        <div className="marca-item">
                        <img src="./imgs/marcas/ouro/yoki.png" className="logo lazyload " />
                        </div>
                    </div>
                    <div className="g-3">
                        <div className="marca-item">
                        <img src="./imgs/marcas/ouro/ekobom.png" className="logo lazyload " />
                        </div>
                    </div>
                </div>
                {/* <!-- PRATA --> */}
                <div className="prata">

                  <div className="g-2">
                      <div className="marca-item">
                        <img src="./imgs/marcas/prata/pantene.png" className="logo lazyload " />
                      </div>
                  </div>
                  <div className="g-2">
                      <div className="marca-item">
                        <img src="./imgs/marcas/prata/camil.png" className="logo lazyload " />
                      </div>
                  </div>
                  <div className="g-2">
                      <div className="marca-item">
                        <img src="./imgs/marcas/prata/francis.png" className="logo lazyload " />
                      </div>
                  </div>
                  <div className="g-2">
                      <div className="marca-item">
                        <img src="./imgs/marcas/prata/ox.png" className="logo lazyload " />
                      </div>
                  </div>
                  <div className="g-2">
                      <div className="marca-item">
                        <img src="./imgs/marcas/prata/betania.png" className="logo lazyload " />
                      </div>
                  </div>
                  <div className="g-2">
                      <div className="marca-item">
                        <img src="./imgs/marcas/prata/batavo.png" className="logo lazyload " />
                      </div>
                  </div>

                  {/* 2 */}
                  <div className="g-2">
                      <div className="marca-item">
                        <img src="./imgs/marcas/prata/marata.png" className="logo lazyload " />
                      </div>
                  </div>
                  <div className="g-2">
                      <div className="marca-item">
                        <img src="./imgs/marcas/prata/nestle-grego.png" className="logo lazyload " />
                      </div>
                  </div>
                  <div className="g-2">
                      <div className="marca-item">
                        <img src="./imgs/marcas/prata/mauricea.png" className="logo lazyload " />
                      </div>
                  </div>
                  <div className="g-2">
                      <div className="marca-item">
                        <img src="./imgs/marcas/prata/petybon.png" className="logo lazyload " />
                      </div>
                  </div>
                  <div className="g-2">
                      <div className="marca-item">
                        <img src="./imgs/marcas/prata/johnson-baby.png" className="logo lazyload " />
                      </div>
                  </div>
                  <div className="g-2">
                      <div className="marca-item">
                        <img src="./imgs/marcas/prata/baygon.png" className="logo lazyload " />
                      </div>
                  </div>

                  {/* 3 */}
                  <div className="g-2">
                      <div className="marca-item">
                        <img src="./imgs/marcas/prata/bemtevi.png" className="logo lazyload " />
                      </div>
                  </div>
                  <div className="g-2">
                      <div className="marca-item">
                        <img src="./imgs/marcas/prata/baly.png" className="logo lazyload " />
                      </div>
                  </div>
                  <div className="g-2">
                      <div className="marca-item">
                        <img src="./imgs/marcas/prata/amstel.png" className="logo lazyload " />
                      </div>
                  </div>
                  <div className="g-2">
                      <div className="marca-item">
                        <img src="./imgs/marcas/prata/melitta.png" className="logo lazyload " />
                      </div>
                  </div>
                  <div className="g-2">
                      <div className="marca-item">
                        <img src="./imgs/marcas/prata/santa-clara.png" className="logo lazyload " />
                      </div>
                  </div>
                  <div className="g-2">
                      <div className="marca-item">
                        <img src="./imgs/marcas/prata/heinz.png" className="logo lazyload " />
                      </div>
                  </div>
                  <div className="g-2">
                      <div className="marca-item">
                        <img src="./imgs/marcas/prata/yopro.png" className="logo lazyload " />
                      </div>
                  </div>                
                  <div className="g-2">
                      <div className="marca-item">
                        <img src="./imgs/marcas/prata/aurora.png" className="logo lazyload " />
                      </div>
                  </div>
                  <div className="g-2">
                      <div className="marca-item">
                        <img src="./imgs/marcas/prata/colgate.png" className="logo lazyload " />
                      </div>
                  </div>

                </div>

                {/* <!-- BRONZE --> */}
                <div className="bronze">
                    <div className="g-1">
                        <div className="marca-item">
                          <img src="./imgs/marcas/bronze/rj-alimentos.png" className="logo lazyload " />
                        </div>
                    </div>
                    <div className="g-1">
                        <div className="marca-item">
                          <img src="./imgs/marcas/bronze/above.png" className="logo lazyload " />
                        </div>
                    </div>                    
                    <div className="g-1">
                        <div className="marca-item">
                          <img src="./imgs/marcas/bronze/dragao.png" className="logo lazyload " />
                        </div>
                    </div>
                    <div className="g-1">
                        <div className="marca-item">
                          <img src="./imgs/marcas/bronze/enerup.png" className="logo lazyload " />
                        </div>
                    </div>
                    <div className="g-1">
                        <div className="marca-item">
                          <img src="./imgs/marcas/bronze/nestle-sorvetes.png" className="logo lazyload " />
                        </div>
                    </div>
                    <div className="g-1">
                        <div className="marca-item">
                          <img src="./imgs/marcas/bronze/elseve.png" className="logo lazyload " />
                        </div>
                    </div>
                    <div className="g-1">
                        <div className="marca-item">
                          <img src="./imgs/marcas/bronze/italac.png" className="logo lazyload " />
                        </div>
                    </div>
                    <div className="g-1">
                        <div className="marca-item">
                          <img src="./imgs/marcas/bronze/slight.png" className="logo lazyload " />
                        </div>
                    </div>

                    <div className="g-1">
                        <div className="marca-item">
                          <img src="./imgs/marcas/bronze/herbissimo.png" className="logo lazyload " />
                        </div>
                    </div>
                    <div className="g-1">
                        <div className="marca-item">
                          <img src="./imgs/marcas/bronze/sempre.png" className="logo lazyload " />
                        </div>
                    </div>
                    <div className="g-1">
                        <div className="marca-item">
                          <img src="./imgs/marcas/bronze/qboa.png" className="logo lazyload " />
                        </div>
                    </div>
                    <div className="g-1">
                        <div className="marca-item">
                          <img src="./imgs/marcas/bronze/elefante.png" className="logo lazyload " />
                        </div>
                    </div>
                    <div className="g-1">
                        <div className="marca-item">
                          <img src="./imgs/marcas/bronze/condor.png" className="logo lazyload " />
                        </div>
                    </div>
                    <div className="g-1">
                        <div className="marca-item">
                          <img src="./imgs/marcas/bronze/babysec.png" className="logo lazyload " />
                        </div>
                    </div>
                    <div className="g-1">
                        <div className="marca-item">
                          <img src="./imgs/marcas/bronze/ccgl.png" className="logo lazyload " />
                        </div>
                    </div>
                    <div className="g-1">
                        <div className="marca-item">
                          <img src="./imgs/marcas/bronze/uauingleza.png" className="logo lazyload " />
                        </div>
                    </div>
                    <div className="g-1">
                        <div className="marca-item">
                          <img src="./imgs/marcas/bronze/dentalclean.png" className="logo lazyload " />
                        </div>
                    </div>
                    <div className="g-1">
                        <div className="marca-item">
                          <img src="./imgs/marcas/bronze/plasutil.png" className="logo lazyload " />
                        </div>
                    </div>
                    <div className="g-1">
                        <div className="marca-item">
                          <img src="./imgs/marcas/bronze/bauducco.png" className="logo lazyload " />
                        </div>
                    </div>

                </div>
        </div>
       
      </div>
    </section>
  );
};

export default BrandsComponent;
