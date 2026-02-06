import { useQuery } from '@tanstack/react-query';
import { api } from '../lib/api';
import { Booking } from '../types';

interface UseBookingsParams {
  startDate: string;
  endDate: string;
  professionalId?: string;
}

export function useBookings({ startDate, endDate, professionalId }: UseBookingsParams) {
  return useQuery<Booking[]>({
    queryKey: ['bookings', startDate, endDate, professionalId],
    queryFn: async () => {
      const params = new URLSearchParams({
        startDate,
        endDate,
        status: 'confirmed,completed,pending', // só traz os agendamentos ativos
        ...(professionalId && { professionalId }),
      });
      const { data } = await api.get(`/bookings?${params.toString()}`);
      
      // Normaliza o formato dos bookings
      return (data || []).map((booking: any) => {
        // Extrai apenas a data YYYY-MM-DD (remove timestamp) 
        const dateStr = booking.date.split('T')[0];
        // Extrai apenas HH:MM (remove :SS)
        const timeStr = booking.time.substring(0, 5);
        // Se vem com service object, extrai o ID
        const serviceId = booking.service?.id || booking.serviceId;
        // Se vem com professional object, extrai o ID
        const professionalId = booking.professional?.id || booking.professionalId;

        return {
          ...booking,
          date: dateStr,
          time: timeStr,
          serviceId,
          professionalId,
        };
      });
    },
  });
}
