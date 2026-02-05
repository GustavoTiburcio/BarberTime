import { useQuery } from '@tanstack/react-query';
import { api } from '../lib/api';

interface AvailabilityParams {
  date?: string;
  professionalId?: string;
  serviceId?: string;
}

export function useAvailability({
  date,
  professionalId,
  serviceId,
}: AvailabilityParams) {
  return useQuery<string[]>({
    queryKey: ['availability', date, professionalId, serviceId],
    queryFn: async () => {
      const { data } = await api.get('/availability', {
        params: { date, professionalId, serviceId },
      });
      return data;
    },
    enabled: !!date && !!professionalId && !!serviceId,
  });
}
