import { X } from 'lucide-react';
import WhatsappIcon from '../assets/whatsapp.svg?react';

import { Booking, Professional, Service } from '../types';
import { useCancelBooking } from '../hooks/useCancelBooking';
import { useConfirmBooking } from '../hooks/useConfirmBooking';
import { useUpdateBooking } from '../hooks/useUpdateBooking';
import { useState } from 'react';

interface BookingDetailModalProps {
  booking: Booking | null;
  services: Service[];
  professionals: Professional[];
  isOpen: boolean;
  onClose: () => void;
}

export default function BookingDetailModal({ booking, services, professionals, isOpen, onClose }: BookingDetailModalProps) {
  const [isEditingProfessional, setIsEditingProfessional] = useState(false);
  const [selectedProfessionalId, setSelectedProfessionalId] = useState(booking?.professionalId || '');

  const { confirmBooking: updateBooking, isLoading: isUpdatingProfessional } = useUpdateBooking({
    onSuccess: () => {
      setIsEditingProfessional(false);
      onClose();
    },
  });

  if (!isOpen || !booking) return null;

  const service = services.find((s) => s.id === booking.serviceId);
  const professional = professionals.find((p) => p.id === booking.professionalId);

  const handleProfessionalChange = (newProfessionalId: string) => {
    setSelectedProfessionalId(newProfessionalId);
    const updatedBooking = { ...booking, professionalId: newProfessionalId };
    updateBooking(updatedBooking);
  };

  const statusLabels: Record<string, string> = {
    confirmed: 'Confirmado',
    pending: 'Pendente',
    completed: 'Completo',
    cancelled: 'Cancelado',
  };

  const statusColors: Record<string, string> = {
    confirmed: 'bg-green-100 text-green-800',
    pending: 'bg-yellow-100 text-yellow-800',
    completed: 'bg-blue-100 text-blue-800',
    cancelled: 'bg-red-100 text-red-800',
  };

  function CancelButton({ bookingId, onClose }: { bookingId: string; onClose: () => void }) {
    const { cancelBooking, isLoading } = useCancelBooking({ onSuccess: onClose });

    return (
      <button
        onClick={() => cancelBooking(bookingId)}
        disabled={isLoading || booking?.status === 'cancelled'}
        className={`flex-1 px-4 py-2 rounded-lg font-medium text-white transition-colors ${isLoading ? 'bg-red-300' : 'bg-red-500 hover:bg-red-600'} ${booking?.status === 'cancelled' ? 'cursor-not-allowed opacity-50' : ''}`}
      >
        {isLoading ? 'Cancelando...' : 'Cancelar'}
      </button>
    );
  }

  function ConfirmButton({ bookingId, onClose }: { bookingId: string; onClose: () => void }) {
    const { confirmBooking, isLoading } = useConfirmBooking({ onSuccess: onClose });

    const bookingInfo = {
      id: bookingId,
      status: 'confirmed' as const
    }

    return (
      <button
        onClick={() => confirmBooking(bookingInfo)}
        disabled={isLoading || booking?.status === 'confirmed'}
        className={`flex-1 px-4 py-2 rounded-lg font-medium text-white transition-colors ${isLoading ? 'bg-green-300' : 'bg-green-500 hover:bg-green-600'} ${booking?.status === 'cancelled' ? 'cursor-not-allowed opacity-50' : ''}`}
      >
        {isLoading ? 'Confirmando...' : 'Confirmar'}
      </button>
    );
  }

  return (
    <div className='fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-2 sm:p-4'>
      <div className='bg-white rounded-xl shadow-lg w-full max-w-sm sm:max-w-md max-h-[85vh] sm:max-h-[90vh] overflow-y-auto'>
        {/* Header */}
        <div className='flex justify-between items-center p-6 border-b border-gray-200'>
          <h2 className='text-2xl font-bold text-gray-900'>Detalhes do Agendamento</h2>
          <button
            onClick={onClose}
            className='text-gray-400 hover:text-gray-600 transition-colors'
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className='p-6 space-y-6'>
          {/* Cliente */}
          <div>
            <h3 className='text-sm font-medium text-gray-500 uppercase mb-2'>Cliente</h3>
            <p className='text-lg font-semibold text-gray-900'>{booking.clientName}</p>
            <p className='text-sm text-gray-600 mt-1'>{booking.clientPhone}</p>
          </div>

          {/* Profissional */}
          <div>
            <div className='flex items-center justify-between mb-2'>
              <h3 className='text-sm font-medium text-gray-500 uppercase'>Profissional</h3>
              {booking.status !== 'cancelled' && (
                <button
                  onClick={() => setIsEditingProfessional(!isEditingProfessional)}
                  className='text-xs text-blue-600 hover:text-blue-800 font-medium'
                  disabled={isUpdatingProfessional}
                >
                  {isEditingProfessional ? 'Cancelar' : 'Alterar'}
                </button>
              )}
            </div>

            {isEditingProfessional ? (
              <select
                value={selectedProfessionalId}
                onChange={(e) => handleProfessionalChange(e.target.value)}
                disabled={isUpdatingProfessional}
                className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50'
              >
                {professionals.map((prof) => (
                  <option key={prof.id} value={prof.id}>
                    {prof.name}
                  </option>
                ))}
              </select>
            ) : (
              <div className='flex items-center gap-3'>
                {professional?.avatar && (
                  <img
                    src={professional.avatar}
                    alt={professional.name}
                    className='w-10 h-10 rounded-full object-cover'
                  />
                )}
                <p className='text-lg font-semibold text-gray-900'>{professional?.name || 'N/A'}</p>
              </div>
            )}

            {isUpdatingProfessional && (
              <p className='text-xs text-blue-600 mt-2'>Salvando alteração...</p>
            )}
          </div>

          {/* Serviço */}
          <div>
            <h3 className='text-sm font-medium text-gray-500 uppercase mb-2'>Serviço</h3>
            <div className='bg-gray-50 rounded-lg p-3'>
              <p className='font-semibold text-gray-900'>{service?.name || 'Serviço Desconhecido'}</p>
              <p className='text-sm text-gray-600 mt-1'>{service?.description}</p>
              <div className='flex justify-between items-center mt-3 pt-3 border-t border-gray-200'>
                <span className='text-sm text-gray-600'>Duração: {service?.duration} minutos</span>
                <span className='font-semibold text-gray-900'>R$ {service?.price}</span>
              </div>
            </div>
          </div>

          {/* Data e Hora */}
          <div className='grid grid-cols-2 gap-4'>
            <div>
              <h3 className='text-sm font-medium text-gray-500 uppercase mb-2'>Data</h3>
              <p className='text-lg font-semibold text-gray-900'>
                {new Date(booking.date + 'T00:00:00').toLocaleDateString('pt-BR', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
            </div>
            <div>
              <h3 className='text-sm font-medium text-gray-500 uppercase mb-2'>Horário</h3>
              <p className='text-lg font-semibold text-gray-900'>{booking.time}</p>
            </div>
          </div>

          {/* Status */}
          <div>
            <h3 className='text-sm font-medium text-gray-500 uppercase mb-2'>Status</h3>
            <span
              className={`inline-block px-4 py-2 rounded-full font-semibold ${statusColors[booking.status]
                }`}
            >
              {statusLabels[booking.status]}
            </span>
          </div>

          {/* Data de Criação */}
          <div className='pt-4 border-t border-gray-200'>
            <p className='text-xs text-gray-500'>
              Agendado em{' '}
              {new Date(booking.createdAt).toLocaleDateString('pt-BR', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              })}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className='p-6 border-t border-gray-200 flex gap-2'>
          <button
            onClick={onClose}
            className='flex-1 px-4 py-2 bg-gray-100 text-gray-900 rounded-lg font-medium hover:bg-gray-200 transition-colors'
          >
            Voltar
          </button>
          {booking && (
            <CancelButton bookingId={booking.id} onClose={onClose} />
          )}
          {booking && (
            <ConfirmButton bookingId={booking.id} onClose={onClose} />
          )}
          <button
            onClick={() => {
              const phone = booking.clientPhone.replace(/\D/g, '');
              const url = `https://wa.me/55${phone}`;
              window.open(url, '_blank');
            }}
            className='px-4 py-2 bg-green-500 text-white rounded-lg font-medium hover:bg-green-600 transition-colors'
          >
            <WhatsappIcon className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
}
