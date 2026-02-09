import { useState } from 'react';
import { Calendar, DollarSign, TrendingUp, Users } from 'lucide-react';
import { useProfessionals } from '../hooks/useProfessionals';
import { useCommissionReport } from '../hooks/useCommissionReport';

export default function Comission() {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [selectedProfessional, setSelectedProfessional] = useState('');

  const { data: professionals = [], isLoading: isProfessionalsLoading } = useProfessionals();

  const { data: report, isLoading: isReportLoading } = useCommissionReport({
    professionalId: selectedProfessional,
    startDate,
    endDate,
  });

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  const formatTime = (timeStr: string) => {
    return timeStr.substring(0, 5);
  };

  const getStatusLabel = (status: string) => {
    const statusMap: Record<string, string> = {
      confirmed: 'Confirmado',
      pending: 'Pendente',
      completed: 'Completo',
      cancelled: 'Cancelado',
    };
    return statusMap[status] || status;
  };

  const getStatusColor = (status: string) => {
    const colorMap: Record<string, string> = {
      confirmed: 'bg-green-100 text-green-800',
      pending: 'bg-yellow-100 text-yellow-800',
      completed: 'bg-blue-100 text-blue-800',
      cancelled: 'bg-red-100 text-red-800',
    };
    return colorMap[status] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className='min-h-screen bg-gray-50 p-6'>
      <div className='max-w-7xl mx-auto'>
        {/* Header */}
        <div className='mb-8'>
          <h1 className='text-3xl font-bold text-gray-900 mb-2'>Relatório de Comissão</h1>
          <p className='text-gray-600'>Visualize os ganhos e comissões dos profissionais</p>
        </div>

        {/* Filtros */}
        <div className='bg-white rounded-lg shadow-md p-6 mb-6'>
          <label className='block text-lg font-semibold text-gray-900 mb-4'>
            Filtros
          </label>

          <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
            {/* Profissional */}
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>
                Profissional
              </label>
              <select
                value={selectedProfessional}
                onChange={(e) => setSelectedProfessional(e.target.value)}
                className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                disabled={isProfessionalsLoading}
              >
                <option value=''>Selecione um profissional</option>
                {professionals.map((professional) => (
                  <option key={professional.id} value={professional.id}>
                    {professional.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Data Inicial */}
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>
                Data Inicial
              </label>
              <input
                type='date'
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
              />
            </div>

            {/* Data Final */}
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>
                Data Final
              </label>
              <input
                type='date'
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
              />
            </div>
          </div>
        </div>

        {/* Loading State */}
        {isReportLoading && (
          <div className='bg-white rounded-lg shadow-md p-12 text-center'>
            <div className='flex flex-col items-center gap-3'>
              <div className='w-8 h-8 border-4 border-t-blue-600 rounded-full animate-spin' />
              <div className='text-sm text-gray-700'>Carregando relatório...</div>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!isReportLoading && !report && selectedProfessional && startDate && endDate && (
          <div className='bg-white rounded-lg shadow-md p-12 text-center'>
            <Calendar size={48} className='mx-auto text-gray-400 mb-4' />
            <p className='text-gray-600'>Nenhum dado encontrado para o período selecionado</p>
          </div>
        )}

        {/* Instruções iniciais */}
        {!selectedProfessional && !startDate && !endDate && (
          <div className='bg-white rounded-lg shadow-md p-12 text-center'>
            <TrendingUp size={48} className='mx-auto text-gray-400 mb-4' />
            <p className='text-gray-600'>Selecione um profissional e o período para visualizar o relatório</p>
          </div>
        )}

        {/* Relatório */}
        {report && !isReportLoading && (
          <>
            {/* Resumo */}
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6'>
              {/* Total de Agendamentos */}
              <div className='bg-white rounded-lg shadow-md p-6'>
                <div className='flex items-center justify-between mb-2'>
                  <h3 className='text-sm font-medium text-gray-600'>Total de Agendamentos</h3>
                  <Users size={20} className='text-blue-600' />
                </div>
                <p className='text-2xl font-bold text-gray-900'>{report.summary.totalBookings}</p>
              </div>

              {/* Valor Total dos Serviços */}
              <div className='bg-white rounded-lg shadow-md p-6'>
                <div className='flex items-center justify-between mb-2'>
                  <h3 className='text-sm font-medium text-gray-600'>Valor Total dos Serviços</h3>
                  <DollarSign size={20} className='text-green-600' />
                </div>
                <p className='text-2xl font-bold text-gray-900'>
                  {formatCurrency(report.summary.totalServicePrice)}
                </p>
              </div>

              {/* Comissão Total */}
              <div className='bg-white rounded-lg shadow-md p-6'>
                <div className='flex items-center justify-between mb-2'>
                  <h3 className='text-sm font-medium text-gray-600'>Comissão Total</h3>
                  <TrendingUp size={20} className='text-purple-600' />
                </div>
                <p className='text-2xl font-bold text-gray-900'>
                  {formatCurrency(report.summary.totalCommission)}
                </p>
                <p className='text-xs text-gray-500 mt-1'>
                  Taxa: {report.professional.commissionRate}%
                </p>
              </div>

              {/* Média por Serviço */}
              <div className='bg-white rounded-lg shadow-md p-6'>
                <div className='flex items-center justify-between mb-2'>
                  <h3 className='text-sm font-medium text-gray-600'>Comissão Média</h3>
                  <DollarSign size={20} className='text-orange-600' />
                </div>
                <p className='text-2xl font-bold text-gray-900'>
                  {formatCurrency(report.summary.averageCommission)}
                </p>
              </div>
            </div>

            {/* Tabela de Agendamentos */}
            <div className='bg-white rounded-lg shadow-md overflow-hidden'>
              <div className='p-6 border-b border-gray-200'>
                <h2 className='text-xl font-bold text-gray-900'>
                  Detalhes dos Agendamentos
                </h2>
                <p className='text-sm text-gray-600 mt-1'>
                  Profissional: {report.professional.name} | Período: {formatDate(report.period.startDate)} até {formatDate(report.period.endDate)}
                </p>
              </div>

              <div className='overflow-x-auto'>
                <table className='w-full'>
                  <thead className='bg-gray-50 border-b border-gray-200'>
                    <tr>
                      <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                        Data/Hora
                      </th>
                      <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                        Cliente
                      </th>
                      <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                        Serviço
                      </th>
                      <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                        Status
                      </th>
                      <th className='px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider'>
                        Valor do Serviço
                      </th>
                      <th className='px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider'>
                        Taxa (%)
                      </th>
                      <th className='px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider'>
                        Comissão
                      </th>
                    </tr>
                  </thead>
                  <tbody className='bg-white divide-y divide-gray-200'>
                    {report.bookings.map((booking) => (
                      <tr key={booking.id} className='hover:bg-gray-50 transition-colors'>
                        <td className='px-6 py-4 whitespace-nowrap'>
                          <div className='text-sm font-medium text-gray-900'>
                            {formatDate(booking.date)}
                          </div>
                          <div className='text-sm text-gray-500'>
                            {formatTime(booking.time)}
                          </div>
                        </td>
                        <td className='px-6 py-4'>
                          <div className='text-sm font-medium text-gray-900'>
                            {booking.clientName}
                          </div>
                          <div className='text-sm text-gray-500'>
                            {booking.clientPhone}
                          </div>
                        </td>
                        <td className='px-6 py-4'>
                          <div className='text-sm text-gray-900'>
                            {booking.service.name}
                          </div>
                          <div className='text-sm text-gray-500'>
                            {booking.service.duration} min
                          </div>
                        </td>
                        <td className='px-6 py-4 whitespace-nowrap'>
                          <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(booking.status)}`}>
                            {getStatusLabel(booking.status)}
                          </span>
                        </td>
                        <td className='px-6 py-4 whitespace-nowrap text-right text-sm text-gray-900'>
                          {formatCurrency(booking.servicePrice)}
                        </td>
                        <td className='px-6 py-4 whitespace-nowrap text-right text-sm text-gray-900'>
                          {booking.commissionRate}%
                        </td>
                        <td className='px-6 py-4 whitespace-nowrap text-right text-sm font-medium text-green-600'>
                          {formatCurrency(booking.commissionAmount)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
