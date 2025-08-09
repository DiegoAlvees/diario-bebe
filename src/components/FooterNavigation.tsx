import { Home, Medal, Syringe,  User } from 'lucide-react';
import { NavLink } from 'react-router-dom';

export default function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 shadow-lg z-50">
      <ul className="flex justify-around items-center h-16">
        <li className="h-full w-full">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `flex flex-col items-center justify-center h-full w-full ${
                isActive
                  ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`
            }
          >
            <Home size={22} />
            <span className="text-xs">Início</span>
          </NavLink>
        </li>
        <li className="h-full w-full">
          <NavLink
            to="/vacinas"
            className={({ isActive }) =>
              `flex flex-col items-center justify-center h-full w-full ${
                isActive
                  ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`
            }
          >
            <Syringe size={22} />
            <span className="text-xs">Vacinas</span>
          </NavLink>
        </li>
        <li className="h-full w-full">
          <NavLink
            to="/historico"
            className={({ isActive }) =>
              `flex flex-col items-center justify-center h-full w-full ${
                isActive
                  ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`
            }
          >
            <Medal size={22} />
            <span className="text-xs">Conquistas</span>
          </NavLink>
        </li>
        <li className="h-full w-full">
          <NavLink
            to="/perfil"
            className={({ isActive }) =>
              `flex flex-col items-center justify-center h-full w-full ${
                isActive
                  ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`
            }
          >
            <User size={22} />
            <span className="text-xs">Perfil</span>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
