import { useQuery } from '@tanstack/react-query';
import { api } from '../lib/api';

interface CommissionReportFilters {
  professionalId: string;
  startDate: string;
  endDate: string;
}

interface Professional {
  id: string;
  name: string;
  commissionRate: number;
}

interface Period {
  startDate: string;
  endDate: string;
}

interface Summary {
  totalBookings: number;
  totalServicePrice: number;
  totalCommission: number;
  averageServicePrice: number;
  averageCommission: number;
}

interface BookingDetail {
  id: string;
  clientName: string;
  clientPhone: string;
  date: string;
  time: string;
  status: string;
  servicePrice: number;
  commissionRate: number;
  commissionAmount: number;
  createdAt: string;
  service: {
    id: string;
    name: string;
    duration: number;
  };
}

export interface CommissionReport {
  professional: Professional;
  period: Period;
  summary: Summary;
  bookings: BookingDetail[];
}

export function useCommissionReport(filters: CommissionReportFilters) {
  return useQuery<CommissionReport>({
    queryKey: ['commissionReport', filters],
    queryFn: async () => {
      const { data } = await api.get('/commissionReport', {
        params: {
          professionalId: filters.professionalId,
          startDate: filters.startDate,
          endDate: filters.endDate,
        },
      });
      return data;
    },
    enabled: !!filters.professionalId && !!filters.startDate && !!filters.endDate,
  });
}
