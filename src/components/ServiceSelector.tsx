import { Scissors, Clock } from 'lucide-react';
import { Service } from '../types';

interface ServiceSelectorProps {
  selectedService: string;
  onServiceSelect: (serviceId: string) => void;
}

const services: Service[] = [
  {
    id: '1',
    name: 'Corte Tradicional',
    duration: 30,
    price: 25,
    description: 'Corte clássico com acabamento a navalha'
  },
  {
    id: '2',
    name: 'Corte + Barba',
    duration: 45,
    price: 40,
    description: 'Corte completo com barba aparada e acabamento'
  },
  {
    id: '3',
    name: 'Barba Completa',
    duration: 30,
    price: 20,
    description: 'Aparar e modelar a barba com produtos premium'
  },
  {
    id: '4',
    name: 'Corte Moderno',
    duration: 40,
    price: 35,
    description: 'Cortes modernos com técnicas atualizadas'
  },
  {
    id: '5',
    name: 'Tratamento Capilar',
    duration: 60,
    price: 50,
    description: 'Hidratação e tratamento completo dos cabelos'
  },
  {
    id: '6',
    name: 'Combo Completo',
    duration: 90,
    price: 70,
    description: 'Corte, barba, sobrancelha e tratamento'
  }
];

export function ServiceSelector({ selectedService, onServiceSelect }: ServiceSelectorProps) {
  return (
    <div id='service-selector' className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
        <Scissors className="w-5 h-5 text-amber-500" />
        Selecione o Serviço
      </h3>
      <div className="grid md:grid-cols-2 gap-4">
        {services.map(service => (
          <div
            key={service.id}
            onClick={() => onServiceSelect(service.id)}
            className={`
              p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 hover:shadow-md
              ${selectedService === service.id
                ? 'border-amber-500 bg-amber-50 shadow-lg scale-[1.02]'
                : 'border-gray-200 hover:border-gray-300'
              }
            `}
          >
            <h4 className="font-medium text-gray-900 mb-2">{service.name}</h4>
            <p className="text-sm text-gray-600 mb-3">{service.description}</p>
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-1 text-gray-500">
                <Clock className="w-4 h-4" />
                <span>{service.duration}min</span>
              </div>
              <div className="flex items-center gap-1 font-semibold text-amber-600">
                <span>R$ {service.price}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}