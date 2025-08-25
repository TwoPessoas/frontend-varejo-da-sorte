import { Outlet } from 'react-router-dom';

const GuestLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-primary text-white p-4">

        <nav className="container mx-auto flex justify-between items-center">
          <a href="/" className="text-xl font-bold">
            <img src="./imgs/logo.svg" alt="Atakarejo" className="w-[120px]" />
          </a>
          <ul className="flex space-x-4">
            <li><a href="#hero" className="text-white hover:text-gray-300">Início</a></li>
            <li><a href="#brands" className=" text-white hover:text-gray-300">Marcas</a></li>
            <li><a href="/regulamento" className=" text-white hover:text-gray-300">Regulamento</a></li>
            <li><a href="#faq" className=" text-white hover:text-gray-300">FAQ</a></li>
            <li><a href="/ganhadores" className=" text-white hover:text-gray-300">Ganhadores</a></li>
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