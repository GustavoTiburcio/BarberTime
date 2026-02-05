import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../lib/api';
import { Service } from './useServices';

export function useUpdateService() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: Service) => {
      const { data: result } = await api.put(`/services?id=${data.id}`, data);
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['services'] });
    },
  });
}
