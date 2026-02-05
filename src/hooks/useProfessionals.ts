import { useQuery } from '@tanstack/react-query';
import { api } from '../lib/api';

export interface Professional {
  id: string;
  name: string;
  avatar: string;
  specialties: string[];
  rating: number;
}

export function useProfessionals() {
  return useQuery<Professional[]>({
    queryKey: ['professionals'],
    queryFn: async () => {
      const { data } = await api.get('/professionals');
      return data;
    },
  });
}
