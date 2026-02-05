import { useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

import ScheduleGrid from '../components/ScheduleGrid';
import { useServices } from '../hooks/useServices';
import { useBookings } from '../hooks/useBookings';
import { useProfessionals } from '../hooks/useProfessionals';

export default function Schedule() {
  const [selectedProfessional, setSelectedProfessional] = useState<string>(
    ''
  );
  const [currentDate, setCurrentDate] = useState(new Date());
  const { data: professionals = [], isLoading: isProfessionalsLoading } = useProfessionals();
  const { data: services = [] } = useServices();

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

  // Maintain a preload range in state so we only fetch when navigating outside it
  const [preloadRange, setPreloadRange] = useState(() => {
    const weekStart = weekDates[0];
    const weekEnd = weekDates[6];
    const ps = new Date(weekStart);
    ps.setDate(ps.getDate() - 14);
    const pe = new Date(weekEnd);
    pe.setDate(pe.getDate() + 28);
    return { start: ps, end: pe };
  });

  const startDate = preloadRange.start.toISOString().split('T')[0];
  const endDate = preloadRange.end.toISOString().split('T')[0];

  // Busca bookings da API
  const { data: bookings = [], isLoading } = useBookings({
    startDate,
    endDate,
    professionalId: selectedProfessional || undefined,
  });

  const previousWeek = () => {
    const newDate = new Date(currentDate.getTime() - 7 * 24 * 60 * 60 * 1000);
    const newWeekDates = getWeekDates(newDate);
    const newWeekStart = newWeekDates[0];
    const newWeekEnd = newWeekDates[6];

    // If the newly displayed week is outside the preloadRange, expand the range
    if (newWeekStart < preloadRange.start || newWeekEnd > preloadRange.end) {
      const ps = new Date(newWeekStart);
      ps.setDate(ps.getDate() - 14);
      const pe = new Date(newWeekEnd);
      pe.setDate(pe.getDate() + 28);
      setPreloadRange({ start: ps, end: pe });
    }

    setCurrentDate(newDate);
  };

  const nextWeek = () => {
    const newDate = new Date(currentDate.getTime() + 7 * 24 * 60 * 60 * 1000);
    const newWeekDates = getWeekDates(newDate);
    const newWeekStart = newWeekDates[0];
    const newWeekEnd = newWeekDates[6];

    if (newWeekStart < preloadRange.start || newWeekEnd > preloadRange.end) {
      const ps = new Date(newWeekStart);
      ps.setDate(ps.getDate() - 14);
      const pe = new Date(newWeekEnd);
      pe.setDate(pe.getDate() + 28);
      setPreloadRange({ start: ps, end: pe });
    }

    setCurrentDate(newDate);
  };

  return (
    <div className='min-h-screen bg-gray-50 p-6'>
      <div className='max-w-7xl mx-auto'>
        {/* Header */}
        <div className='mb-8'>
          <h1 className='text-3xl font-bold text-gray-900 mb-2'>Agenda</h1>
          <p className='text-gray-600'>Visualize os agendamentos dos profissionais</p>
          {isLoading && (
            <div className='mt-4 p-3 bg-blue-50 text-blue-700 rounded-lg text-sm'>
              Carregando agendamentos...
            </div>
          )}
        </div>
        <div className='bg-white rounded-lg shadow-md p-6 mb-6'>
          <label className='block text-lg font-semibold text-gray-900 mb-4'>
            Filtros
          </label>
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
              {isProfessionalsLoading ? (
                Array.from({ length: 4 }).map((_, i) => (
                  <div
                    key={`skeleton-${i}`}
                    aria-hidden
                    className='p-3 rounded-lg border-2 bg-gray-100 animate-pulse h-11'
                  />
                ))
              ) : (
                professionals.map((professional) => (
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
                ))
              )}
            </div>
          </div>

          {/* Week Navigation */}
          <div className='flex items-center justify-between'>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>Semana</label>
              <div className='flex gap-2 items-center'>
                <button
                  onClick={previousWeek}
                  className='p-2 hover:bg-gray-100 rounded-lg transition-colors'
                  title='Semana anterior'
                >
                  <ChevronLeft size={20} className='text-gray-600' />
                </button>

                <p className='text-sm text-gray-600 text-center'>
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

                <button
                  onClick={nextWeek}
                  className='p-2 hover:bg-gray-100 rounded-lg transition-colors'
                  title='Próxima semana'
                >
                  <ChevronRight size={20} className='text-gray-600' />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Schedule Grid */}
        <ScheduleGrid
          bookings={isLoading ? [] : bookings}
          weekDates={weekDates}
          services={services}
          professionals={professionals}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}
