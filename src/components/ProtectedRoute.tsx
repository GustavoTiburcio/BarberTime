import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { authenticatedUser, isLoading } = useAuth();
  const location = useLocation();
  const allRoles = ['manager', 'employee'];

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando...</p>
        </div>
      </div>
    );
  }

  if (!authenticatedUser || !allRoles.includes(authenticatedUser.role)) {
    return <Navigate to="/login" replace />;
  }

  // Role-based route restriction:
  // - manager: access to all private routes
  // - employee: only allowed to access the schedule route
  if (authenticatedUser.role === 'employee') {
    const pathname = location.pathname || '';
    if (!pathname.startsWith('/menu/schedule')) {
      return <Navigate to="/menu/schedule" replace />;
    }
  }

  return <>{children}</>;
}
