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
      className="section bg-gradient-to-br from-gray-50 to-white relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute top-20 right-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-10 w-80 h-80 bg-secondary/5 rounded-full blur-3xl"></div>

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
              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Marcas Parceiras
          </div>

          <h2 className="text-responsive-lg font-bold text-gray-900 mb-6 text-balance">
            Grandes Marcas,
            <span className="text-gradient block">Grandes Prêmios</span>
          </h2>

          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Nossos parceiros são marcas reconhecidas no mercado, oferecendo
            produtos de alta qualidade que você realmente deseja ganhar.
          </p>
        </div>

        {/* Featured Brands Carousel */}
        <div
          className={`mb-16 transition-all duration-1000 delay-200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              Marcas em Destaque
            </h3>
            <p className="text-gray-600">
              Principais parceiros com os melhores prêmios
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {featuredBrands.map((brand, index) => (
              <div
                key={brand.id}
                className="card-hover p-6 text-center group"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="mb-4">
                  <LogoPlaceholder
                    name={brand.name}
                    featured={brand.featured}
                  />
                </div>
                <h4 className="font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors duration-300">
                  {brand.name}
                </h4>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {brand.description}
                </p>
                <div className="mt-3 inline-flex items-center text-xs text-primary font-medium">
                  <svg
                    className="w-3 h-3 mr-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Destaque
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Category Filter */}
        <div
          className={`mb-12 transition-all duration-1000 delay-400 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              Explore por Categoria
            </h3>
            <p className="text-gray-600">
              Descubra marcas por área de interesse
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeCategory === category.id
                    ? "bg-primary text-white shadow-lg hover:shadow-xl"
                    : "bg-white text-gray-700 border border-gray-200 hover:border-primary hover:text-primary hover:shadow-md"
                }`}
              >
                <span className="mr-2">{category.icon}</span>
                {category.name}
                {activeCategory === category.id && (
                  <span className="ml-2 bg-white/20 text-xs px-2 py-0.5 rounded-full">
                    {category.id === "all"
                      ? brands.length
                      : brands.filter((b) => b.category === category.id).length}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* All Brands Grid */}
        <div
          className={`transition-all duration-1000 delay-600 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {filteredBrands.map((brand, index) => (
              <div
                key={brand.id}
                className="card p-4 text-center group hover-lift"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="mb-3">
                  <LogoPlaceholder
                    name={brand.name}
                    featured={brand.featured}
                  />
                </div>
                <h4 className="font-bold text-gray-900 text-sm mb-1 group-hover:text-primary transition-colors duration-300">
                  {brand.name}
                </h4>
                <p className="text-xs text-gray-600 leading-relaxed">
                  {brand.description}
                </p>
                {brand.featured && (
                  <div className="mt-2">
                    <span className="inline-flex items-center text-xs text-primary font-medium bg-primary/10 px-2 py-1 rounded-full">
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
                      Premium
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Partnership Info */}
        <div
          className={`mt-16 transition-all duration-1000 delay-800 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="bg-gradient-to-r from-primary/10 via-secondary/10 to-primary/10 rounded-2xl p-8 border border-primary/20">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Parcerias de Confiança
                </h3>
                <p className="text-gray-600 leading-relaxed mb-6">
                  Trabalhamos apenas com marcas estabelecidas e confiáveis no
                  mercado. Cada parceiro foi cuidadosamente selecionado para
                  garantir que você receba produtos de alta qualidade.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <svg
                      className="w-5 h-5 text-primary"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-gray-700">
                      Marcas verificadas e licenciadas
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <svg
                      className="w-5 h-5 text-primary"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-gray-700">
                      Produtos originais com garantia
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <svg
                      className="w-5 h-5 text-primary"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-gray-700">
                      Entrega em todo o Brasil
                    </span>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <div className="inline-flex items-center justify-center w-24 h-24 bg-primary/20 rounded-full mb-4">
                  <svg
                    className="w-12 h-12 text-primary"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">10+</div>
                <div className="text-gray-600 font-medium">
                  Marcas Parceiras
                </div>
                <div className="text-sm text-gray-500 mt-1">E crescendo!</div>
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
              Pronto para Ganhar Produtos Dessas Marcas?
            </h3>
            <p className="text-gray-600 mb-8">
              Não perca a chance de levar para casa produtos incríveis das
              melhores marcas do mercado. Sua participação é gratuita e pode
              mudar seu dia!
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
                Participar do Sorteio
              </a>
              <a
                href="#rules"
                className="btn-outline inline-flex items-center hover-lift"
              >
                <svg
                  className="w-5 h-5 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                    clipRule="evenodd"
                  />
                </svg>
                Ver Regras
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BrandsComponent;
