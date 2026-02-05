interface TimeSlotsProps {
  availableTimes: string[];
  loading?: boolean;
  selectedTime: string;
  onTimeSelect: (time: string) => void;
}

export function TimeSlots({
  availableTimes,
  loading,
  selectedTime,
  onTimeSelect,
}: TimeSlotsProps) {
  if (loading) {
    return (
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Horários Disponíveis
        </h3>
        <p className="text-gray-500 text-center py-8">
          Carregando horários...
        </p>
      </div>
    );
  }

  if (!availableTimes.length) {
    return (
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Horários Disponíveis
        </h3>
        <p className="text-gray-500 text-center py-8">
          Nenhum horário disponível para essa seleção
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Horários Disponíveis
      </h3>

      <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
        {availableTimes.map((time) => {
          const isSelected = selectedTime === time;

          return (
            <button
              key={time}
              onClick={() => onTimeSelect(time)}
              className={`
                px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200
                ${
                  isSelected
                    ? 'bg-amber-500 text-white shadow-lg scale-105'
                    : 'bg-gray-50 text-gray-700 hover:bg-gray-100 hover:scale-105 border border-gray-200'
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
