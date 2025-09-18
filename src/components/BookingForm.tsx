import { FormEvent, useState } from 'react';
import { Phone, User as UserIcon, Calendar as CalendarIcon } from 'lucide-react';
import { BookingFormData } from '../types';

interface BookingFormProps {
  formData: BookingFormData;
  onFormDataChange: (data: BookingFormData) => void;
  onSubmit: () => void;
  isFormValid: boolean;
}

export function BookingForm({ formData, onFormDataChange, onSubmit, isFormValid }: BookingFormProps) {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateField = (field: string, value: string) => {
    const newErrors = { ...errors };
    const phoneRegex = /^\(\d{2}\)\s\d{4,5}-\d{4}$/;

    switch (field) {
      case 'clientName':
        if (!value.trim()) {
          newErrors.clientName = 'Nome é obrigatório';
        } else if (value.length < 2) {
          newErrors.clientName = 'Nome deve ter pelo menos 2 caracteres';
        } else {
          delete newErrors.clientName;
        }
        break;
      case 'clientPhone':
        if (!value.trim()) {
          newErrors.clientPhone = 'Telefone é obrigatório';
        } else if (!phoneRegex.test(value)) {
          newErrors.clientPhone = 'Formato: (11) 99999-9999';
        } else {
          delete newErrors.clientPhone;
        }
        break;
    }

    setErrors(newErrors);
  };

  const formatPhoneNumber = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 2) return `(${numbers}`;
    if (numbers.length <= 6) return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`;
    if (numbers.length <= 10) return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 6)}-${numbers.slice(6)}`;
    return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7, 11)}`;
  };

  const handleInputChange = (field: keyof BookingFormData, value: string) => {
    if (field === 'clientPhone') {
      value = formatPhoneNumber(value);
    }

    onFormDataChange({
      ...formData,
      [field]: value
    });

    if (field === 'clientName' || field === 'clientPhone') {
      validateField(field, value);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (isFormValid && Object.keys(errors).length === 0) {
      onSubmit();
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
        <CalendarIcon className="w-5 h-5 text-amber-500" />
        Confirmar Agendamento
      </h3>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="clientName" className="block text-sm font-medium text-gray-700 mb-2">
            Nome Completo *
          </label>
          <div className="relative">
            <UserIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              id="clientName"
              value={formData.clientName}
              onChange={(e) => handleInputChange('clientName', e.target.value)}
              onBlur={() => validateField('clientName', formData.clientName)}
              className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all ${
                errors.clientName ? 'border-red-300' : 'border-gray-300'
              }`}
              placeholder="Digite seu nome completo"
            />
          </div>
          {errors.clientName && (
            <p className="mt-1 text-sm text-red-600">{errors.clientName}</p>
          )}
        </div>

        <div>
          <label htmlFor="clientPhone" className="block text-sm font-medium text-gray-700 mb-2">
            Telefone *
          </label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="tel"
              id="clientPhone"
              value={formData.clientPhone}
              onChange={(e) => handleInputChange('clientPhone', e.target.value)}
              onBlur={() => validateField('clientPhone', formData.clientPhone)}
              className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all ${
                errors.clientPhone ? 'border-red-300' : 'border-gray-300'
              }`}
              placeholder="(11) 99999-9999"
              maxLength={15}
            />
          </div>
          {errors.clientPhone && (
            <p className="mt-1 text-sm text-red-600">{errors.clientPhone}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={!isFormValid || Object.keys(errors).length > 0}
          className="w-full bg-amber-500 text-white py-3 px-6 rounded-lg font-semibold hover:bg-amber-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all duration-200 hover:shadow-lg disabled:shadow-none"
        >
          Confirmar Agendamento
        </button>
      </form>
    </div>
  );
}