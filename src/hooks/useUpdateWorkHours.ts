import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../lib/api';
import { WorkHour } from '../types';

export function useUpdateWorkHour() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (workHour: WorkHour) => {
      const { data } = await api.put(`/workHours?id=${workHour.id}`, workHour);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['workHours'] });
    },
  });
}
