import { createContext, useState, useEffect } from 'react';
import { Toast } from '../components/Toast';
import { api } from '../lib/api';

interface IAuthContextValue {
  showToast: ({ message, type }: { message: string; type: 'success' | 'error' | 'info' }) => void;
  authenticatedUser: IProfessional | null;
  isLoading: boolean;
  logout: () => void;
  markAuthenticatedUser: (professional: IProfessional) => void;
}

export interface IProfessional {
  id: string;
  name: string;
  avatar: string;
  specialties: string[];
  rating: string;
  username: string;
  role: 'manager' | 'employee';
}

export const AuthContext = createContext({} as IAuthContextValue);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [toast, setToast] = useState({
    show: false,
    message: '',
    type: 'success' as 'success' | 'error' | 'info'
  });
  const [authenticatedUser, setAuthenticatedUser] = useState<IAuthContextValue['authenticatedUser']>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');

      if (!token) {
        setAuthenticatedUser(null);
        setIsLoading(false);
        return;
      }

      try {
        const response = await api.get('/me', {
          params: { token }
        });

        if (response.status === 200) {
          setAuthenticatedUser(response.data);
        } else {
          setAuthenticatedUser(null);
          localStorage.removeItem('token');
        }
      } catch (error) {
        console.log('Erro ao verificar autenticação:', error);
        setAuthenticatedUser(null);
        localStorage.removeItem('token');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  function showToast({ message, type }: { message: string; type: 'success' | 'error' | 'info' }) {
    setToast({ show: true, message, type });
  }

  function logout() {
    localStorage.removeItem('token');
    setAuthenticatedUser(null);
  }

  function markAuthenticatedUser(user: IProfessional) {
    setAuthenticatedUser(user);
    setIsLoading(false);
  }

  return (
    <AuthContext.Provider value={{ showToast, authenticatedUser, isLoading, logout, markAuthenticatedUser }}>
      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.show}
        onClose={() => setToast(prev => ({ ...prev, show: false }))}
      />
      {children}
    </AuthContext.Provider>
  );
}
