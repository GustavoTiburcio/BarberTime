import { useQuery } from '@tanstack/react-query';
import { api } from '../lib/api';

export interface Service {
  id: string;
  name: string;
  duration: number;
  price: number;
  description: string;
}

export function useServices() {
  return useQuery<Service[]>({
    queryKey: ['services'],
    queryFn: async () => {
      const { data } = await api.get('/services');
      return data;
    },
  });
}
