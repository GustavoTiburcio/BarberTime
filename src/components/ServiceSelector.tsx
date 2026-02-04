import { Scissors, Clock } from 'lucide-react';
import { services } from '../mocks';

interface ServiceSelectorProps {
  selectedService: string;
  onServiceSelect: (serviceId: string) => void;
}

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
                <span>R$ {service.price.toFixed(2)}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}