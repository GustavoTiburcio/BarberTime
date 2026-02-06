import { createContext, useState, useEffect } from 'react';
import { Toast } from '../components/Toast';
import { api } from '../lib/api';

interface IAuthContextValue {
  showToast: ({ message, type }: { message: string; type: 'success' | 'error' | 'info' }) => void;
  isAuthenticated: boolean;
  isLoading: boolean;
  logout: () => void;
  markAsAuthenticated: () => void;
}

export const AuthContext = createContext({} as IAuthContextValue);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [toast, setToast] = useState({
    show: false,
    message: '',
    type: 'success' as 'success' | 'error' | 'info'
  });
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');
      
      if (!token) {
        setIsAuthenticated(false);
        setIsLoading(false);
        return;
      }

      try {
        const response = await api.get('/me', {
          params: { token }
        });
        
        if (response.status === 200) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
          localStorage.removeItem('token');
        }
      } catch (error) {
        setIsAuthenticated(false);
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
    setIsAuthenticated(false);
  }

  function markAsAuthenticated() {
    setIsAuthenticated(true);
    setIsLoading(false);
  }

  return (
    <AuthContext.Provider value={{ showToast, isAuthenticated, isLoading, logout, markAsAuthenticated }}>
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
