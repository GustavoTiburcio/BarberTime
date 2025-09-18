import { useState } from "react";
import { professionals } from "../mocks";
import { Button } from "../components/Button";
import { Modal} from "../components/Modal";
import { z } from "zod";
import { Professional } from '../types';

const professionalSchema = z.object({
  name: z.string().min(1, "Nome obrigatório"),
  avatar: z.optional(z.string().min(1, "Imagem obrigatória")),
  rating: z.number().min(0).max(5),
  specialties: z.string().min(1),
});

export default function Professionals() {
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProfessional, setEditingProfessional] = useState<Professional | null>(null);

  const handleEdit = (prof: Professional) => {
    setEditingProfessional(prof);
    setModalOpen(true);
  };

  const handleSubmit = async (data: Professional) => {
    if (editingProfessional) {
      console.log("Atualizando profissional:", data);
    } else {
      console.log("Novo profissional:", data);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl md:text-2xl font-bold text-gray-900">
          Profissionais
        </h1>
        <Button onClick={() => { setEditingProfessional(null); setModalOpen(true); }}>
          Novo
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {professionals.map((prof) => (
          <div
            key={prof.id}
            className="bg-white rounded-xl shadow-sm p-4 border border-gray-100"
          >
            <div className="flex items-center gap-3 mb-3">
              <img
                src={prof.avatar}
                alt={prof.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <h4 className="font-medium text-gray-900">{prof.name}</h4>
                <p className="text-sm text-gray-600">
                  ⭐ {prof.rating.toFixed(1)}
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-1">
              {prof.specialties.map((spec) => (
                <span
                  key={spec}
                  className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                >
                  {spec}
                </span>
              ))}
            </div>
            <Button className="mt-3" onClick={() => handleEdit(prof)}>
              Editar
            </Button>
          </div>
        ))}
      </div>

      <Modal
        title={editingProfessional ? "Editar Profissional" : "Novo Profissional"}
        schema={professionalSchema}
        defaultValues={editingProfessional ?? undefined}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
