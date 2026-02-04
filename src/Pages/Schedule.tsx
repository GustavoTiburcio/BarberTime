import { useState, useMemo } from 'react';
import {
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import ScheduleGrid from '../components/ScheduleGrid';
import { Booking } from '../types';
import { professionals } from '../mocks';

// Mock de agendamentos para demonstração
const mockBookings: Booking[] = [
  {
    id: '1',
    clientName: 'João Silva',
    clientPhone: '11999999999',
    date: new Date().toISOString().split('T')[0],
    time: '09:00',
    serviceId: '2',
    professionalId: '1',
    status: 'confirmed',
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    clientName: 'Maria Santos',
    clientPhone: '11988888888',
    date: new Date().toISOString().split('T')[0],
    time: '10:00',
    serviceId: '6',
    professionalId: '1',
    status: 'confirmed',
    createdAt: new Date().toISOString(),
  },
  {
    id: '3',
    clientName: 'Pedro Costa',
    clientPhone: '11977777777',
    date: new Date(Date.now() + 86400000).toISOString().split('T')[0],
    time: '14:00',
    serviceId: '1',
    professionalId: '2',
    status: 'pending',
    createdAt: new Date().toISOString(),
  },
  {
    id: '4',
    clientName: 'Ana Ferreira',
    clientPhone: '11966666666',
    date: new Date(Date.now() + 86400000).toISOString().split('T')[0],
    time: '15:00',
    serviceId: '3',
    professionalId: '2',
    status: 'confirmed',
    createdAt: new Date().toISOString(),
  },
];

export default function Schedule() {
  const [selectedProfessional, setSelectedProfessional] = useState<string>(
    ''
  );
  const [currentDate, setCurrentDate] = useState(new Date());

  // Filtra agendamentos do profissional selecionado
  const filteredBookings = useMemo(
    () => mockBookings.filter((booking) => booking.professionalId === selectedProfessional),
    [selectedProfessional]
  );

  const getWeekDates = (date: Date) => {
    const dates = [];
    const current = new Date(date);
    const dayOfWeek = current.getDay();
    const diff = current.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1);
    const monday = new Date(current.setDate(diff));

    for (let i = 0; i < 7; i++) {
      dates.push(new Date(monday));
      monday.setDate(monday.getDate() + 1);
    }

    return dates;
  };

  const weekDates = getWeekDates(new Date(currentDate));

  const previousWeek = () => {
    setCurrentDate(new Date(currentDate.getTime() - 7 * 24 * 60 * 60 * 1000));
  };

  const nextWeek = () => {
    setCurrentDate(new Date(currentDate.getTime() + 7 * 24 * 60 * 60 * 1000));
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  return (
    <div className='min-h-screen bg-gray-50 p-6'>
      <div className='max-w-7xl mx-auto'>
        {/* Header */}
        <div className='mb-8'>
          <h1 className='text-3xl font-bold text-gray-900 mb-2'>Agenda</h1>
          <p className='text-gray-600'>Visualize os agendamentos dos profissionais</p>
        </div>

        {/* Controls */}
        <div className='bg-white rounded-lg shadow-md p-6 mb-6'>
          {/* Professional Selector */}
          <div className='mb-6'>
            <label className='block text-sm font-medium text-gray-700 mb-3'>
              Profissional
            </label>
            <div className='grid grid-cols-2 md:grid-cols-4 gap-3'>
              <button
                onClick={() => setSelectedProfessional('')}
                className={`p-3 rounded-lg border-2 transition-all text-sm font-medium ${selectedProfessional === ''
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-gray-200 bg-white text-gray-700 hover:border-blue-300'
                  }`}
              >
                Todos
              </button>
              {professionals.map((professional) => (
                <button
                  key={professional.id}
                  onClick={() => setSelectedProfessional(professional.id || '')}
                  className={`p-3 rounded-lg border-2 transition-all text-sm font-medium ${selectedProfessional === professional.id
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-200 bg-white text-gray-700 hover:border-blue-300'
                    }`}
                >
                  {professional.name}
                </button>
              ))}
            </div>
          </div>

          {/* Week Navigation */}
          <div className='flex items-center justify-between'>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>Semana</label>
              <div className='flex gap-2'>
                <button
                  onClick={previousWeek}
                  className='p-2 hover:bg-gray-100 rounded-lg transition-colors'
                  title='Semana anterior'
                >
                  <ChevronLeft size={20} className='text-gray-600' />
                </button>

                <button
                  onClick={goToToday}
                  className='px-4 py-2 bg-blue-100 text-blue-700 rounded-lg text-sm font-medium hover:bg-blue-200 transition-colors'
                >
                  Hoje
                </button>

                <button
                  onClick={nextWeek}
                  className='p-2 hover:bg-gray-100 rounded-lg transition-colors'
                  title='Próxima semana'
                >
                  <ChevronRight size={20} className='text-gray-600' />
                </button>
              </div>
            </div>

            <div className='text-right'>
              <p className='text-sm text-gray-600'>
                {weekDates[0].toLocaleDateString('pt-BR', {
                  day: 'numeric',
                  month: 'short',
                })}{' '}
                -{' '}
                {weekDates[6].toLocaleDateString('pt-BR', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                })}
              </p>
            </div>
          </div>
        </div>

        {/* Schedule Grid */}
        <ScheduleGrid bookings={selectedProfessional === '' ? mockBookings : filteredBookings} weekDates={weekDates} />
      </div>
    </div>
  );
}
