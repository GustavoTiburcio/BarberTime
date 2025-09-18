import { Controller, UseFormReturn } from 'react-hook-form';
import { Phone, User as UserIcon, Calendar as CalendarIcon } from 'lucide-react';
import { Input } from './Input';
import { Button } from './Button';

interface BookingFormProps {
  form: UseFormReturn<{
    clientName: string;
    clientPhone: string;
    date: string;
    time: string;
    serviceId: string;
    professionalId: string;
  }, unknown, {
    clientName: string;
    clientPhone: string;
    date: string;
    time: string;
    serviceId: string;
    professionalId: string;
  }>;
  onSubmit: (e: React.FormEvent) => void;
}


export function BookingForm({ form, onSubmit }: BookingFormProps) {

  return (
    <div id='booking-form' className='bg-white p-6 rounded-xl shadow-sm border border-gray-100'>
      <h3 className='text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2'>
        <CalendarIcon className='w-5 h-5 text-amber-500' />
        Confirmar Agendamento
      </h3>

      <form
        onSubmit={onSubmit}
        className='space-y-4'
      >
        <Controller
          control={form.control}
          name='clientName'
          render={({ field, fieldState }) => (
            <Input
              label='Nome Completo*'
              placeholder='Digite seu nome completo'
              value={field.value}
              icon={<UserIcon />}
              onChange={field.onChange}
              error={fieldState.error?.message}
            />
          )}
        />

        <Controller
          control={form.control}
          name='clientPhone'
          render={({ field, fieldState }) => (
            <Input
              label='Celular*'
              placeholder='Digite seu celular'
              value={field.value}
              icon={<Phone />}
              mask='(99) 99999-9999'
              onChange={field.onChange}
              error={fieldState.error?.message}
            />
          )}
        />

        <Button
          type='submit'
        >
          Confirmar Agendamento
        </Button>
        {Object.keys(form.formState.errors).length > 0 &&
          Object.entries(form.formState.errors).map(([key, error]) => {
            if (key !== 'clientPhone' && key !== 'clientName') {
              return (
                <div key={key} className='text-red-500 text-sm mt-2'>
                  -{error.message}
                </div>
              );
            }
          })}
      </form>
    </div>
  );
}
