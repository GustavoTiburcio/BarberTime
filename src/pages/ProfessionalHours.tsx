import { useState } from 'react';
import { Trash2, Plus, Save, X, Edit2 } from 'lucide-react';
import { Button } from '../components/Button';
import { useProfessionals } from '../hooks/useProfessionals';
import { useWorkHours } from '../hooks/useWorkHours';
import { useCreateWorkHour } from '../hooks/useCreateWorkHour';
import { useUpdateWorkHour } from '../hooks/useUpdateWorkHours';
import { useDeleteWorkHour } from '../hooks/useDeleteWorkHours';
import { WorkHour } from '../types';

const daysOfWeek = [
  { value: 1, name: 'Segunda-feira' },
  { value: 2, name: 'Terça-feira' },
  { value: 3, name: 'Quarta-feira' },
  { value: 4, name: 'Quinta-feira' },
  { value: 5, name: 'Sexta-feira' },
  { value: 6, name: 'Sábado' },
  { value: 0, name: 'Domingo' },
];

export default function ProfessionalHours() {
  const [selectedProfessionalId, setSelectedProfessionalId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<WorkHour>>({
    dayOfWeek: 1,
    startTime: '09:00:00',
    endTime: '18:00:00',
  });

  const { data: professionals = [], isLoading: loadingProfessionals } = useProfessionals();
  const { data: workHours = [], isLoading: loadingWorkHours } = useWorkHours(selectedProfessionalId);
  const createMutation = useCreateWorkHour();
  const updateMutation = useUpdateWorkHour();
  const deleteMutation = useDeleteWorkHour();

  const handleProfessionalChange = (professionalId: string) => {
    setSelectedProfessionalId(professionalId);
    setIsModalOpen(false);
    setEditingId(null);
  };

  const handleStartAdd = () => {
    setIsModalOpen(true);
    setEditingId(null);
    setFormData({
      dayOfWeek: 1,
      startTime: '09:00:00',
      endTime: '18:00:00',
    });
  };

  const handleStartEdit = (wh: WorkHour) => {
    setEditingId(wh.id!);
    setIsModalOpen(true);
    setFormData({
      id: wh.id,
      professionalId: wh.professionalId,
      dayOfWeek: wh.dayOfWeek,
      dayName: wh.dayName,
      startTime: wh.startTime,
      endTime: wh.endTime,
    });
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setEditingId(null);
    setFormData({
      dayOfWeek: 1,
      startTime: '09:00:00',
      endTime: '18:00:00',
    });
  };

  const handleSaveNew = async () => {
    if (!selectedProfessionalId) return;

    try {
      const dayName = daysOfWeek.find(d => d.value === formData.dayOfWeek)?.name || '';
      await createMutation.mutateAsync({
        professionalId: selectedProfessionalId,
        dayOfWeek: formData.dayOfWeek!,
        dayName,
        startTime: formData.startTime!,
        endTime: formData.endTime!,
      });
      handleCancel();
    } catch (error) {
      console.error('Erro ao criar horário:', error);
      alert('Erro ao criar horário de trabalho');
    }
  };

  const handleSaveEdit = async () => {
    if (!editingId) return;

    try {
      const dayName = daysOfWeek.find(d => d.value === formData.dayOfWeek)?.name || '';
      await updateMutation.mutateAsync({
        id: editingId,
        professionalId: formData.professionalId!,
        dayOfWeek: formData.dayOfWeek!,
        dayName,
        startTime: formData.startTime!,
        endTime: formData.endTime!,
      });
      handleCancel();
    } catch (error) {
      console.error('Erro ao atualizar horário:', error);
      alert('Erro ao atualizar horário de trabalho');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Tem certeza que deseja deletar este horário?')) return;

    try {
      await deleteMutation.mutateAsync(id);
    } catch (error) {
      console.error('Erro ao deletar horário:', error);
      alert('Erro ao deletar horário de trabalho');
    }
  };

  // Group work hours by day for better display
  const groupedByDay = workHours.reduce((acc, wh) => {
    if (!acc[wh.dayOfWeek]) {
      acc[wh.dayOfWeek] = [];
    }
    acc[wh.dayOfWeek].push(wh);
    return acc;
  }, {} as Record<number, WorkHour[]>);

  return (
    <div>
      <div className='flex justify-between items-center mb-4'>
        <h1 className='text-xl md:text-2xl font-bold text-gray-900'>
          Horários de Trabalho
        </h1>
      </div>

      {/* Professional selector */}
      <div className='bg-white rounded-xl shadow-sm p-4 border border-gray-100 mb-4'>
        <label className='block text-sm font-medium text-gray-700 mb-2'>
          Selecione o Profissional
        </label>
        <select
          className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500'
          value={selectedProfessionalId || ''}
          onChange={(e) => handleProfessionalChange(e.target.value)}
          disabled={loadingProfessionals}
        >
          <option value=''>Selecione...</option>
          {professionals.map((prof) => (
            <option key={prof.id} value={prof.id}>
              {prof.name}
            </option>
          ))}
        </select>
      </div>

      {/* Work hours display/edit */}
      {selectedProfessionalId && (
        <div className='bg-white rounded-xl shadow-sm p-4 border border-gray-100'>
          <div className='flex justify-between items-center mb-4'>
            <h2 className='text-lg font-semibold text-gray-900'>
              Horários Cadastrados
            </h2>
            <Button
              onClick={handleStartAdd}
              className='bg-green-600 hover:bg-green-700'
            >
              <Plus className='w-4 h-4 mr-1' />
              Adicionar Horário
            </Button>
          </div>

          {/* Work hours list */}
          {loadingWorkHours ? (
            <div className='text-center py-8 text-gray-500'>Carregando...</div>
          ) : workHours.length === 0 ? (
            <div className='text-center py-8 text-gray-500'>
              Nenhum horário cadastrado para este profissional.
              <br />
              Clique em "Adicionar Horário" para começar.
            </div>
          ) : (
            <div className='space-y-8 mb-8'>
              {daysOfWeek.map((day) => {
                const hoursForDay = groupedByDay[day.value] || [];
                if (hoursForDay.length === 0) return null;

                return (
                  <div key={day.value} className='border-b border-gray-200 pb-3'>
                    <h3 className='font-medium text-gray-900 mb-2'>{day.name}</h3>
                    <div className='space-y-2'>
                      {hoursForDay.map((wh) => (
                        <div
                          key={wh.id}
                          className='flex items-center justify-between gap-2 p-2 bg-gray-50 rounded-lg'
                        >
                          <span className='bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-sm'>
                            {wh.startTime.slice(0, 5)} - {wh.endTime.slice(0, 5)}
                          </span>
                          <div className='flex gap-1'>
                            <button
                              onClick={() => handleStartEdit(wh)}
                              className='p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition'
                              title='Editar'
                            >
                              <Edit2 className='w-4 h-4' />
                            </button>
                            <button
                              onClick={() => handleDelete(wh.id!)}
                              disabled={deleteMutation.isPending}
                              className='p-2 text-red-600 hover:bg-red-50 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed'
                              title='Deletar'
                            >
                              <Trash2 className='w-4 h-4' />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Modal Add/Edit */}
      {isModalOpen && (
        <div
          className='fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-2 sm:p-4'
          onClick={handleCancel}
        >
          <div
            className='bg-white rounded-xl shadow-lg w-full max-w-sm sm:max-w-md'
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className='flex justify-between items-center p-6 border-b border-gray-200'>
              <h2 className='text-xl font-bold text-gray-900'>
                {editingId ? 'Editar Horário' : 'Novo Horário'}
              </h2>
              <button
                onClick={handleCancel}
                className='text-gray-400 hover:text-gray-600 transition-colors'
              >
                <X size={24} />
              </button>
            </div>

            {/* Content */}
            <div className='p-6 space-y-4'>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>
                  Dia da Semana
                </label>
                <select
                  className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500'
                  value={formData.dayOfWeek}
                  onChange={(e) =>
                    setFormData({ ...formData, dayOfWeek: Number(e.target.value) })
                  }
                >
                  {daysOfWeek.map((day) => (
                    <option key={day.value} value={day.value}>
                      {day.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>
                  Horário de Início
                </label>
                <input
                  type='time'
                  className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500'
                  value={formData.startTime?.slice(0, 5) || '09:00'}
                  onChange={(e) =>
                    setFormData({ ...formData, startTime: e.target.value + ':00' })
                  }
                />
              </div>

              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>
                  Horário de Término
                </label>
                <input
                  type='time'
                  className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500'
                  value={formData.endTime?.slice(0, 5) || '18:00'}
                  onChange={(e) =>
                    setFormData({ ...formData, endTime: e.target.value + ':00' })
                  }
                />
              </div>
            </div>

            {/* Footer */}
            <div className='p-6 border-t border-gray-200 flex gap-3'>
              <button
                onClick={handleCancel}
                className='flex-1 px-4 py-2 bg-gray-100 text-gray-900 rounded-lg font-medium hover:bg-gray-200 transition-colors'
              >
                Cancelar
              </button>
              <button
                onClick={editingId ? handleSaveEdit : handleSaveNew}
                disabled={createMutation.isPending || updateMutation.isPending}
                className='flex-1 px-4 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2'
              >
                {createMutation.isPending || updateMutation.isPending ? (
                  'Salvando...'
                ) : (
                  <>
                    <Save className='w-4 h-4' />
                    Salvar
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
