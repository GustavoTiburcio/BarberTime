import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';
import { useLogin } from '../hooks/useLogin';
import { AxiosError } from 'axios';

// Schema de validação com Zod
const loginSchema = z.object({
  username: z
    .string()
    .min(1, 'Usuário é obrigatório'),
  password: z
    .string()
    .min(1, 'Senha é obrigatória'),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function Login() {
  const navigate = useNavigate();
  const { mutate: login, isPending, isError, error } = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginFormData) => {
    login(data, {
      onSuccess: () => {
        navigate('/dashboard');
      },
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center justify-center w-24 h-24 bg-[#FEF2CD] rounded-full">
            <img
              src='https://imagizer.imageshack.com/img924/9087/k223Hr.png'
              alt='Logo'
              className='w-20 h-20 mix-blend-multiply rounded-full'
            />
          </div>
        </div>

        <h1 className="text-3xl font-bold text-center text-gray-900 mb-2">
          Lord'3 Barber
        </h1>
        <p className="text-center text-gray-600 text-sm mb-8">
          Agende seu horário de forma rápida e prática
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Error Message */}
          {isError && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-700">
                {error instanceof AxiosError ? error.response?.data?.error || 'Erro ao fazer login. Tente novamente.' : error instanceof Error ? error.message : 'Erro ao fazer login. Tente novamente.'}
              </p>
            </div>
          )}

          {/* Username Field */}
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
              Usuário
            </label>
            <input
              id="username"
              type="text"
              placeholder="Digite seu usuário"
              disabled={isPending}
              {...register('username')}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition disabled:bg-gray-100 disabled:cursor-not-allowed ${errors.username
                  ? 'border-red-500 focus:ring-red-200'
                  : 'border-gray-300 focus:ring-yellow-200 focus:border-yellow-400'
                }`}
            />
            {errors.username && (
              <p className="mt-2 text-sm text-red-600">
                {errors.username.message}
              </p>
            )}
          </div>

          {/* Password Field */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Senha
            </label>
            <input
              id="password"
              type="password"
              placeholder="Digite sua senha"
              disabled={isPending}
              {...register('password')}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition disabled:bg-gray-100 disabled:cursor-not-allowed ${errors.password
                  ? 'border-red-500 focus:ring-red-200'
                  : 'border-gray-300 focus:ring-yellow-200 focus:border-yellow-400'
                }`}
            />
            {errors.password && (
              <p className="mt-2 text-sm text-red-600">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isPending}
            className="w-full text-white font-medium py-2 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isPending ? 'Entrando...' : 'Entrar'}
          </Button>
        </form>

        <p className="text-center text-gray-600 text-sm mt-6">
          Ainda não tem conta?{' '}
          <a href="#" className="text-gray-900 hover:underline font-medium">
            Criar conta
          </a>
        </p>
      </div>
    </div>
  );
}
