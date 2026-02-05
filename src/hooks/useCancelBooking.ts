import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../lib/api';
import { useAuth } from './useAuth';

interface UseCancelBookingProps {
  onSuccess?: () => void;
  onError?: (error: unknown) => void;
}

export function useCancelBooking({ onSuccess, onError }: UseCancelBookingProps = {}) {
  const queryClient = useQueryClient();
  const { showToast } = useAuth();

  const mutation = useMutation({
    mutationFn: async (id: string) => {
      await api.delete(`/bookings?id=${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookings'] });
      showToast({ message: 'Agendamento cancelado com sucesso!', type: 'success' });
      onSuccess?.();
    },
    onError: (error) => {
      console.error(error);
      showToast({ message: 'Erro ao cancelar agendamento', type: 'error' });
      onError?.(error);
    },
  });

  return {
    cancelBooking: mutation.mutate,
    isLoading: mutation.isPending,
  };
}
