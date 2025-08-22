import { Outlet } from 'react-router-dom';

const GuestLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-gray-800 text-white p-4">
        <nav className="container mx-auto flex justify-between items-center">
          <a href="/" className="text-xl font-bold">Varejo da Sorte</a>
          <ul className="flex space-x-4">
            <li><a href="#hero" className="hover:text-gray-300">Início</a></li>
            <li><a href="#brands" className="hover:text-gray-300">Marcas</a></li>
            <li><a href="#rules" className="hover:text-gray-300">Regulamento</a></li>
            <li><a href="#faq" className="hover:text-gray-300">FAQ</a></li>
          </ul>
        </nav>
      </header>
      <main className="flex-grow">
        <Outlet />
      </main>
      {/* You might want a footer here as well, or keep it in HomePage */}
    </div>
  );
};

export default GuestLayout;