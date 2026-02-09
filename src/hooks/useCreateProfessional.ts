import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../lib/api';
import { Professional } from './useProfessionals';
import { AxiosError } from 'axios';

export function useCreateProfessional() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: Omit<Professional, 'id'>) => {
      const { data: result } = await api.post('/professionals', data);
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['professionals'] });
    },
    onError: (error) => {
      console.error('Erro ao criar profissional:', error);
      if (error instanceof AxiosError) {
        alert(`${error.response?.data?.error || 'Erro desconhecido'}`);
      } else {
        alert('Ocorreu um erro ao criar o profissional. Por favor, tente novamente.');
      }
    }
  });
}
