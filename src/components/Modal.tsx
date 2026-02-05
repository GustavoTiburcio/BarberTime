import { useEffect } from 'react';
import { ZodType } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from './Button';
import { Professional, Service } from '../types';

interface ModalProps<T> {
  title: string;
  schema: ZodType<T>;
  defaultValues?: Professional | Service;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: T) => Promise<void>;
}

export function Modal<T>({
  title,
  schema,
  defaultValues,
  isOpen,
  onClose,
  onSubmit,
}: ModalProps<T>) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<T>({
    resolver: zodResolver(schema as any),
    defaultValues: defaultValues as Partial<T> | undefined,
  });

  // Resetar formulário quando abrir modal
  useEffect(() => {
    if (isOpen) reset(defaultValues as any);
  }, [isOpen, defaultValues, reset]);

  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 bg-black/50 flex items-center justify-center z-50'>
      <div className='bg-white p-6 rounded-xl w-full max-w-md shadow-lg relative'>
        <h2 className='text-xl font-bold mb-4'>{title}</h2>

        <form
          className='flex flex-col gap-4'
          onSubmit={handleSubmit(async (data) => {
            await onSubmit(data);
            onClose();
          })}
        >
          {Object.keys(schema.shape).map((field) => (
            <div key={field} className='flex flex-col'>
              <label className='text-gray-700 font-medium capitalize'>
                {field}
              </label>
              <input
                type='text'
                {...register(field as keyof T)}
                disabled={isSubmitting}
                className='border border-gray-300 rounded-lg p-2 disabled:bg-gray-100 disabled:cursor-not-allowed'
              />
              {errors[field as keyof T] && (
                <span className='text-red-500 text-sm'>
                  {errors[field as keyof T]?.message?.toString()}
                </span>
              )}
            </div>
          ))}

          <div className='flex justify-end gap-2 mt-4'>
            <Button type='button' color='gray' onClick={onClose}>
              Cancelar
            </Button>
            <Button type='submit' loading={isSubmitting}>
              Salvar
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
