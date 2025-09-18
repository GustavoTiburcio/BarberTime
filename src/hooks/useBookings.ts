import { useLocalStorage } from './useLocalStorage';
import { Booking, BookingFormData } from '../types';

export function useBookings() {
  const [bookings, setBookings] = useLocalStorage<Booking[]>('barbershop-bookings', []);

  const addBooking = (formData: BookingFormData): Booking => {
    const newBooking: Booking = {
      id: crypto.randomUUID(),
      ...formData,
      status: 'confirmed',
      createdAt: new Date().toISOString(),
    };

    setBookings(prev => [...prev, newBooking]);
    return newBooking;
  };

  const getBookingsByDate = (date: string) => {
    return bookings.filter(booking => booking.date === date);
  };

  const isTimeSlotAvailable = (date: string, time: string, professionalId: string) => {
    return !bookings.some(
      booking =>
        booking.date === date &&
        booking.time === time &&
        booking.professionalId === professionalId &&
        booking.status !== 'cancelled'
    );
  };

  return {
    bookings,
    addBooking,
    getBookingsByDate,
    isTimeSlotAvailable,
  };
}