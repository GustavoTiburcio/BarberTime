import { useState } from 'react';
import { Scissors } from 'lucide-react';
import { Calendar } from './components/Calendar';
import { TimeSlots } from './components/TimeSlots';
import { ServiceSelector } from './components/ServiceSelector';
import { ProfessionalSelector } from './components/ProfessionalSelector';
import { BookingForm } from './components/BookingForm';
import { BookingModal } from './components/BookingModal';
import { Toast } from './components/Toast';
import { useBookings } from './hooks/useBookings';
import { BookingFormData } from './types';

function App() {
  const { addBooking } = useBookings();
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' as 'success' | 'error' | 'info' });
  const [showModal, setShowModal] = useState(false);

  const [formData, setFormData] = useState<BookingFormData>({
    clientName: '',
    clientPhone: '',
    date: '',
    time: '',
    serviceId: '',
    professionalId: ''
  });

  const isFormValid = Object.values(formData).every(value => value.trim() !== '');

  // Auto-scroll function for mobile
  const scrollToSection = (sectionId: string) => {
    // Only auto-scroll on mobile devices
    if (window.innerWidth < 1024) {
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
            inline: 'nearest'
          });
        }
      }, 100);
    }
  };

  const handleBookingSubmit = () => {
    setShowModal(true);
  };

  const handleConfirmBooking = () => {
    try {
      const booking = addBooking(formData);
      console.log('Booking confirmed:', booking);

      setShowModal(false);
      setToast({
        show: true,
        message: 'Agendamento confirmado com sucesso! Você receberá uma confirmação em breve.',
        type: 'success'
      });

      // Reset form
      setFormData({
        clientName: '',
        clientPhone: '',
        date: '',
        time: '',
        serviceId: '',
        professionalId: ''
      });
    } catch (error) {
      console.error('Error confirming booking:', error);

      setShowModal(false);
      setToast({
        show: true,
        message: 'Erro ao confirmar agendamento. Tente novamente.',
        type: 'error'
      });
    }
  };

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

  // Helper functions to get service and professional data
  const services = [
    { id: '1', name: 'Corte Tradicional', duration: 30, price: 25, description: 'Corte clássico com acabamento a navalha' },
    { id: '2', name: 'Corte + Barba', duration: 45, price: 40, description: 'Corte completo com barba aparada e acabamento' },
    { id: '3', name: 'Barba Completa', duration: 30, price: 20, description: 'Aparar e modelar a barba com produtos premium' },
    { id: '4', name: 'Corte Moderno', duration: 40, price: 35, description: 'Cortes modernos com técnicas atualizadas' },
    { id: '5', name: 'Tratamento Capilar', duration: 60, price: 50, description: 'Hidratação e tratamento completo dos cabelos' },
    { id: '6', name: 'Combo Completo', duration: 90, price: 70, description: 'Corte, barba, sobrancelha e tratamento' }
  ];

  const professionals = [
    { id: '1', name: 'Carlos Silva', avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400', specialties: ['Corte Tradicional', 'Barba Clássica'], rating: 4.9 },
    { id: '2', name: 'Roberto Santos', avatar: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=400', specialties: ['Corte Moderno', 'Degradê'], rating: 4.8 },
    { id: '3', name: 'Diego Ferreira', avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=400', specialties: ['Barba Completa', 'Tratamentos'], rating: 4.7 },
    { id: '4', name: 'André Costa', avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400', specialties: ['Combo Completo', 'Corte Infantil'], rating: 4.9 }
  ];

  const selectedService = services.find(s => s.id === formData.serviceId);
  const selectedProfessional = professionals.find(p => p.id === formData.professionalId);

  return (
    <div className='min-h-screen bg-gray-50'>
      {/* Header */}
      <header className='bg-white shadow-sm border-b border-gray-100'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6'>
          <div className='flex items-center gap-3'>
            <div className='bg-amber-500 p-3 rounded-xl'>
              <Scissors className='w-8 h-8 text-white' />
            </div>
            <div>
              <h1 className='text-2xl font-bold text-gray-900'>BarberShop Elite</h1>
              <p className='text-gray-600'>Agende seu horário de forma rápida e prática</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        {/* Booking Summary */}
        {(formData.date || formData.time || formData.serviceId || formData.professionalId) && (
          <div className='bg-amber-50 border border-amber-200 rounded-xl p-6 mb-8 hidden lg:block'>
            <h2 className='text-lg font-semibold text-amber-800 mb-4'>Resumo do Agendamento</h2>
            <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm'>
              {formData.date && (
                <div>
                  <span className='font-medium text-amber-700'>Data:</span>
                  <p className='text-amber-800 capitalize'>{formatDate(formData.date)}</p>
                </div>
              )}
              {formData.time && (
                <div>
                  <span className='font-medium text-amber-700'>Horário:</span>
                  <p className='text-amber-800'>{formData.time}</p>
                </div>
              )}
              {formData.serviceId && (
                <div>
                  <span className='font-medium text-amber-700'>Serviço:</span>
                  <p className='text-amber-800'>{selectedService?.name}</p>
                </div>
              )}
              {formData.professionalId && (
                <div>
                  <span className='font-medium text-amber-700'>Profissional:</span>
                  <p className='text-amber-800'>{selectedProfessional?.name}</p>
                </div>
              )}
            </div>
          </div>
        )}

        <div className='grid lg:grid-cols-2 gap-8'>
          {/* Left Column */}
          <div className='space-y-8'>
            <Calendar
              selectedDate={formData.date}
              onDateSelect={(date) => {
                setFormData(prev => ({ ...prev, date, time: '' }));
                scrollToSection('professional-selector');
              }}
            />

            <div id='professional-selector'>
              <ProfessionalSelector
                selectedProfessional={formData.professionalId}
                onProfessionalSelect={(professionalId) => {
                  setFormData(prev => ({ ...prev, professionalId, time: '' }));
                  scrollToSection('service-selector');
                }}
              />
            </div>

          </div>

          {/* Right Column */}
          <div className='space-y-8'>
            <div id='service-selector'>
              <ServiceSelector
                selectedService={formData.serviceId}
                onServiceSelect={(serviceId) => {
                  setFormData(prev => ({ ...prev, serviceId }));
                  scrollToSection('time-slots-mobile');
                }}
              />
            </div>

            {/* TimeSlots - Hidden on mobile, shown on desktop */}
            <div className='hidden lg:block'>
              <TimeSlots
                selectedDate={formData.date}
                selectedTime={formData.time}
                selectedProfessional={formData.professionalId}
                onTimeSelect={(time) => setFormData(prev => ({ ...prev, time }))}
              />
            </div>

            {/* TimeSlots - Shown on mobile after professional selection */}
            <div id='time-slots-mobile' className='lg:hidden'>
              <TimeSlots
                selectedDate={formData.date}
                selectedTime={formData.time}
                selectedProfessional={formData.professionalId}
                onTimeSelect={(time) => {
                  setFormData(prev => ({ ...prev, time }));
                  scrollToSection('booking-form');
                }}
              />
            </div>

            <div id='booking-form'>
              <BookingForm
                formData={formData}
                onFormDataChange={setFormData}
                onSubmit={handleBookingSubmit}
                isFormValid={isFormValid}
              />
            </div>
          </div>
        </div>
      </main>

      {/* Booking Modal */}
      <BookingModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={handleConfirmBooking}
        formData={formData}
        serviceName={selectedService?.name || ''}
        servicePrice={selectedService?.price || 0}
        serviceDuration={selectedService?.duration || 0}
        professionalName={selectedProfessional?.name || ''}
      />

      {/* Footer */}
      <footer className='bg-gray-900 text-white py-12 mt-16'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='grid md:grid-cols-3 gap-8'>
            <div>
              <div className='flex items-center gap-3 mb-4'>
                <div className='bg-amber-500 p-2 rounded-lg'>
                  <Scissors className='w-6 h-6 text-white' />
                </div>
                <h3 className='text-xl font-bold'>BarberShop Elite</h3>
              </div>
              <p className='text-gray-400'>
                A melhor experiência em cortes e cuidados masculinos.
                Tradição e modernidade em um só lugar.
              </p>
            </div>

            <div>
              <h4 className='text-lg font-semibold mb-4'>Horário de Funcionamento</h4>
              <div className='space-y-2 text-gray-400'>
                <p>Segunda a Sexta: 8h às 20h</p>
                <p>Sábado: 8h às 18h</p>
                <p>Domingo: 9h às 15h</p>
              </div>
            </div>

            <div>
              <h4 className='text-lg font-semibold mb-4'>Contato</h4>
              <div className='space-y-2 text-gray-400'>
                <p>📍 Rua das Barbearias, 123</p>
                <p>📞 (11) 99999-9999</p>
                <p>✉️ contato@barbershopelit.com</p>
              </div>
            </div>
          </div>

          <div className='border-t border-gray-800 pt-8 mt-8 text-center text-gray-400'>
            <p>&copy; 2025 BarberShop Elite. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>

      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.show}
        onClose={() => setToast(prev => ({ ...prev, show: false }))}
      />
    </div>
  );
}

export default App;