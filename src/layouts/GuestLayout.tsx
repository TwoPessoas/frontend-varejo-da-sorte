import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const GuestLayout = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleOnClick = (url: string) => {
    navigate(url);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-primary text-white p-4 sticky top-0 z-40">
        <nav className="container mx-auto flex justify-between items-center">
          <a href="/" className="text-xl font-bold">
            <img src="./imgs/logo.svg" alt="Atakarejo" className="w-[120px]" />
          </a>
          <div className="hidden md:flex space-x-4">
            <a href="/#hero" className="text-white hover:text-gray-300">
              Início
            </a>
            <a href="/#brands" className="text-white hover:text-gray-300">
              Marcas
            </a>
            <a
              onClick={() => handleOnClick("/regulamento")}
              className="text-white hover:text-gray-300"
            >
              Regulamento
            </a>
            <a href="/#faq" className="text-white hover:text-gray-300">
              FAQ
            </a>
            <a
              onClick={() => handleOnClick("/ganhadores")}
              className="text-white hover:text-gray-300"
            >
              Ganhadores
            </a>
          </div>
          <div className="md:hidden">
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                {isMobileMenuOpen ? (
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                ) : (
                  <path
                    fillRule="evenodd"
                    d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                    clipRule="evenodd"
                  />
                )}
              </svg>
            </button>
          </div>
        </nav>
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4">
            <a
              href="/#hero"
              className="block py-2 px-4 text-white hover:bg-white/20"
            >
              Início
            </a>
            <a
              href="/#brands"
              className="block py-2 px-4 text-white hover:bg-white/20"
            >
              Marcas
            </a>
            <a
              onClick={() => handleOnClick("/regulamento")}
              className="block py-2 px-4 text-white hover:bg-white/20"
            >
              Regulamento
            </a>
            <a
              href="/#faq"
              className="block py-2 px-4 text-white hover:bg-white/20"
            >
              FAQ
            </a>
            <a
              onClick={() => handleOnClick("/ganhadores")}
              className="block py-2 px-4 text-white hover:bg-white/20"
            >
              Ganhadores
            </a>
          </div>
        )}
      </header>
      <main className="flex-grow">
        <Outlet />
      </main>
    </div>
  );
};

export default GuestLayout;
