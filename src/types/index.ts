export type Service = {
  id: string;
  name: string;
  description: string | null;
  duration: number;
  price: number;
};

export interface Professional {
  id?: string;
  name: string;
  avatar: string;
  specialties: string[];
  rating: number;
}

export interface TimeSlot {
  time: string;
  available: boolean;
}

export interface Booking {
  id: string;
  clientName: string;
  clientPhone: string;
  date: string;
  time: string;
  serviceId?: string;
  professionalId?: string;
  service?: Service;
  professional?: Professional;
  status: 'confirmed' | 'pending' | 'completed' | 'cancelled';
  createdAt: string;
}

export interface BookingFormData {
  clientName: string;
  clientPhone: string;
  date: string;
  time: string;
  serviceId: string;
  professionalId: string;
}