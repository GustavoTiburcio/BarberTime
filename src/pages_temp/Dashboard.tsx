// Dashboard.tsx
import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Sidebar } from "../components/Sidebar";

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Conteúdo principal */}
      <div className="flex-1 flex flex-col">
        {/* Botão para abrir sidebar no mobile */}
        <div className="lg:hidden p-3 bg-white border-b border-gray-200 flex items-center">
          <button
            className="bg-amber-500 text-white px-3 py-1 rounded-sm shadow-md"
            onClick={() => setSidebarOpen(true)}
          >
            ☰
          </button>
          <span className="ml-4 text-lg font-bold text-gray-900">Dashboard</span>
        </div>

        <main className="flex-1 p-4 lg:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
