import { createContext, useState } from 'react';
import { Toast } from '../components/Toast';

interface IAuthContextValue {
 setToast: React.Dispatch<React.SetStateAction<{ show: boolean; message: string; type: 'success' | 'error' | 'info' }>>
}

export const AuthContext = createContext({} as IAuthContextValue);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' as 'success' | 'error' | 'info' });

  return (
    <AuthContext.Provider
      value={{
        setToast
      }}
    >
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