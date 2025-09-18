import { cn } from '../utils';
import { Loader2 } from 'lucide-react'; // Ícone de loading opcional

interface IButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  size?: 'default' | 'icon';
  color?: 'default' | 'gray' | 'white' | 'dark';
}

export function Button({
  children,
  className,
  loading,
  disabled,
  size = 'default',
  color = 'default',
  ...props
}: IButtonProps) {
  const isChildrenString = typeof children === 'string';

  const childEl = !isChildrenString ? (
    children
  ) : (
    <span className="text-base font-medium w-full text-center">{children}</span>
  );

  return (
    <div className={cn('rounded-xl overflow-hidden', className)}>
      <button
        className={cn(
          'flex items-center justify-center transition-all disabled:opacity-40 duration-200 hover:shadow-lg disabled:shadow-none disabled:active:scale-100 active:scale-95',
          color === 'default' && 'bg-amber-500 hover:bg-amber-600 transition-colors text-white',
          color === 'gray' && 'bg-gray-300 hover:bg-gray-400 text-gray-800 transition-colors',
          color === 'white' && 'bg-white hover:bg-gray-100 text-gray-600 border border-gray-200 transition-colors',
          color === 'dark' && 'bg-lime-500/5 hover:bg-lime-500/10 text-gray-900 transition-colors',
          size === 'default' && 'w-full px-6 py-3 min-h-[52px] rounded-xl',
          size === 'icon' && 'size-12 rounded-full',
        )}
        disabled={disabled ?? loading}
        {...props}
      >
        {loading ? (
          <Loader2 className="animate-spin w-5 h-5" />
        ) : (
          childEl
        )}
      </button>
    </div>
  );
}
