import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../lib/api';
import { useAuth } from './useAuth';
import { Booking } from '../types';

interface useUpdateBookingProps {
  onSuccess?: () => void;
  onError?: (error: unknown) => void;
}

export function useUpdateBooking({ onSuccess, onError }: useUpdateBookingProps = {}) {
  const queryClient = useQueryClient();
  const { showToast } = useAuth();

  const mutation = useMutation({
    mutationFn: async (booking: Booking) => {
      await api.put(`/bookings?id=${booking.id}`, booking);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookings'] });
      showToast({ message: 'Agendamento alterado com sucesso!', type: 'success' });
      onSuccess?.();
    },
    onError: (error) => {
      console.error(error);
      showToast({ message: 'Erro ao alterar agendamento', type: 'error' });
      onError?.(error);
    },
  });

  return {
    confirmBooking: mutation.mutate,
    isLoading: mutation.isPending,
  };
}
