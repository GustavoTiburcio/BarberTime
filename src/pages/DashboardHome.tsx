import { useState } from 'react';
import { useBookings } from '../hooks/useBookings';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { Calendar, TrendingUp, Users, DollarSign } from 'lucide-react';

export default function DashboardHome() {
  const [dateRange, setDateRange] = useState({
    startDate: new Date(new Date().getFullYear(), new Date().getMonth(), 1)
      .toISOString()
      .split('T')[0],
    endDate: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0)
      .toISOString()
      .split('T')[0],
  });

  const { data: bookings = [], isLoading, error } = useBookings({
    startDate: dateRange.startDate,
    endDate: dateRange.endDate,
  });

  // Cálculos para os gráficos
  const revenueByService = bookings
    .filter((b) => b.status !== 'cancelled')
    .reduce((acc, b) => {
      const serviceName = b.service?.name || 'Desconhecido';
      const existingService = acc.find((s) => s.name === serviceName);
      const revenue = b.service?.price || 0;

      if (existingService) {
        existingService.revenue += revenue;
        existingService.bookings += 1;
      } else {
        acc.push({ name: serviceName, revenue, bookings: 1 });
      }
      return acc;
    }, [] as Array<{ name: string; revenue: number; bookings: number }>)
    .sort((a, b) => b.revenue - a.revenue);

  const revenueByProfessional = bookings
    .filter((b) => b.status !== 'cancelled')
    .reduce((acc, b) => {
      const profName = b.professional?.name || 'Desconhecido';
      const existingProf = acc.find((p) => p.name === profName);
      const revenue = b.service?.price || 0;

      if (existingProf) {
        existingProf.revenue += revenue;
        existingProf.bookings += 1;
      } else {
        acc.push({ name: profName, revenue, bookings: 1 });
      }
      return acc;
    }, [] as Array<{ name: string; revenue: number; bookings: number }>)
    .sort((a, b) => b.revenue - a.revenue);

  const statusDistribution = bookings.reduce((acc, b) => {
    const existingStatus = acc.find((s) => s.name === b.status);
    if (existingStatus) {
      existingStatus.value += 1;
    } else {
      acc.push({ name: b.status, value: 1 });
    }
    return acc;
  }, [] as Array<{ name: string; value: number }>);

  const bookingsByDay = bookings
    .reduce((acc, b) => {
      const existingDay = acc.find((d) => d.date === b.date);
      if (existingDay) {
        existingDay.count += 1;
      } else {
        acc.push({ date: b.date, count: 1 });
      }
      return acc;
    }, [] as Array<{ date: string; count: number }>)
    .sort((a, b) => a.date.localeCompare(b.date));

  // Totalizadores
  const totalRevenue = bookings
    .filter((b) => b.status !== 'cancelled')
    .reduce((acc, b) => acc + (b.service?.price || 0), 0);

  const totalBookings = bookings.length;
  const confirmedBookings = bookings.filter((b) => b.status === 'confirmed').length;
  const pendingBookings = bookings.filter((b) => b.status === 'pending').length;

  const statusColors: Record<string, string> = {
    confirmed: '#10b981',
    pending: '#f59e0b',
    completed: '#3b82f6',
    cancelled: '#ef4444',
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg text-gray-600">Carregando dados...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg text-red-600">Erro ao carregar dados</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <div className="flex gap-6">
          <div className="text-right">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Data Inicial
            </label>
            <input
              type="date"
              value={dateRange.startDate}
              onChange={(e) =>
                setDateRange((prev) => ({ ...prev, startDate: e.target.value }))
              }
              className="px-3 py-2 border border-gray-300 rounded-md text-sm"
            />
          </div>
          <div className="text-right">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Data Final
            </label>
            <input
              type="date"
              value={dateRange.endDate}
              onChange={(e) =>
                setDateRange((prev) => ({ ...prev, endDate: e.target.value }))
              }
              className="px-3 py-2 border border-gray-300 rounded-md text-sm"
            />
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Receita Total</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">
                R$ {totalRevenue.toFixed(2)}
              </p>
            </div>
            <DollarSign className="w-10 h-10 text-amber-500" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Total de Agendamentos</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">{totalBookings}</p>
            </div>
            <Calendar className="w-10 h-10 text-blue-500" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Confirmados</p>
              <p className="text-2xl font-bold text-green-600 mt-2">{confirmedBookings}</p>
            </div>
            <TrendingUp className="w-10 h-10 text-green-500" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Pendentes</p>
              <p className="text-2xl font-bold text-amber-600 mt-2">{pendingBookings}</p>
            </div>
            <Users className="w-10 h-10 text-amber-500" />
          </div>
        </div>
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Receita por Serviço */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Receita por Serviço</h2>
          {revenueByService.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={revenueByService}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} />
                <YAxis />
                <Tooltip formatter={(value) => `R$ ${value.toFixed(2)}`} />
                <Bar dataKey="revenue" fill="#f59e0b" />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-gray-500 text-center py-8">Nenhum dado disponível</p>
          )}
        </div>

        {/* Receita por Profissional */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Receita por Profissional</h2>
          {revenueByProfessional.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={revenueByProfessional}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={(value) => `R$ ${value.toFixed(2)}`} />
                <Bar dataKey="revenue" fill="#10b981" />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-gray-500 text-center py-8">Nenhum dado disponível</p>
          )}
        </div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Status dos Agendamentos */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Status dos Agendamentos</h2>
          {statusDistribution.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={statusDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {statusDistribution.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={statusColors[entry.name] || '#888'}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-gray-500 text-center py-8">Nenhum dado disponível</p>
          )}
        </div>

        {/* Agendamentos por Dia */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Agendamentos por Dia</h2>
          {bookingsByDay.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={bookingsByDay}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="date"
                  angle={-45}
                  textAnchor="end"
                  height={80}
                  tick={{ fontSize: 12 }}
                />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="count" stroke="#3b82f6" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-gray-500 text-center py-8">Nenhum dado disponível</p>
          )}
        </div>
      </div>

      {/* Top Services Table */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Serviços Mais Solicitados</h2>
        {revenueByService.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                    Serviço
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                    Agendamentos
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                    Receita Total
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                    % do Total
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {revenueByService.map((service) => (
                  <tr key={service.name} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-900">{service.name}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{service.bookings}</td>
                    <td className="px-6 py-4 text-sm text-gray-900 font-medium">
                      R$ {service.revenue.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {totalRevenue > 0
                        ? ((service.revenue / totalRevenue) * 100).toFixed(1)
                        : '0'}
                      %
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-500 text-center py-8">Nenhum dado disponível</p>
        )}
      </div>
    </div>
  );
}
