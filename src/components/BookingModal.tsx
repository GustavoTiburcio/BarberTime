import { X, Calendar, Clock, Scissors, User, Phone, MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './Button';
import { BookingFormData } from '../types';

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
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white rounded-xl shadow-2xl max-w-md w-full max-h-[90vh] flex flex-col overflow-hidden"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">Confirmar Agendamento</h2>
              <button
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6 overflow-y-auto">
              {/* Client Info */}
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <User className="w-4 h-4 text-amber-500" />
                  Dados do Cliente
                </h3>
                <p className="text-sm font-medium text-gray-900">{formData.clientName}</p>
                <p className="text-sm text-gray-600 flex items-center gap-1">
                  <Phone className="w-4 h-4 text-gray-400" />
                  {formData.clientPhone}
                </p>
              </div>

              {/* Service Info */}
              <div className="bg-amber-50 rounded-lg p-4 border border-amber-100">
                <h3 className="font-semibold text-amber-800 mb-3 flex items-center gap-2">
                  <Scissors className="w-4 h-4 text-amber-500" />
                  Serviço
                </h3>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-900">{serviceName}</span>
                  <span className="text-sm font-bold text-amber-600">R$ {servicePrice}</span>
                </div>
                <div className="flex items-center gap-2 mt-1 text-gray-600">
                  <Clock className="w-4 h-4 text-gray-400" />
                  <span className="text-sm">{serviceDuration} minutos</span>
                </div>
              </div>

              {/* Appointment Info */}
              <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
                <h3 className="font-semibold text-blue-800 mb-3 flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-blue-500" />
                  Agendamento
                </h3>
                <p className="text-sm font-medium text-gray-900 capitalize">{formatDate(formData.date)}</p>
                <p className="text-sm text-gray-800 flex items-center gap-1">
                  <Clock className="w-4 h-4 text-gray-400" />
                  {formData.time}
                </p>
                <p className="text-sm text-gray-800 flex items-center gap-1">
                  <User className="w-4 h-4 text-gray-400" />
                  {professionalName}
                </p>
              </div>

              {/* Location Info */}
              <div className="bg-green-50 rounded-lg p-4 border border-green-100">
                <h3 className="font-semibold text-green-800 mb-3 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-green-500" />
                  Local
                </h3>
                <p className="text-sm font-medium text-gray-900">BarberShop Elite</p>
                <p className="text-sm text-gray-600">Rua das Barbearias, 123</p>
                <p className="text-sm text-gray-600">Centro - São Paulo, SP</p>
              </div>
            </div>

            {/* Sticky Footer */}
            <div className="mt-auto flex gap-3 px-6 py-4 border-t border-gray-200 bg-white sticky bottom-0">
              <Button color="gray" onClick={onClose} className="w-1/2">
                Cancelar
              </Button>
              <Button loading={isLoading} onClick={onConfirm} className="w-1/2">
                Confirmar
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}