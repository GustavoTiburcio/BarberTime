import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../lib/api';

export function useDeleteProfessional() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      await api.delete(`/professionals?id=${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['professionals'] });
    },
  });
}
