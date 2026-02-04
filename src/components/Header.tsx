export default function Header() {
  return (
    <header className='bg-white shadow-sm border-b border-gray-100'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6'>
        <div className='flex items-center gap-3'>
          <div className='flex items-center justify-center w-14 h-14 bg-[#FEF2CD] rounded-full'>
            <img src='https://imagizer.imageshack.com/img924/9087/k223Hr.png' alt='Logo' className='w-15 h-15 mix-blend-multiply rounded-full' />
          </div>
          <div>
            <h1 className='text-2xl font-bold text-gray-900'>Lord”3 Barbearia</h1>
            <p className='text-gray-600'>Agende seu horário de forma rápida e prática</p>
          </div>
        </div>
      </div>
    </header>
  )
}
