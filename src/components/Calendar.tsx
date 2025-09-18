import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CalendarProps {
  selectedDate: string;
  onDateSelect: (date: string) => void;
}

export function Calendar({ selectedDate, onDateSelect }: CalendarProps) {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
  const monthNames = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];

  const goToPreviousMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const goToNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const formatDate = (day: number): string => {
    const date = new Date(currentYear, currentMonth, day);
    return date.toISOString().split('T')[0];
  };

  const isDateDisabled = (day: number): boolean => {
    const date = new Date(currentYear, currentMonth, day);
    return date < today;
  };

  const isDateSelected = (day: number): boolean => {
    return formatDate(day) === selectedDate;
  };

  const days = [];
  
  // Empty cells for days before the first day of the month
  for (let i = 0; i < firstDayOfMonth; i++) {
    days.push(<div key={`empty-${i}`} className="w-10 h-10"></div>);
  }

  // Days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    const dateStr = formatDate(day);
    const isDisabled = isDateDisabled(day);
    const isSelected = isDateSelected(day);

    days.push(
      <button
        key={day}
        onClick={() => !isDisabled && onDateSelect(dateStr)}
        disabled={isDisabled}
        className={`
          w-10 h-10 rounded-lg text-sm font-medium transition-all duration-200
          ${isSelected 
            ? 'bg-amber-500 text-white shadow-lg scale-105' 
            : isDisabled 
              ? 'text-gray-300 cursor-not-allowed' 
              : 'text-gray-700 hover:bg-gray-100 hover:scale-105'
          }
        `}
      >
        {day}
      </button>
    );
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">
          {monthNames[currentMonth]} {currentYear}
        </h3>
        <div className="flex gap-2">
          <button
            onClick={goToPreviousMonth}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={goToNextMonth}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-7 gap-1 mb-2">
        {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map(day => (
          <div key={day} className="w-10 h-8 flex items-center justify-center text-xs font-medium text-gray-500">
            {day}
          </div>
        ))}
      </div>
      
      <div className="grid grid-cols-7 gap-1">
        {days}
      </div>
    </div>
  );
}