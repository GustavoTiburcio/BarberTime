import { useState, ChangeEvent } from 'react';
import { cn } from '../utils';

interface IInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  mask?: string;
  label?: string;
  append?: string;
  icon?: React.ReactNode;
  error?: string;
}

export function Input({ className, mask, onChange, label, icon, append, error, value, ...props }: IInputProps) {
  const [maskedValue, setMaskedValue] = useState('');

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const text = e.target.value;
    const val = mask ? applyMask(text, mask) : text;
    setMaskedValue(val);
    onChange?.({
      ...e,
      target: { ...e.target, value: val }
    } as React.ChangeEvent<HTMLInputElement>);
  }

  return (
    <div className="flex flex-col gap-2">
      {label && <label className="text-base font-medium text-gray-700">{label}</label>}

      <div className="flex gap-2">
        <div className="relative flex-1">
          {icon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">
              {icon}
            </div>
          )}
          <input
            className={cn(
              'h-[52px] w-full border border-gray-400 rounded-[10px] text-gray-700 placeholder:text-gray-400 focus:border-gray-800 focus:outline-none transition',
              icon && 'pl-10', // adiciona padding à esquerda quando tem ícone
              !!error && 'border-red-500',
              className
            )}
            value={mask ? maskedValue : value}
            onChange={handleChange}
            {...props}
          />
        </div>

        {append && (
          <div className="h-[52px] w-[52px] flex items-center justify-center rounded-[10px] bg-gray-200">
            <span className="text-base text-gray-700">{append}</span>
          </div>
        )}
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
}

function applyMask(value: string, mask: string): string {
  const cleanValue = value.replace(/\D/g, '');
  let result = '';
  let j = 0;

  for (let i = 0; i < mask.length && j < cleanValue.length; i++) {
    if (mask[i] === '9') {
      result += cleanValue[j++];
    } else {
      result += mask[i];
    }
  }

  return result;
}