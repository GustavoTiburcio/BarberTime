import { useMutation } from '@tanstack/react-query';
import { api } from '../lib/api';
import { useAuth } from './useAuth';
import type { BookingFormData } from '../types';

interface UseBookingProps {
  onSuccess?: () => void;
  onError?: (error: unknown) => void;
}

export function useCreateBooking({ onSuccess, onError }: UseBookingProps = {}) {
  const { showToast } = useAuth();

  const mutation = useMutation({
    mutationFn: async (data: BookingFormData) => {
      const response = await api.post('/bookings', data);
      return response.data;
    },
    onSuccess: () => {
      showToast({
        message: 'Agendamento confirmado com sucesso!',
        type: 'success',
      });
      onSuccess?.();
    },
    onError: (error) => {
      console.error(error);
      showToast({
        message: 'Erro ao confirmar agendamento',
        type: 'error',
      });
      onError?.(error);
    },
  });

  return {
    confirmBooking: mutation.mutate,
    isLoading: mutation.isPending,
  };
}
