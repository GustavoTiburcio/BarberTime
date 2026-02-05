import { Instagram } from 'lucide-react';

export default function Footer() {
  return (
    <footer className='bg-gray-900 text-white py-12 mt-16'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='grid md:grid-cols-3 gap-8'>
          <div>
            <div className='flex items-center gap-3 mb-4'>
              <div className='flex items-center justify-center w-14 h-14 bg-[#FEF2CD] rounded-full'>
            <img src='https://imagizer.imageshack.com/img924/9087/k223Hr.png' alt='Logo' className='w-15 h-15 mix-blend-multiply rounded-full' />
          </div>
              <h3 className='text-xl font-bold'>Lord”3 Barbearia</h3>
            </div>
            <p className='text-gray-400'>
              A melhor experiência em cortes.
              Tradição e modernidade em um só lugar.
            </p>
          </div>

          <div>
            <h4 className='text-lg font-semibold mb-4'>Horário de Funcionamento</h4>
            <div className='space-y-2 text-gray-400'>
              <p>Segunda a Sexta: 9h às 20h</p>
              <p>Sábado e Feriado: 9h às 20h</p>
            </div>
          </div>

          <div>
            <h4 className='text-lg font-semibold mb-4'>Contato</h4>
            <div className='space-y-2 text-gray-400'>
              <p>📍 Av. Aurora Rinck Vignoto n. 399</p>
              <p>📞 (44) 9 9176-3121</p>
              <p> <Instagram className='inline-block' /> @lord3_barbearia</p>
            </div>
          </div>
        </div>

        <div className='border-t border-gray-800 pt-8 mt-8 text-center text-gray-400'>
          <p>&copy; 2026 Lord”3 Barbearia. Desenvolvido por Gustavo Tiburcio.</p>
        </div>
      </div>
    </footer>
  )
}
