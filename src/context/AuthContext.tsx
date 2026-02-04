import { createContext, useState } from 'react';
import { Toast } from '../components/Toast';

interface IAuthContextValue {
  showToast: ({ message, type }: { message: string; type: 'success' | 'error' | 'info' }) => void;
}

export const AuthContext = createContext({} as IAuthContextValue);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [toast, setToast] = useState({
    show: false,
    message: '',
    type: 'success' as 'success' | 'error' | 'info'
  });

  function showToast({ message, type }: { message: string; type: 'success' | 'error' | 'info' }) {
    setToast({ show: true, message, type });
  }

  return (
    <AuthContext.Provider value={{ showToast }}>
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
