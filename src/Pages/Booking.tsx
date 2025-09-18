import { useState } from 'react';
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { Calendar } from '../components/Calendar';
import { TimeSlots } from '../components/TimeSlots';
import { ServiceSelector } from '../components/ServiceSelector';
import { ProfessionalSelector } from '../components/ProfessionalSelector';
import { BookingForm } from '../components/BookingForm';
import { BookingModal } from '../components/BookingModal';
import Footer from '../components/Footer';

import { professionals, services } from '../mocks';
import { formatDate, scrollToSection } from '../utils';
import { useBooking } from '../hooks/useBooking';

const schema = z.object({
  clientName: z.string().min(3, 'Nome deve ter ao menos 3 caracteres'),
  clientPhone: z
    .string()
    .regex(/^\(\d{2}\)\s\d{4,5}-\d{4}$/, 'Celular inválido. Exemplo: (44) 99999-9999'),
  date: z.string().min(1, 'Data de Agendamento obrigatória'),
  time: z.string().min(1, 'Horário é obrigatório'),
  serviceId: z.string().min(1, 'Faltou selecionar o serviço'),
  professionalId: z.string().min(1, 'Faltou selecionar o profissional'),
});

function Booking() {
  const [showModal, setShowModal] = useState(false);

  const form = useForm({
    resolver: zodResolver(schema),
    mode: 'all',
    shouldUnregister: false,
    defaultValues: {
      clientName: '',
      clientPhone: '',
      date: '',
      time: '',
      serviceId: '',
      professionalId: ''
    },
  });

  const date = form.watch('date');
  const time = form.watch('time');
  const serviceId = form.watch('serviceId');
  const professionalId = form.watch('professionalId');

  const { confirmBooking, isLoading } = useBooking({
    onSuccess: () => {
      setShowModal(false);
      form.reset();
    },
    onError: () => setShowModal(false)
  });

  const handleBookingSubmit = form.handleSubmit(() => {
    setShowModal(true);
  });

  const handleConfirmBooking = form.handleSubmit(async (formData) => {
    confirmBooking(formData);
  });

  const selectedService = services.find((s) => s.id === serviceId);
  const selectedProfessional = professionals.find((p) => p.id === professionalId);

  return (
    <div className='min-h-screen bg-gray-50'>
      <main className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        {(date || time || serviceId || professionalId) && (
          <div className='bg-amber-50 border border-amber-200 rounded-xl p-6 mb-8 hidden lg:block'>
            <h2 className='text-lg font-semibold text-amber-800 mb-4'>Resumo do Agendamento</h2>
            <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm'>
              {date && (
                <div>
                  <span className='font-medium text-amber-700'>Data:</span>
                  <p className='text-amber-800 capitalize'>{formatDate(date)}</p>
                </div>
              )}
              {time && (
                <div>
                  <span className='font-medium text-amber-700'>Horário:</span>
                  <p className='text-amber-800'>{time}</p>
                </div>
              )}
              {serviceId && (
                <div>
                  <span className='font-medium text-amber-700'>Serviço:</span>
                  <p className='text-amber-800'>{selectedService?.name}</p>
                </div>
              )}
              {professionalId && (
                <div>
                  <span className='font-medium text-amber-700'>Profissional:</span>
                  <p className='text-amber-800'>{selectedProfessional?.name}</p>
                </div>
              )}
            </div>
          </div>
        )}

        <div className='grid lg:grid-cols-2 gap-8'>
          <div className='space-y-8'>
            <Calendar
              selectedDate={date}
              onDateSelect={(date) => {
                form.setValue('date', date);
                scrollToSection('professional-selector');
              }}
            />

            <ProfessionalSelector
              selectedProfessional={professionalId}
              onProfessionalSelect={(professionalId) => {
                form.setValue('professionalId', professionalId);
                scrollToSection('service-selector');
              }}
            />

          </div>

          <div className='space-y-8'>
            <ServiceSelector
              selectedService={serviceId}
              onServiceSelect={(serviceId) => {
                form.setValue('serviceId', serviceId);
                scrollToSection('time-slots-mobile');
              }}
            />

            <div id='time-slots-mobile'>
              <TimeSlots
                selectedDate={date}
                selectedTime={time}
                selectedProfessional={professionalId}
                onTimeSelect={(time) => {
                  form.setValue('time', time);
                  scrollToSection('booking-form');
                }}
              />
            </div>

            <BookingForm
              form={form}
              onSubmit={handleBookingSubmit}
            />
          </div>
        </div>
      </main>

      <BookingModal
        isOpen={showModal}
        onClose={() => {
          if (!isLoading) {
            setShowModal(false)
          }
        }}
        onConfirm={handleConfirmBooking}
        formData={form.getValues()}
        serviceName={selectedService?.name || ''}
        servicePrice={selectedService?.price || 0}
        serviceDuration={selectedService?.duration || 0}
        professionalName={selectedProfessional?.name || ''}
        isLoading={isLoading}
      />
      <Footer />
    </div>
  );
}

export default Booking;