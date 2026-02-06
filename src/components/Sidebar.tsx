// Sidebar.tsx
import { NavLink, useNavigate } from 'react-router-dom';
import { Scissors, Users, X, Calendar, AreaChart, LogOutIcon } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

export function Sidebar({ open, onClose }: { open: boolean; onClose: () => void }) {
  const navigate = useNavigate();
  const { authenticatedUser } = useAuth();

  return (
    <>
      {/* Overlay no mobile */}
      {open && (
        <div
          className='fixed inset-0 bg-black/50 z-40 lg:hidden'
          onClick={onClose}
        />
      )}

      <aside
        className={`
          fixed top-0 left-0 z-50
          h-full w-64
          bg-white border-r border-gray-200 p-6
          transform transition-transform duration-300
          overflow-y-auto

          ${open ? 'translate-x-0' : '-translate-x-full'}

          lg:translate-x-0
        `}
      >
        <div className='flex items-center gap-3 mb-6 justify-center'>
          <img
            src={authenticatedUser?.avatar}
            alt={authenticatedUser?.name}
            className='w-12 h-12 rounded-full object-cover'
          />
          <h1 className='text-2xl font-bold text-gray-600'>Olá, {authenticatedUser?.name}</h1>
        </div>
        <div className='flex justify-between items-center mb-6'>

          <button className='lg:hidden text-gray-600' onClick={onClose}>
            <X />
          </button>
        </div>
        <nav className='space-y-2'>
          <NavLink
            to='/menu/dashboard'
            className={({ isActive }) =>
              `flex items-center gap-2 px-4 py-2 rounded-lg transition ${isActive
                ? 'bg-amber-100 text-amber-700 font-medium'
                : 'hover:bg-gray-100 text-gray-700'
              }`
            }
            onClick={onClose}
          >
            <AreaChart className='w-4 h-4' />
            Dashboard
          </NavLink>
          <NavLink
            to='/menu/schedule'
            className={({ isActive }) =>
              `flex items-center gap-2 px-4 py-2 rounded-lg transition ${isActive
                ? 'bg-amber-100 text-amber-700 font-medium'
                : 'hover:bg-gray-100 text-gray-700'
              }`
            }
            onClick={onClose}
          >
            <Calendar className='w-4 h-4' />
            Agenda
          </NavLink>

          <NavLink
            to='/menu/professionals'
            className={({ isActive }) =>
              `flex items-center gap-2 px-4 py-2 rounded-lg transition ${isActive
                ? 'bg-amber-100 text-amber-700 font-medium'
                : 'hover:bg-gray-100 text-gray-700'
              }`
            }
            onClick={onClose}
          >
            <Users className='w-4 h-4' />
            Profissionais
          </NavLink>

          <NavLink
            to='/menu/services'
            className={({ isActive }) =>
              `flex items-center gap-2 px-4 py-2 rounded-lg transition ${isActive
                ? 'bg-amber-100 text-amber-700 font-medium'
                : 'hover:bg-gray-100 text-gray-700'
              }`
            }
            onClick={onClose}
          >
            <Scissors className='w-4 h-4' />
            Serviços
          </NavLink>

          <div
            className='flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-100 text-gray-700 cursor-pointer'
            onClick={() => {
              localStorage.removeItem('token');
              navigate('/login');
            }}
          >
            <LogOutIcon className='w-4 h-4' />
            Sair
          </div>
        </nav>
      </aside>
    </>
  );
}
