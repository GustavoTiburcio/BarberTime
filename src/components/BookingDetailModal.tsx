import { Booking } from '../types';
import { services, professionals } from '../mocks';
import { X } from 'lucide-react';

interface BookingDetailModalProps {
  booking: Booking | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function BookingDetailModal({ booking, isOpen, onClose }: BookingDetailModalProps) {
  if (!isOpen || !booking) return null;

  const service = services.find((s) => s.id === booking.serviceId);
  const professional = professionals.find((p) => p.id === booking.professionalId);

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
            <h3 className='text-sm font-medium text-gray-500 uppercase mb-2'>Profissional</h3>
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
              className={`inline-block px-4 py-2 rounded-full font-semibold ${
                statusColors[booking.status]
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
            Fechar
          </button>
          <button className='flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors'>
            Editar
          </button>
        </div>
      </div>
    </div>
  );
}
