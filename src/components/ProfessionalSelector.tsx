import { User, Star } from 'lucide-react';
import { Professional } from '../types';

interface ProfessionalSelectorProps {
  selectedProfessional: string;
  onProfessionalSelect: (professionalId: string) => void;
}

const professionals: Professional[] = [
  {
    id: '1',
    name: 'Carlos Silva',
    avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400',
    specialties: ['Corte Tradicional', 'Barba Clássica'],
    rating: 4.9
  },
  {
    id: '2',
    name: 'Roberto Santos',
    avatar: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=400',
    specialties: ['Corte Moderno', 'Degradê'],
    rating: 4.8
  },
  {
    id: '3',
    name: 'Diego Ferreira',
    avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=400',
    specialties: ['Barba Completa', 'Tratamentos'],
    rating: 4.7
  },
  {
    id: '4',
    name: 'André Costa',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400',
    specialties: ['Combo Completo', 'Corte Infantil'],
    rating: 4.9
  }
];

export function ProfessionalSelector({ selectedProfessional, onProfessionalSelect }: ProfessionalSelectorProps) {
  return (
    <div id='professional-selector' className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
        <User className="w-5 h-5 text-amber-500" />
        Escolha o Profissional
      </h3>
      <div className="grid md:grid-cols-2 gap-4">
        {professionals.map(professional => (
          <div
            key={professional.id}
            onClick={() => onProfessionalSelect(professional.id)}
            className={`
              p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 hover:shadow-md
              ${selectedProfessional === professional.id
                ? 'border-amber-500 bg-amber-50 shadow-lg scale-[1.02]'
                : 'border-gray-200 hover:border-gray-300'
              }
            `}
          >
            <div className="flex items-center gap-3 mb-3">
              <img
                src={professional.avatar}
                alt={professional.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <h4 className="font-medium text-gray-900">{professional.name}</h4>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span className="text-sm text-gray-600">{professional.rating}</span>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap gap-1">
              {professional.specialties.map(specialty => (
                <span
                  key={specialty}
                  className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                >
                  {specialty}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}