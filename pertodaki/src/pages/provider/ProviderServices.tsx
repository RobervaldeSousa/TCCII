
import { useState } from "react";
import type { FormEvent } from "react";
import { Pencil, Plus, Trash2, Briefcase, X } from "lucide-react";

type ProviderService = {
  id: string;
  name: string;
  description: string;
  price: string;
};

type ProviderServicesProps = {
  email: string;
};

function ProviderServices({ email }: ProviderServicesProps) {
  const storageKey = `pertodaki_services_${email.toLowerCase()}`;

  const [services, setServices] = useState<ProviderService[]>(() => {
    const storedServices = localStorage.getItem(storageKey);

    if (!storedServices) return [];

    try {
      return JSON.parse(storedServices) as ProviderService[];
    } catch {
      return [];
    }
  });

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [error, setError] = useState("");

  function saveServices(updatedServices: ProviderService[]) {
    setServices(updatedServices);
    localStorage.setItem(storageKey, JSON.stringify(updatedServices));
  }

  function resetForm() {
    setName("");
    setDescription("");
    setPrice("");
    setEditingId(null);
    setError("");
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (!name.trim() || !description.trim() || !price.trim()) {
      setError("Preencha todos os campos.");
      return;
    }

    const parsedPrice = Number(price.replace(",", "."));

    if (!Number.isFinite(parsedPrice) || parsedPrice < 0) {
      setError("Informe um preço válido.");
      return;
    }

    const formattedPrice = parsedPrice.toFixed(2);

    if (editingId) {
      const updatedServices = services.map((service) =>
        service.id === editingId
          ? {
              ...service,
              name: name.trim(),
              description: description.trim(),
              price: formattedPrice,
            }
          : service
      );

      saveServices(updatedServices);
    } else {
      const newService: ProviderService = {
        id: crypto.randomUUID(),
        name: name.trim(),
        description: description.trim(),
        price: formattedPrice,
      };

      saveServices([...services, newService]);
    }

    resetForm();
  }

  function handleEdit(service: ProviderService) {
    setName(service.name);
    setDescription(service.description);
    setPrice(service.price);
    setEditingId(service.id);
    setError("");
  }

  function handleDelete(id: string) {
    const updatedServices = services.filter((service) => service.id !== id);

    saveServices(updatedServices);

    if (editingId === id) {
      resetForm();
    }
  }

  return (
    <section className="mt-8 rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
          Meus serviços
        </h2>

        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Cadastre e gerencie os serviços que você oferece.
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
            Nome do serviço
          </label>

          <input
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Ex.: Instalação elétrica"
            className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none focus:border-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
            Descrição
          </label>

          <textarea
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            placeholder="Descreva o serviço que você oferece..."
            rows={3}
            className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none focus:border-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
            Preço estimado (R$)
          </label>

          <input
            type="text"
            inputMode="decimal"
            value={price}
            onChange={(event) => setPrice(event.target.value)}
            placeholder="Ex.: 150,00"
            className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none focus:border-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
          />
        </div>

        {error && (
          <p className="text-sm text-red-500">
            {error}
          </p>
        )}

        <div className="flex flex-wrap gap-3">
          <button
            type="submit"
            className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-medium text-white transition hover:bg-blue-700"
          >
            <Plus size={18} />
            {editingId ? "Salvar alterações" : "Cadastrar serviço"}
          </button>

          {editingId && (
            <button
              type="button"
              onClick={resetForm}
              className="flex items-center gap-2 rounded-xl bg-gray-100 px-5 py-3 font-medium text-gray-700 transition hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300"
            >
              <X size={18} />
              Cancelar edição
            </button>
          )}
        </div>
      </form>

      {/* Service list */}
      <div className="mt-8 border-t border-gray-200 pt-6 dark:border-gray-800">
        <h3 className="mb-4 font-semibold text-gray-900 dark:text-white">
          Serviços cadastrados ({services.length})
        </h3>

        {services.length === 0 ? (
          <div className="rounded-xl bg-gray-50 p-6 text-center dark:bg-gray-800/50">
            <Briefcase
              size={32}
              className="mx-auto mb-3 text-gray-400"
            />

            <p className="text-gray-600 dark:text-gray-400">
              Você ainda não cadastrou nenhum serviço.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {services.map((service) => (
              <div
                key={service.id}
                className="rounded-xl border border-gray-200 p-4 dark:border-gray-800"
              >
                <div className="flex flex-col justify-between gap-4 sm:flex-row">
                  <div className="min-w-0">
                    <h4 className="font-semibold text-gray-900 dark:text-white">
                      {service.name}
                    </h4>

                    <p className="mt-2 break-words text-sm text-gray-600 dark:text-gray-400">
                      {service.description}
                    </p>

                    <p className="mt-3 font-medium text-blue-600 dark:text-blue-400">
                      R$ {Number(service.price).toLocaleString("pt-BR", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </p>
                  </div>

                  <div className="flex shrink-0 gap-2">
                    <button
                      type="button"
                      onClick={() => handleEdit(service)}
                      aria-label={`Editar ${service.name}`}
                      className="rounded-lg p-3 text-blue-600 transition hover:bg-blue-50 dark:hover:bg-blue-900/20"
                    >
                      <Pencil size={18} />
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDelete(service.id)}
                      aria-label={`Excluir ${service.name}`}
                      className="rounded-lg p-3 text-red-600 transition hover:bg-red-50 dark:hover:bg-red-900/20"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default ProviderServices;
