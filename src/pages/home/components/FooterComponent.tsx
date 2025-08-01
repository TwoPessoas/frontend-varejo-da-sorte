import { useState } from "react";

const FooterComponent = () => {
  const [email, setEmail] = useState("");
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [subscriptionMessage, setSubscriptionMessage] = useState("");

  const handleNewsletterSubmit = async (e: any) => {
    e.preventDefault();

    if (!email.trim()) {
      setSubscriptionMessage("Por favor, digite um e-mail válido");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setSubscriptionMessage("Por favor, digite um e-mail válido");
      return;
    }

    setIsSubscribing(true);
    setSubscriptionMessage("");

    try {
      // Simular chamada da API
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Aqui você faria a chamada real para sua API de newsletter
      console.log("E-mail cadastrado:", email);

      setSubscriptionMessage("✅ E-mail cadastrado com sucesso!");
      setEmail("");
    } catch (err) {
      setSubscriptionMessage("❌ Erro ao cadastrar. Tente novamente.");
    } finally {
      setIsSubscribing(false);

      // Limpar mensagem após 3 segundos
      setTimeout(() => {
        setSubscriptionMessage("");
      }, 3000);
    }
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const currentYear = new Date().getFullYear();

  const navigationLinks = [
    { name: "Início", id: "hero" },
    { name: "Sobre a Campanha", id: "about" },
    { name: "Marcas Parceiras", id: "brands" },
    { name: "Regras", id: "rules" },
    { name: "FAQ", id: "faq" },
  ];

  const legalLinks = [
    { name: "Política de Privacidade", href: "#privacy" },
    { name: "Termos de Uso", href: "#terms" },
    { name: "Regulamento", href: "#regulations" },
    { name: "LGPD", href: "#lgpd" },
  ];

  const socialLinks = [
    {
      name: "Facebook",
      href: "#facebook",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      ),
    },
    {
      name: "Instagram",
      href: "#instagram",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987c6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.73-3.016-1.8L4.27 17.94l-1.02-.408l1.163-2.752c-.24-.661-.24-1.404 0-2.065L3.25 9.963l1.02-.408l1.163 2.752c.568-1.07 1.719-1.8 3.016-1.8s2.448.73 3.016 1.8l1.163-2.752l1.02.408l-1.163 2.752c.24.661.24 1.404 0 2.065l1.163 2.752l-1.02.408l-1.163-2.752c-.568 1.07-1.719 1.8-3.016 1.8z" />
        </svg>
      ),
    },
    {
      name: "Twitter",
      href: "#twitter",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
        </svg>
      ),
    },
    {
      name: "YouTube",
      href: "#youtube",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
        </svg>
      ),
    },
  ];

  return (
    <footer
      id="footer"
      className="bg-gray-900 text-white relative overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-pattern"></div>
      </div>

      {/* Main Footer Content */}
      <div className="relative z-10">
        {/* Newsletter Section */}
        <div className="bg-gradient-to-r from-primary to-secondary">
          <div className="container py-12">
            <div className="max-w-4xl mx-auto text-center">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Fique Por Dentro das Novidades!
              </h3>
              <p className="text-primary-100 mb-8 text-lg">
                Cadastre-se em nossa newsletter e seja o primeiro a saber sobre
                novos sorteios e promoções
              </p>

              <form
                onSubmit={handleNewsletterSubmit}
                className="max-w-md mx-auto"
              >
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Seu melhor e-mail"
                    className="flex-1 px-4 py-3 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/50"
                    disabled={isSubscribing}
                  />
                  <button
                    type="submit"
                    disabled={isSubscribing}
                    className="px-6 py-3 bg-white text-primary font-bold rounded-lg hover:bg-gray-100 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubscribing ? (
                      <>
                        <span className="spinner mr-2 border-primary"></span>
                        Cadastrando...
                      </>
                    ) : (
                      "Cadastrar"
                    )}
                  </button>
                </div>
                {subscriptionMessage && (
                  <p className="mt-3 text-sm text-white/90">
                    {subscriptionMessage}
                  </p>
                )}
              </form>
            </div>
          </div>
        </div>

        {/* Main Footer Links */}
        <div className="container py-16">
          <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8">
            {/* Company Info */}
            <div className="lg:col-span-1">
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-gradient mb-2">
                  Sorteio de Brindes
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  A maior campanha de sorteios do Brasil. Prêmios incríveis,
                  participação gratuita e total transparência.
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <svg
                    className="w-5 h-5 text-primary"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-gray-400">
                    João Pessoa - PB, Brasil
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <svg
                    className="w-5 h-5 text-primary"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                  <span className="text-gray-400">
                    contato@sorteiobrindes.com.br
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <svg
                    className="w-5 h-5 text-primary"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                  <span className="text-gray-400">(83) 9 9999-9999</span>
                </div>
              </div>
            </div>

            {/* Navigation Links */}
            <div>
              <h4 className="text-lg font-bold text-white mb-6">Navegação</h4>
              <ul className="space-y-3">
                {navigationLinks.map((link) => (
                  <li key={link.id}>
                    <button
                      onClick={() => scrollToSection(link.id)}
                      className="text-gray-400 hover:text-primary transition-colors duration-200 cursor-pointer"
                    >
                      {link.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal Links */}
            <div>
              <h4 className="text-lg font-bold text-white mb-6">
                Informações Legais
              </h4>
              <ul className="space-y-3">
                {legalLinks.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-gray-400 hover:text-primary transition-colors duration-200"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>

              <div className="mt-6 p-4 bg-gray-800 rounded-lg">
                <div className="flex items-start space-x-3">
                  <svg
                    className="w-5 h-5 text-primary mt-1 flex-shrink-0"
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
                    <h5 className="text-white font-medium mb-1">
                      Promoção Autorizada
                    </h5>
                    <p className="text-xs text-gray-400">
                      Registro SEEC/PB nº 12345/2025
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Media & Support */}
            <div>
              <h4 className="text-lg font-bold text-white mb-6">
                Redes Sociais
              </h4>
              <div className="flex space-x-4 mb-6">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    className="w-10 h-10 bg-gray-800 hover:bg-primary rounded-lg flex items-center justify-center transition-colors duration-200 group"
                    aria-label={social.name}
                  >
                    <span className="text-gray-400 group-hover:text-white">
                      {social.icon}
                    </span>
                  </a>
                ))}
              </div>

              <div className="space-y-4">
                <div>
                  <h5 className="text-white font-medium mb-2">Atendimento</h5>
                  <p className="text-sm text-gray-400">
                    Segunda a Sexta
                    <br />
                    9h às 18h
                  </p>
                </div>

                <div className="p-4 bg-gray-800 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <svg
                      className="w-4 h-4 text-green-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-green-400 text-sm font-medium">
                      Suporte Online
                    </span>
                  </div>
                  <p className="text-xs text-gray-400">
                    Respondemos em até 2 horas
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Security & Trust Badges */}
        <div className="border-t border-gray-800">
          <div className="container py-8">
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div className="flex items-center justify-center space-x-3">
                <div className="w-12 h-12 bg-green-600/20 rounded-full flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-green-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="text-left">
                  <h6 className="text-white font-medium">Dados Protegidos</h6>
                  <p className="text-xs text-gray-400">Certificação SSL</p>
                </div>
              </div>

              <div className="flex items-center justify-center space-x-3">
                <div className="w-12 h-12 bg-blue-600/20 rounded-full flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-blue-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="text-left">
                  <h6 className="text-white font-medium">Sorteio Auditado</h6>
                  <p className="text-xs text-gray-400">100% Transparente</p>
                </div>
              </div>

              <div className="flex items-center justify-center space-x-3">
                <div className="w-12 h-12 bg-purple-600/20 rounded-full flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-purple-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="text-left">
                  <h6 className="text-white font-medium">LGPD Compliance</h6>
                  <p className="text-xs text-gray-400">Lei 13.709/2018</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800">
          <div className="container py-6">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="text-center md:text-left">
                <p className="text-gray-400 text-sm">
                  © {currentYear} Sorteio de Brindes. Todos os direitos
                  reservados.
                </p>
                <p className="text-gray-500 text-xs mt-1">
                  Desenvolvido por{" "}
                  <span className="text-primary font-medium">
                    3on Projetos Inteligentes
                  </span>
                </p>
              </div>

              <div className="flex items-center space-x-6">
                <button
                  onClick={() => scrollToSection("hero")}
                  className="flex items-center space-x-2 text-gray-400 hover:text-primary transition-colors duration-200"
                >
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-sm">Voltar ao Topo</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterComponent;
