import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../lib/api';
import { Service } from './useServices';

export function useCreateService() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: Omit<Service, 'id'>) => {
      const { data: result } = await api.post('/services', data);
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['services'] });
    },
  });
}
