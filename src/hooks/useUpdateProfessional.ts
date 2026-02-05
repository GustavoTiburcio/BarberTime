import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../lib/api';
import { Professional } from './useProfessionals';

export function useUpdateProfessional() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: Professional) => {
      const { data: result } = await api.put(`/professionals?id=${data.id}`, data);
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['professionals'] });
    },
  });
}
