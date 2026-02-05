import { useState } from "react";
import { z } from "zod";

import { Button } from "../components/Button";
import { Modal } from "../components/Modal";

import { Service } from '../types';
import { useServices } from '../hooks/useServices';
import { useCreateService } from '../hooks/useCreateService';
import { useUpdateService } from '../hooks/useUpdateService';

const serviceSchema = z.object({
  name: z.string().min(1, "Nome obrigatório"),
  description: z.string().min(1, "Descrição obrigatória"),
  duration: z.coerce.number().min(1, "Duração inválida"),
  price: z.coerce.number().min(1, "Preço inválido"),
});

export default function Services() {
  const [modalOpen, setModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const { data: services = [], isLoading } = useServices();
  const createMutation = useCreateService();
  const updateMutation = useUpdateService();

  const handleEdit = (service: Service) => {
    setEditingService(service);
    setModalOpen(true);
  };

  const handleSubmit = async (data: Service) => {
    if (editingService) {
      await updateMutation.mutateAsync({ ...data, id: editingService.id });
      setModalOpen(false);
      setEditingService(null);
    } else {
      await createMutation.mutateAsync(data);
      setModalOpen(false);
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
        {isLoading
          ? Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-xl shadow-sm p-4 border border-gray-100 animate-pulse"
              >
                <div className="h-6 bg-gray-200 rounded w-1/2 mb-3" />
                <div className="h-4 bg-gray-200 rounded w-full mb-2" />
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-4" />
                <div className="mt-3 h-8 bg-gray-200 rounded w-24" />
              </div>
            ))
          : services.map((service) => (
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
