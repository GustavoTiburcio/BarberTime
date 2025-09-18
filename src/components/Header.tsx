import { Scissors } from 'lucide-react';

export default function Header() {
  return (
    <header className='bg-white shadow-sm border-b border-gray-100'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6'>
        <div className='flex items-center gap-3'>
          <div className='bg-amber-500 p-3 rounded-xl'>
            <Scissors className='w-8 h-8 text-white' />
          </div>
          <div>
            <h1 className='text-2xl font-bold text-gray-900'>BarberTime</h1>
            <p className='text-gray-600'>Agende seu horário de forma rápida e prática</p>
          </div>
        </div>
      </div>
    </header>
  )
}
