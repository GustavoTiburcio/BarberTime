import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../lib/api';
import { useAuth } from './useAuth';

interface useConfirmBookingProps {
  onSuccess?: () => void;
  onError?: (error: unknown) => void;
}

interface IMutationProps {
  id: string;
  status: 'confirmed' | 'pending' | 'completed' | 'cancelled';
}

export function useConfirmBooking({ onSuccess, onError }: useConfirmBookingProps = {}) {
  const queryClient = useQueryClient();
  const { showToast } = useAuth();

  const mutation = useMutation({
    mutationFn: async ({ id, status }: IMutationProps) => {
      await api.patch(`/bookings?id=${id}`, { status });
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
