import React from 'react';
import { Menu } from 'lucide-react';

const Encabezado: React.FC = () => {
  return (
    <header className="bg-white shadow">
      <div className="container mx-auto px-4 flex justify-center items-center">
        <div className="flex items-center">
          <img src="/img/tramontina_logo.svg" alt="Logo de Tramontina" className="h-44 mr-4" />
          <h1 className="text-xl font-semibold">Control de Rendimiento Empresarial</h1>
        </div>
        {/* <nav>
          <button className="p-2 rounded-full hover:bg-gray-100">
            <Menu size={24} />
          </button>
        </nav> */}
      </div>
    </header>
  );
};

export default Encabezado;