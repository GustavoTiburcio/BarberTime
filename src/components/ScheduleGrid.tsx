import { useMemo } from 'react';
import { Booking } from '../types';
import { services } from '../mocks';

interface ScheduleGridProps {
  bookings: Booking[];
  weekDates: Date[];
}

const OPENING_HOUR = 8;
const CLOSING_HOUR = 20;
const SLOT_DURATION = 30; // minutos

const STATUS_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  confirmed: {
    bg: 'bg-green-100',
    text: 'text-green-900',
    border: 'border-green-300',
  },
  pending: {
    bg: 'bg-yellow-100',
    text: 'text-yellow-900',
    border: 'border-yellow-300',
  },
  completed: {
    bg: 'bg-blue-100',
    text: 'text-blue-900',
    border: 'border-blue-300',
  },
  cancelled: {
    bg: 'bg-red-100',
    text: 'text-red-900',
    border: 'border-red-300',
  },
};

export default function ScheduleGrid({ bookings, weekDates }: ScheduleGridProps) {
  // Gera slots de 30 minutos para cada hora
  const timeSlots = useMemo(() => {
    const slots = [];
    for (let hour = OPENING_HOUR; hour < CLOSING_HOUR; hour++) {
      for (let minute = 0; minute < 60; minute += SLOT_DURATION) {
        slots.push(`${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`);
      }
    }
    return slots;
  }, []);

  // Encontra agendamentos para uma data
  const getBookingsForDate = (date: Date): Booking[] => {
    const dateStr = date.toISOString().split('T')[0];
    return bookings.filter((booking) => booking.date === dateStr);
  };

  // Calcula quantos slots o agendamento ocupa baseado na duração
  const getBookingSpanRows = (serviceId: string): number => {
    const service = services.find((s) => s.id === serviceId);
    const duration = service?.duration || 30;
    return Math.ceil(duration / SLOT_DURATION);
  };

  const dayNames = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'];

  return (
    <div className='bg-white rounded-lg shadow-md overflow-hidden'>
      {/* Header com dias */}
      <div className='overflow-x-auto'>
        <div className='inline-block min-w-full'>
          <div className='grid grid-cols-[80px_repeat(7,1fr)] gap-0 border-b border-gray-200'>
            {/* Coluna de horários (vazia) */}
            <div className='bg-gray-50 p-4 border-r border-gray-200'></div>

            {/* Dias da semana */}
            {weekDates.map((date, index) => {
              const today = new Date();
              const isToday =
                date.getDate() === today.getDate() &&
                date.getMonth() === today.getMonth() &&
                date.getFullYear() === today.getFullYear();

              return (
                <div
                  key={date.toISOString()}
                  className={`p-4 text-center border-r border-gray-200 ${
                    isToday ? 'bg-blue-50' : 'bg-gray-50'
                  }`}
                >
                  <div className={`text-sm font-medium ${isToday ? 'text-blue-700' : 'text-gray-700'}`}>
                    {dayNames[index]}
                  </div>
                  <div
                    className={`text-xl font-bold ${isToday ? 'text-blue-900' : 'text-gray-900'}`}
                  >
                    {date.getDate()}
                  </div>
                  <div className={`text-xs ${isToday ? 'text-blue-600' : 'text-gray-500'}`}>
                    {date.toLocaleDateString('pt-BR', { month: 'short' })}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Grid de horários e agendamentos */}
          <div className='overflow-x-auto'>
            <div
              className='grid gap-0'
              style={{
                gridTemplateColumns: '80px repeat(7, 1fr)',
                gridAutoRows: '48px',
              }}
            >
              {/* Coluna de horários */}
              {timeSlots.map((time, index) => (
                <div
                  key={`hour-${time}`}
                  className='bg-gray-50 p-2 text-sm font-medium text-gray-700 border-r border-b border-gray-200 flex items-center justify-center'
                  style={{ gridColumn: 1, gridRow: index + 1 }}
                >
                  {time}
                </div>
              ))}

              {/* Slots de cada dia */}
              {weekDates.map((date, dayIndex) => {
                const dateBookings = getBookingsForDate(date);
                const renderedBookingIds = new Set<string>();

                return timeSlots.map((time, timeIndex) => {
                  const cellKey = `${date.toISOString()}-${time}`;

                  // Encontra um agendamento que começa neste slot
                  const booking = dateBookings.find(
                    (b) => b.time === time && !renderedBookingIds.has(b.id)
                  );

                  if (booking) {
                    renderedBookingIds.add(booking.id);
                    const spanRows = getBookingSpanRows(booking.serviceId);
                    const statusColor = STATUS_COLORS[booking.status];

                    return (
                      <div
                        key={cellKey}
                        className={`p-2 border-2 rounded-lg flex flex-col justify-center items-center cursor-pointer hover:shadow-lg transition-shadow ${statusColor.bg} ${statusColor.border} ${statusColor.text} overflow-hidden m-0.5`}
                        style={{
                          gridColumn: dayIndex + 2,
                          gridRow: `${timeIndex + 1} / span ${spanRows}`,
                        }}
                        title={`${booking.clientName} - ${booking.clientPhone}`}
                      >
                        <div className='text-xs font-semibold text-center truncate w-full'>
                          {booking.clientName.split(' ')[0]} - {booking.clientPhone}
                        </div>
                        <div className='text-xs font-semibold text-center truncate w-full'>
                          {services.find((s) => s.id === booking.serviceId)?.name || 'Serviço'}
                        </div>
                        <div className='text-xs text-center'>
                          {booking.time}
                        </div>
                        <div className='text-xs font-medium'>
                          {booking.status === 'confirmed' && '✓'}
                          {booking.status === 'pending' && '⏳'}
                          {booking.status === 'completed' && '✓✓'}
                          {booking.status === 'cancelled' && '✗'}
                        </div>
                      </div>
                    );
                  }

                  // Renderiza célula vazia
                  return (
                    <div
                      key={cellKey}
                      className='border-r border-b border-gray-100 hover:bg-gray-50 transition-colors'
                      style={{
                        gridColumn: dayIndex + 2,
                        gridRow: timeIndex + 1,
                      }}
                    />
                  );
                });
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Legenda */}
      <div className='bg-gray-50 p-4 border-t border-gray-200'>
        <div className='grid grid-cols-2 md:grid-cols-4 gap-4 text-sm'>
          {Object.entries(STATUS_COLORS).map(([status, colors]) => (
            <div key={status} className='flex items-center gap-2'>
              <div className={`w-4 h-4 rounded border-2 ${colors.bg} ${colors.border}`}></div>
              <span className='text-gray-700 capitalize'>
                {status === 'confirmed' && 'Confirmado'}
                {status === 'pending' && 'Pendente'}
                {status === 'completed' && 'Completo'}
                {status === 'cancelled' && 'Cancelado'}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
