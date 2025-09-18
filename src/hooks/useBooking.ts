import { useMutation } from '@tanstack/react-query';
import { useAuth } from './useAuth';
import type { BookingFormData } from '../types';

interface UseBookingProps {
  onSuccess?: () => void;
  onError?: (error: unknown) => void;
}

export function useBooking({ onSuccess, onError }: UseBookingProps = {}) {
  const { setToast } = useAuth();

  const mutation = useMutation({
    mutationFn: async (data: BookingFormData) => console.log(data),
    onSuccess: () => {
      setToast({
        show: true,
        message: 'Agendamento confirmado com sucesso! Você receberá uma confirmação em breve.',
        type: 'success'
      });

      onSuccess?.();
    },
    onError: (error) => {
      console.error('Erro ao confirmar agendamento:', error);

      setToast({
        show: true,
        message: 'Erro ao confirmar agendamento. Tente novamente.',
        type: 'error'
      });

      onError?.(error);
    }
  });

  return {
    confirmBooking: mutation.mutate,
    confirmBookingAsync: mutation.mutateAsync, // útil se quiser usar async/await
    isLoading: mutation.isPending,
    isSuccess: mutation.isSuccess,
    isError: mutation.isError,
    error: mutation.error,
  };
}
