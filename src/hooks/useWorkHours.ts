import { useQuery } from '@tanstack/react-query';
import { api } from '../lib/api';
import { WorkHour } from '../types';

export function useWorkHours(professionalId: string | null) {
  return useQuery<WorkHour[]>({
    queryKey: ['workHours', professionalId],
    queryFn: async () => {
      if (!professionalId) return [];
      const { data } = await api.get(`/workHours?professionalId=${professionalId}`);
      return data;
    },
    enabled: !!professionalId,
  });
}
