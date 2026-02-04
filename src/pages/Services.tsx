import { useState } from "react";
import { services } from "../mocks";
import { Button } from "../components/Button";
import { Modal } from "../components/Modal";
import { z } from "zod";
import { Service } from '../types';

const serviceSchema = z.object({
  name: z.string().min(1, "Nome obrigatório"),
  description: z.string().min(1, "Descrição obrigatória"),
  duration: z.number().min(1, "Duração inválida"),
  price: z.number().min(1, "Preço inválido"),
});

export default function Services() {
  const [modalOpen, setModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);

  const handleEdit = (service: Service) => {
    setEditingService(service);
    setModalOpen(true);
  };

  const handleSubmit = async (data: Service) => {
    if (editingService) {
      console.log("Atualizando serviço:", data);
    } else {
      console.log("Novo serviço:", data);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl md:text-2xl font-bold text-gray-900">
          Serviços
        </h1>
        <Button onClick={() => { setEditingService(null); setModalOpen(true); }}>
          Novo
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {services.map((service) => (
          <div
            key={service.id}
            className="bg-white rounded-xl shadow-sm p-4 border border-gray-100"
          >
            <h4 className="font-medium text-gray-900">{service.name}</h4>
            <p className="text-sm text-gray-600 mb-2">{service.description}</p>
            <p className="text-sm text-gray-800 font-semibold">
              ⏱ {service.duration} min • R$ {service.price}
            </p>
            <Button
              className="mt-3"
              onClick={() => handleEdit(service)}
            >
              Editar
            </Button>
          </div>
        ))}
      </div>

      <Modal
        title={editingService ? "Editar Serviço" : "Novo Serviço"}
        schema={serviceSchema}
        defaultValues={editingService ?? undefined}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
