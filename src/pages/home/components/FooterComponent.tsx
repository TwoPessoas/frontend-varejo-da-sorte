import { Target } from "lucide-react";
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
    { name: "Política de Privacidade", href: "https://atakarejo.com.br/politica-de-privacidade/", target: "_blank" },
    { name: "DOP", href: "https://atakarejo.com.br/fale-com-o-dpo/", target: "_blank" },
    { name: "Termos de Uso", href: "#terms", target: "_blank" },
    { name: "Regulamento", href: "#regulations", target: "self" },    
  ];

  const socialLinks = [
    {
      name: "Facebook",
      href: "https://pt-br.facebook.com/oficialatakarejo/",
      icon: (
        <svg fill="currentColor" className="w-5 h-5" height="17" viewBox="0 0 17 17" width="17" >
          <path fill="white" d="M14.1762 0.823608H2.68022C2.08296 0.823608 1.51015 1.06087 1.08782 1.4832C0.665486 1.90554 0.428223 2.47834 0.428223 3.07561V14.5716C0.428223 15.1689 0.665486 15.7417 1.08782 16.164C1.51015 16.5863 2.08296 16.8236 2.68022 16.8236H7.91222V10.9836H5.93422V8.70561H7.91222V7.02761C7.91222 6.07661 8.17522 5.33761 8.70122 4.81261C9.22722 4.28661 9.94022 4.02261 10.8412 4.02261C11.7432 4.02261 12.3272 4.05761 12.5942 4.12361V6.15161H11.3922C10.9582 6.15161 10.6622 6.24361 10.5032 6.42761C10.3452 6.61061 10.2662 6.88661 10.2662 7.25361V8.70561H12.5192L12.2192 10.9836H10.2662V16.8236H14.1762C14.7735 16.8236 15.3463 16.5863 15.7686 16.164C16.191 15.7417 16.4282 15.1689 16.4282 14.5716V3.07561C16.4282 2.47834 16.191 1.90554 15.7686 1.4832C15.3463 1.06087 14.7735 0.823608 14.1762 0.823608Z" />
        </svg>
      ),
    },
    {
      name: "Instagram",
      href: "https://www.instagram.com/oficialatakarejo/",
      icon: (
        <svg fill="currentColor" className="w-5 h-5"  height="17" viewBox="0 0 17 17" width="17" >
          <path fill="white" d="M13.6683 4.78509C13.6683 4.90669 13.6443 5.02711 13.5978 5.13945C13.5513 5.2518 13.483 5.35388 13.3971 5.43987C13.3111 5.52586 13.209 5.59406 13.0966 5.6406C12.9843 5.68714 12.8639 5.71109 12.7423 5.71109C12.6207 5.71109 12.5003 5.68714 12.3879 5.6406C12.2756 5.59406 12.1735 5.52586 12.0875 5.43987C12.0015 5.35388 11.9333 5.2518 11.8868 5.13945C11.8402 5.02711 11.8163 4.90669 11.8163 4.78509C11.8163 4.5395 11.9138 4.30397 12.0875 4.13031C12.2612 3.95665 12.4967 3.85909 12.7423 3.85909C12.9879 3.85909 13.2234 3.95665 13.3971 4.13031C13.5707 4.30397 13.6683 4.5395 13.6683 4.78509ZM16.6083 8.96509V8.97709L16.5553 12.3331C16.5418 13.5434 16.055 14.7004 15.1992 15.5563C14.3435 16.4123 13.1866 16.8993 11.9763 16.9131L8.60828 16.9651H8.59628L5.24028 16.9121C4.02995 16.8986 2.87299 16.4118 2.01702 15.5561C1.16104 14.7003 0.674051 13.5434 0.660276 12.3331L0.608276 8.96509V8.95309L0.661276 5.59709C0.674786 4.38676 1.16152 3.2298 2.01731 2.37383C2.8731 1.51785 4.02995 1.03086 5.24028 1.01709L8.60828 0.965088H8.62028L11.9763 1.01809C13.1866 1.0316 14.3436 1.51833 15.1995 2.37412C16.0555 3.22991 16.5425 4.38676 16.5563 5.59709L16.6083 8.96509ZM15.1183 8.96509L15.0663 5.62009C15.0569 4.79737 14.7259 4.01099 14.1442 3.4292C13.5624 2.84742 12.776 2.51644 11.9533 2.50709L8.60828 2.45509L5.26328 2.50709C4.44056 2.51644 3.65418 2.84742 3.07239 3.4292C2.49061 4.01099 2.15963 4.79737 2.15028 5.62009L2.09828 8.96509L2.15028 12.3101C2.15963 13.1328 2.49061 13.9192 3.07239 14.501C3.65418 15.0828 4.44056 15.4137 5.26328 15.4231L8.60828 15.4751L11.9533 15.4231C12.776 15.4137 13.5624 15.0828 14.1442 14.501C14.7259 13.9192 15.0569 13.1328 15.0663 12.3101L15.1183 8.96509ZM12.7163 8.96509C12.7163 10.0546 12.2835 11.0995 11.5131 11.8699C10.7427 12.6403 9.69779 13.0731 8.60828 13.0731C7.51877 13.0731 6.47388 12.6403 5.70348 11.8699C4.93308 11.0995 4.50028 10.0546 4.50028 8.96509C4.50028 7.87558 4.93308 6.83069 5.70348 6.06029C6.47388 5.28989 7.51877 4.85709 8.60828 4.85709C9.69779 4.85709 10.7427 5.28989 11.5131 6.06029C12.2835 6.83069 12.7163 7.87558 12.7163 8.96509ZM11.2263 8.96509C11.2263 8.27075 10.9505 7.60485 10.4595 7.11388C9.96851 6.62291 9.30261 6.34709 8.60828 6.34709C7.91394 6.34709 7.24804 6.62291 6.75707 7.11388C6.2661 7.60485 5.99028 8.27075 5.99028 8.96509C5.99028 9.65942 6.2661 10.3253 6.75707 10.8163C7.24804 11.3073 7.91394 11.5831 8.60828 11.5831C9.30261 11.5831 9.96851 11.3073 10.4595 10.8163C10.9505 10.3253 11.2263 9.65942 11.2263 8.96509Z" /></svg>

      ),
    },
    {
      name: "YouTube",
      href: "https://www.youtube.com/oficialatakarejo",
      icon: (
        <svg  fill="currentColor"  className="w-5 h-5" version="1.1" viewBox="0 0 24 24" >
          <g fill="white"><path d="M23.3,7.3c0-0.2-0.3-1.8-1-2.5c-0.9-1-1.9-1.1-2.4-1.1l-0.1,0c-3.1-0.2-7.7-0.2-7.8-0.2c0,0-4.7,0-7.8,0.2l-0.1,0   c-0.5,0-1.5,0.1-2.4,1.1c-0.7,0.8-1,2.4-1,2.6c0,0.1-0.2,1.9-0.2,3.8v1.7c0,1.9,0.2,3.7,0.2,3.8c0,0.2,0.3,1.8,1,2.5   c0.8,0.9,1.8,1,2.4,1.1c0.1,0,0.2,0,0.3,0c1.8,0.2,7.3,0.2,7.5,0.2c0,0,0,0,0,0c0,0,4.7,0,7.8-0.2l0.1,0c0.5-0.1,1.5-0.2,2.4-1.1   c0.7-0.8,1-2.4,1-2.6c0-0.1,0.2-1.9,0.2-3.8v-1.7C23.5,9.3,23.3,7.4,23.3,7.3z M15.9,12.2l-6,3.2c-0.1,0-0.1,0.1-0.2,0.1   c-0.1,0-0.2,0-0.2-0.1c-0.1-0.1-0.2-0.2-0.2-0.4l0-6.5c0-0.2,0.1-0.3,0.2-0.4S9.8,8,10,8.1l6,3.2c0.2,0.1,0.3,0.2,0.3,0.4   S16.1,12.1,15.9,12.2z"/></g>
        </svg>
      ),
        },
        {
      name: "LinkedIn",
      href: "https://www.linkedin.com/company/atakad%C3%A3o-atakarejo/",
      icon: (
        <svg fill="currentColor" className="w-5 h-5" viewBox="0 0 512 512">
          <path fill="white" d="M449.446,0c34.525,0 62.554,28.03 62.554,62.554l0,386.892c0,34.524 -28.03,62.554 -62.554,62.554l-386.892,0c-34.524,0 -62.554,-28.03 -62.554,-62.554l0,-386.892c0,-34.524 28.029,-62.554 62.554,-62.554l386.892,0Zm-288.985,423.278l0,-225.717l-75.04,0l0,225.717l75.04,0Zm270.539,0l0,-129.439c0,-69.333 -37.018,-101.586 -86.381,-101.586c-39.804,0 -57.634,21.891 -67.617,37.266l0,-31.958l-75.021,0c0.995,21.181 0,225.717 0,225.717l75.02,0l0,-126.056c0,-6.748 0.486,-13.492 2.474,-18.315c5.414,-13.475 17.767,-27.434 38.494,-27.434c27.135,0 38.007,20.707 38.007,51.037l0,120.768l75.024,0Zm-307.552,-334.556c-25.674,0 -42.448,16.879 -42.448,39.002c0,21.658 16.264,39.002 41.455,39.002l0.484,0c26.165,0 42.452,-17.344 42.452,-39.002c-0.485,-22.092 -16.241,-38.954 -41.943,-39.002Z"/>
        </svg>
      ),
        },
      ];

      return (
        <footer
      id="footer"
      className=" text-white relative overflow-hidden bg-gradient-to-b from-secondary-700/100 to-secondary/100"
        >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-pattern"></div>
      </div>

      {/* Main Footer Content */}
      <div className="relative z-10">
       

        {/* Main Footer Links */}
        <div className="container py-16">
          <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8">
            {/* Company Info */}
            <div className="md:col-span-2 lg:col-span-1">
              <img src="./imgs/logo.svg" alt="Atakarejo" className="mx-auto w-1/2" />

            </div>

            {/* Social Media & Support */}
            <div>
              <h4 className="text-lg font-bold text-white mb-2">
                Redes Sociais
              </h4>
              <div className="flex space-x-4 mb-6">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    className="w-10 h-10 bg-primary-800 hover:bg-primary-900 rounded-lg flex items-center justify-center transition-colors duration-200 group"
                    aria-label={social.name}
                  >
                    <span className="text-gray-400 group-hover:text-white">
                      {social.icon}
                    </span>
                  </a>
                ))}
              </div>

              <div className="space-y-4">
                <div className="p-4 bg-white/20 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <svg
                      className="w-4 h-4 text-green-800"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-green-800 text-sm font-medium">
                      Suporte 
                    </span>
                  </div>                  
                  <p>
                      Para dúvidas ou Suporte entre em contato através dos nossos canais
                      de comunicação:
                    </p>
                    <ul className="list-disc pl-5 mt-4">
                      <li>71 3460-8700</li>
                      <li>
                        <a href="mailto:contato@atakarejo.com.br">
                          contato@atakarejo.com.br
                        </a>
                      </li>
                    </ul>
                </div>
              </div>
            </div>
            {/* Legal Links */}
            <div>
              <h4 className="text-lg font-bold text-white mb-2">
                Informações Legais
              </h4>
              <ul className="space-y-1">
                {legalLinks.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      target={link.target}
                      className=" hover:text-primary transition-colors duration-200"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
              
              
              <div className="mt-6 p-4 bg-white/20 rounded-lg">
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
                    <h5 className="text-white text-sm mb-1">
                      Promoção autorizada pelo Ministério da Economia.
                    </h5>
                    <p className="text-xs text-primary">
                      Certificado de Autorização SEAE Nº. 05.021865/2022. 
                    </p>
                  </div>
                  
                </div>

              </div> 
              

            </div>

            
          </div>
        </div>

        {/* Security & Trust Badges */}
        <div className="border-t border-secondary-800">
          <div className="container py-4">
            <div className="grid md:grid-cols-3 gap-4 text-center">
              <div className="flex items-center justify-center space-x-3 bg-white/20 py-2">
                <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-primary"
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
                  <p className="text-xs text-primary">Certificação SSL</p>
                </div>
              </div>

              <div className="flex items-center justify-center space-x-3 bg-white/20 py-2">
                <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-primary"
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
                  <p className="text-xs text-primary">100% Transparente</p>
                </div>
              </div>

              <div className="flex items-center justify-center space-x-3 bg-white/20 py-2">
                <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-primary"
                    fill="currentColor"
                    viewBox="0 0 512 512"
                  >
                      <path fill="currentColor" d="M481.2,89.6c-29.1-5.2-58.7-13-88-23.2-23.5-8.2-46.8-18-69.4-29.1-38.5-18.9-61.6-35.2-61.8-35.4-3.6-2.6-8.4-2.6-12,0-.2.2-23.4,16.5-61.8,35.4-22.6,11.1-45.9,20.8-69.4,29.1-29.3,10.2-58.9,18-88,23.2-5,.9-8.6,5.2-8.6,10.2v64.2c0,69.2,12.1,130.5,35.9,182.2,19.2,41.7,45.9,77.3,79.5,105.7,29.9,25.3,59.8,40.2,79.6,48.2,21.7,8.8,36.3,11.5,36.9,11.6.6.1,1.2.2,1.9.2s1.3,0,1.9-.2c.6-.1,15.3-2.9,36.9-11.6,19.8-8,49.7-22.9,79.6-48.2,33.6-28.5,60.3-64,79.5-105.7,23.8-51.8,35.9-113.1,35.9-182.2v-64.2c0-5-3.6-9.3-8.6-10.2ZM256,382.7c-65.5,0-118.6-53.1-118.6-118.6s53.1-118.6,118.6-118.6,118.6,53.1,118.6,118.6-53.1,118.6-118.6,118.6Z"/>
                      <path fill="currentColor" d="M243.5,318.1c-3.4,0-6.9-1.3-9.5-3.9l-36.8-36.8c-5.3-5.3-5.3-13.8,0-19.1,5.3-5.3,13.8-5.3,19.1,0l27.3,27.3,52.3-52.3c5.3-5.3,13.8-5.3,19.1,0,5.3,5.3,5.3,13.8,0,19.1l-61.9,61.9c-2.6,2.6-6.1,3.9-9.5,3.9Z"/>
                  </svg>
                </div>
                <div className="text-left">
                  <h6 className="text-white font-medium">LGPD Compliance</h6>
                  <p className="text-xs text-primary">Lei 13.709/2018</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-secondary-800">
          <div className="container py-6">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="text-center md:text-left">
                <p className=" text-sm">
                  © {currentYear} Todos os direitos
                  reservados.
                </p>
                <p className="text-xs mt-1">
                  Desenvolvido por{" "}
                  <span className="text-primary font-medium">
                    <a href="https://content.f5adtech.com.br/" target="_blank">F5 Content</a>
                  </span>
                  &nbsp;&nbsp;||&nbsp;&nbsp;
                  <span className="text-primary font-medium">
                    TwoPessoas
                  </span>
                </p>
              </div>

              <div className="flex items-center space-x-6">
                <button
                  onClick={() => scrollToSection("hero")}
                  className="flex items-center space-x-2 btn-outline transition-colors duration-200"
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
