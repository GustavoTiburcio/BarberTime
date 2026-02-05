import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../lib/api';
import { Professional } from './useProfessionals';

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
  });
}
