// Sidebar.tsx
import { NavLink, useNavigate } from 'react-router-dom';
import { Scissors, Users, X, Calendar, AreaChart, LogOutIcon } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

export function Sidebar({ open, onClose }: { open: boolean; onClose: () => void }) {
  const navigate = useNavigate();
  const { authenticatedUser, logout } = useAuth();

  const menuItems = [
    { name: 'Dashboard', icon: <AreaChart className='w-4 h-4' />, path: '/menu/dashboard' },
    { name: 'Agenda', icon: <Calendar className='w-4 h-4' />, path: '/menu/schedule' },
    { name: 'Profissionais', icon: <Users className='w-4 h-4' />, path: '/menu/professionals' },
    { name: 'Serviços', icon: <Scissors className='w-4 h-4' />, path: '/menu/services' },
  ];

  // Filter menu items by role: managers see all, employees only see schedule
  const role = authenticatedUser?.role;
  const visibleMenuItems = menuItems.filter((item) => {
    if (role === 'employee') return item.path === '/menu/schedule';
    return true;
  });

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
        {visibleMenuItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-2 px-4 py-2 rounded-lg transition ${isActive
                ? 'bg-amber-100 text-amber-700 font-medium'
                : 'hover:bg-gray-100 text-gray-700'
              }`
            }
            onClick={onClose}
          >
            {item.icon}
            {item.name}
          </NavLink>
          ))}
        <nav className='mt-6 pt-6 border-t border-gray-200'>
          <div
            className='flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-100 text-gray-700 cursor-pointer'
            onClick={() => {
              logout();
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
