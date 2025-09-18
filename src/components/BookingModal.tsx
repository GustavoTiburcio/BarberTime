import { X, Calendar, Clock, Scissors, User, Phone, MapPin } from 'lucide-react';
import { BookingFormData } from '../types';
import { Button } from './Button';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isLoading: boolean;
  formData: BookingFormData;
  serviceName: string;
  servicePrice: number;
  serviceDuration: number;
  professionalName: string;
}

export function BookingModal({
  isOpen,
  onClose,
  onConfirm,
  isLoading,
  formData,
  serviceName,
  servicePrice,
  serviceDuration,
  professionalName
}: BookingModalProps) {
  if (!isOpen) return null;

  const formatDate = (dateStr: string) => {
    if (!dateStr) return '';
    const date = new Date(dateStr + 'T00:00:00');
    return date.toLocaleDateString('pt-BR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">Confirmar Agendamento</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Client Info */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <User className="w-4 h-4 text-amber-500" />
              Dados do Cliente
            </h3>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Nome:</span>
                <span className="text-sm font-medium text-gray-900">{formData.clientName}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-900">{formData.clientPhone}</span>
              </div>
            </div>
          </div>

          {/* Service Info */}
          <div className="bg-amber-50 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <Scissors className="w-4 h-4 text-amber-500" />
              Serviço
            </h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-900">{serviceName}</span>
                <span className="text-sm font-bold text-amber-600">R$ {servicePrice}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-600">{serviceDuration} minutos</span>
              </div>
            </div>
          </div>

          {/* Appointment Info */}
          <div className="bg-blue-50 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-blue-500" />
              Agendamento
            </h3>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Data:</span>
                <span className="text-sm font-medium text-gray-900 capitalize">
                  {formatDate(formData.date)}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-gray-400" />
                <span className="text-sm font-medium text-gray-900">{formData.time}</span>
              </div>
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-gray-400" />
                <span className="text-sm font-medium text-gray-900">{professionalName}</span>
              </div>
            </div>
          </div>

          {/* Location Info */}
          <div className="bg-green-50 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-green-500" />
              Local
            </h3>
            <div className="space-y-1">
              <p className="text-sm font-medium text-gray-900">BarberShop Elite</p>
              <p className="text-sm text-gray-600">Rua das Barbearias, 123</p>
              <p className="text-sm text-gray-600">Centro - São Paulo, SP</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-between px-6 p-3">
          <Button color='white' onClick={onClose} className='w-[45%]'>
            Cancelar
          </Button>
          <Button loading={isLoading} onClick={onConfirm} className='w-[50%]'>
            Confirmar
          </Button>
        </div>
      </div>
    </div>
  );
}