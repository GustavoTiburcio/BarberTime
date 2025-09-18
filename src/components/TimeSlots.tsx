import { useBookings } from '../hooks/useBookings';

interface TimeSlotsProps {
  selectedDate: string;
  selectedTime: string;
  selectedProfessional: string;
  onTimeSelect: (time: string) => void;
}

export function TimeSlots({ selectedDate, selectedTime, selectedProfessional, onTimeSelect }: TimeSlotsProps) {
  const { isTimeSlotAvailable } = useBookings();

  const timeSlots = [
    '08:00', '09:00', '10:00',
    '11:00', '12:00', '14:00',
    '15:00', '16:00', '17:00',
    '18:00', '19:00'
  ];

  if (!selectedDate || !selectedProfessional) {
    return (
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Horários Disponíveis</h3>
        <p className="text-gray-500 text-center py-8">
          Selecione uma data e um profissional para ver os horários disponíveis
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Horários Disponíveis</h3>
      <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
        {timeSlots.map(time => {
          const available = isTimeSlotAvailable(selectedDate, time, selectedProfessional);
          const isSelected = selectedTime === time;

          return (
            <button
              key={time}
              onClick={() => available && onTimeSelect(time)}
              disabled={!available}
              className={`
                px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200
                ${isSelected
                  ? 'bg-amber-500 text-white shadow-lg scale-105'
                  : available
                    ? 'bg-gray-50 text-gray-700 hover:bg-gray-100 hover:scale-105 border border-gray-200'
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                }
              `}
            >
              {time}
            </button>
          );
        })}
      </div>
    </div>
  );
}