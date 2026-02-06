import { useMutation } from '@tanstack/react-query';
import { api } from '../lib/api';

interface LoginData {
  username: string;
  password: string;
}

interface LoginResponse {
  token: string;
  [key: string]: any;
}

export function useLogin() {
  return useMutation({
    mutationFn: async (data: LoginData) => {
      const response = await api.post<LoginResponse>('/login', data);
      
      if (response.status === 200 && response.data.token) {
        localStorage.setItem('token', response.data.token);
      }
      
      return response.data;
    },
  });
}
