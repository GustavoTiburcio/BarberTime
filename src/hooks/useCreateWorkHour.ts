import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../lib/api';
import { WorkHour } from '../types';

export function useCreateWorkHour() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: Omit<WorkHour, 'id' | 'createdAt'>) => {
      const { data: result } = await api.post('/workHours', data);
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['workHours'] });
    },
  });
}
