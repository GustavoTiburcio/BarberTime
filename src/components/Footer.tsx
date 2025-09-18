import { Scissors } from 'lucide-react';

export default function Footer() {
  return (
    <footer className='bg-gray-900 text-white py-12 mt-16'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='grid md:grid-cols-3 gap-8'>
          <div>
            <div className='flex items-center gap-3 mb-4'>
              <div className='bg-amber-500 p-2 rounded-lg'>
                <Scissors className='w-6 h-6 text-white' />
              </div>
              <h3 className='text-xl font-bold'>BarberShop Elite</h3>
            </div>
            <p className='text-gray-400'>
              A melhor experiência em cortes e cuidados masculinos.
              Tradição e modernidade em um só lugar.
            </p>
          </div>

          <div>
            <h4 className='text-lg font-semibold mb-4'>Horário de Funcionamento</h4>
            <div className='space-y-2 text-gray-400'>
              <p>Segunda a Sexta: 8h às 20h</p>
              <p>Sábado: 8h às 18h</p>
              <p>Domingo: 9h às 15h</p>
            </div>
          </div>

          <div>
            <h4 className='text-lg font-semibold mb-4'>Contato</h4>
            <div className='space-y-2 text-gray-400'>
              <p>📍 Rua das Barbearias, 123</p>
              <p>📞 (11) 99999-9999</p>
              <p>✉️ contato@barbershopelit.com</p>
            </div>
          </div>
        </div>

        <div className='border-t border-gray-800 pt-8 mt-8 text-center text-gray-400'>
          <p>&copy; 2025 BarberShop Elite. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
