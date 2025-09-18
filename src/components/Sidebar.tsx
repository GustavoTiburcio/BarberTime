// Sidebar.tsx
import { NavLink } from "react-router-dom";
import { Scissors, Users, X } from "lucide-react";

export function Sidebar({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <>
      {/* Overlay no mobile */}
      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`
          fixed top-0 left-0 h-full w-64 bg-white border-r border-gray-200 p-6
          transform transition-transform duration-300 z-50
          ${open ? "translate-x-0" : "-translate-x-full"} 
          lg:static lg:translate-x-0 lg:block lg:min-h-screen lg:flex-shrink-0
        `}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-900">Menu</h2>
          <button className="lg:hidden text-gray-600" onClick={onClose}>
            <X />
          </button>
        </div>
        <nav className="space-y-2">
          <NavLink
            to="/dashboard/professionals"
            className={({ isActive }) =>
              `flex items-center gap-2 px-4 py-2 rounded-lg transition ${
                isActive
                  ? "bg-amber-100 text-amber-700 font-medium"
                  : "hover:bg-gray-100 text-gray-700"
              }`
            }
            onClick={onClose}
          >
            <Users className="w-4 h-4" />
            Profissionais
          </NavLink>

          <NavLink
            to="/dashboard/services"
            className={({ isActive }) =>
              `flex items-center gap-2 px-4 py-2 rounded-lg transition ${
                isActive
                  ? "bg-amber-100 text-amber-700 font-medium"
                  : "hover:bg-gray-100 text-gray-700"
              }`
            }
            onClick={onClose}
          >
            <Scissors className="w-4 h-4" />
            Serviços
          </NavLink>
        </nav>
      </aside>
    </>
  );
}
