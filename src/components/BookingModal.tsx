import { useState } from 'react';
import {
  X, Calendar, Clock,
  Scissors, User, Phone,
  MapPin, Copy, CheckCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import { Button } from './Button';
import WhatsappIcon from '../assets/whatsapp.svg?react';
import PixIcon from '../assets/pix.svg?react';

import { BookingFormData } from '../types';
import { COMPANY_CONFIG } from '../constants';

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
  isSuccess?: boolean;
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
  professionalName,
  isSuccess = false
}: BookingModalProps) {
  const [copied, setCopied] = useState(false);

  // Configurações da empresa
  const pixKey = COMPANY_CONFIG.pixKey;
  const companyPhone = COMPANY_CONFIG.whatsappPhone;

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

  const handleCopyPix = () => {
    navigator.clipboard.writeText(pixKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleWhatsApp = () => {
    const message = `Olá! Confirmação do meu agendamento:\n\nData: ${formatDate(formData.date)}\nHorário: ${formData.time}\nServiço: ${serviceName}\nValor: R$ ${servicePrice}\nProfissional: ${professionalName}\n\nCliente: ${formData.clientName}\nTelefone: ${formData.clientPhone}`;
    const whatsappUrl = `https://wa.me/${companyPhone}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
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
            className="bg-white rounded-xl shadow-2xl max-w-md w-full max-h-[85vh] flex flex-col overflow-hidden"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                {isSuccess && <CheckCircle className="w-6 h-6 text-green-500" />}
                {isSuccess ? 'Agendamento Confirmado!' : 'Confirmar Agendamento'}
              </h2>
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

              {/* PIX Info - Only shown after success */}
              {isSuccess && (
                <div className="bg-purple-50 rounded-lg p-4 border border-purple-100">
                  <h3 className="flex items-center font-semibold text-purple-800 mb-3">
                    <PixIcon className="fill-purple-800 w-6 h-6 mr-1" />
                    Chave PIX para Pagamento
                  </h3>
                  <div className="space-y-2">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        readOnly
                        value={pixKey}
                        className="flex-1 px-3 py-2 text-sm border border-purple-200 rounded-lg bg-white font-mono"
                      />
                      <Button
                        onClick={handleCopyPix}
                        color="gray"
                        className="!px-3"
                      >
                        {copied ? (
                          <>
                            <CheckCircle className="w-4 h-4 text-green-600" />
                          </>
                        ) : (
                          <>
                            <Copy className="w-4 h-4" />
                          </>
                        )}
                      </Button>
                    </div>
                    <p className="text-xs text-purple-600">
                      Copie a chave PIX acima para realizar o pagamento
                    </p>
                  </div>
                </div>
              )}

              {/* Location Info */}
              <div className="bg-green-50 rounded-lg p-4 border border-green-100">
                <h3 className="font-semibold text-green-800 mb-3 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-green-500" />
                  Local
                </h3>
                <p className="text-sm font-medium text-gray-900">{COMPANY_CONFIG.name}</p>
                <p className="text-sm text-gray-600">{COMPANY_CONFIG.address.street}</p>
                <p className="text-sm text-gray-600">{COMPANY_CONFIG.address.neighborhood}, {COMPANY_CONFIG.address.city}</p>
              </div>
            </div>

            {/* Sticky Footer */}
            <div className="mt-auto flex gap-3 px-6 py-4 border-t border-gray-200 bg-white sticky bottom-0">
              {isSuccess ? (
                <Button
                  onClick={handleWhatsApp}
                  className="w-full bg-green-600 hover:bg-green-700 text-white flex items-center justify-center gap-2"
                >
                  <WhatsappIcon className="w-6 h-6 mr-2" />
                  Enviar confirmação via WhatsApp
                </Button>
              ) : (
                <>
                  <Button color="gray" onClick={onClose} className="w-1/2">
                    Cancelar
                  </Button>
                  <Button loading={isLoading} onClick={onConfirm} className="w-1/2">
                    Confirmar
                  </Button>
                </>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}