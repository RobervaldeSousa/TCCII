
import { useState } from "react";
import type { ServiceRequest, ServiceRequestStatus } from "../../types/serviceRequest";
import {
  CheckCircle2,
  XCircle,
  Clock,
  CalendarDays,
  MapPin,
  User,
  ClipboardList,
} from "lucide-react";

type ProviderRequestsProps = {
  email: string;
};

const statusLabels: Record<ServiceRequestStatus, string> = {
  pending: "Pendente",
  accepted: "Aceita",
  completed: "Concluída",
  rejected: "Recusada",
};

function ProviderRequests({ email }: ProviderRequestsProps) {
  const [requests, setRequests] = useState<ServiceRequest[]>(() => {
    const storedRequests = localStorage.getItem("pertodaki_requests");

    if (!storedRequests) return [];

    try {
      const parsedRequests: ServiceRequest[] = JSON.parse(storedRequests);

      return parsedRequests.filter(
        (request) =>
          request.providerEmail?.toLowerCase() === email.toLowerCase()
      );
    } catch {
      return [];
    }
  });

  const [activeFilter, setActiveFilter] =
    useState<ServiceRequestStatus | "all">("all");

  function updateRequestStatus(
    requestId: string,
    newStatus: ServiceRequestStatus
  ) {
    const storedRequests = localStorage.getItem("pertodaki_requests");

    if (!storedRequests) return;

    try {
      const allRequests: ServiceRequest[] = JSON.parse(storedRequests);

      const updatedRequests = allRequests.map((request) =>
        request.id === requestId
          ? { ...request, status: newStatus }
          : request
      );

      localStorage.setItem(
        "pertodaki_requests",
        JSON.stringify(updatedRequests)
      );

      setRequests(
        updatedRequests.filter(
          (request) =>
            request.providerEmail?.toLowerCase() === email.toLowerCase()
        )
      );
    } catch {
      alert("Não foi possível atualizar a solicitação.");
    }
  }

  const filteredRequests =
    activeFilter === "all"
      ? requests
      : requests.filter((request) => request.status === activeFilter);

  const pendingCount = requests.filter(
    (request) => request.status === "pending"
  ).length;

  return (
    <section className="mt-8 rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
      <div className="mb-6">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400">
            <ClipboardList size={24} />
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              Solicitações recebidas
            </h2>

            <p className="text-sm text-gray-500 dark:text-gray-400">
              Gerencie os pedidos de serviços dos clientes.
            </p>
          </div>
        </div>
      </div>

      <div className="mb-6 flex flex-wrap gap-2">
        {[
          { value: "all", label: "Todas" },
          { value: "pending", label: "Pendentes" },
          { value: "accepted", label: "Aceitas" },
          { value: "completed", label: "Concluídas" },
          { value: "rejected", label: "Recusadas" },
        ].map((filter) => (
          <button
            key={filter.value}
            onClick={() =>
              setActiveFilter(filter.value as ServiceRequestStatus | "all")
            }
            className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
              activeFilter === filter.value
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
            }`}
          >
            {filter.label}
          </button>
        ))}
      </div>

      <div className="mb-6 flex flex-wrap gap-4">
        <div className="rounded-xl bg-orange-50 px-4 py-3 dark:bg-orange-900/20">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Solicitações pendentes
          </p>

          <p className="mt-1 text-2xl font-bold text-orange-600 dark:text-orange-400">
            {pendingCount}
          </p>
        </div>

        <div className="rounded-xl bg-blue-50 px-4 py-3 dark:bg-blue-900/20">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Total recebido
          </p>

          <p className="mt-1 text-2xl font-bold text-blue-600 dark:text-blue-400">
            {requests.length}
          </p>
        </div>
      </div>

      {filteredRequests.length === 0 ? (
        <div className="rounded-xl border border-dashed border-gray-300 py-12 text-center dark:border-gray-700">
          <Clock
            size={40}
            className="mx-auto mb-4 text-gray-400"
          />

          <h3 className="font-semibold text-gray-900 dark:text-white">
            Nenhuma solicitação encontrada
          </h3>

          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            {activeFilter === "all"
              ? "Quando um cliente solicitar um serviço, ele aparecerá aqui."
              : "Não existem solicitações com esse status."}
          </p>
        </div>
      ) : (
        <div className="space-y-5">
          {filteredRequests.map((request) => (
            <article
              key={request.id}
              className="rounded-xl border border-gray-200 p-5 dark:border-gray-800"
            >
              <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {request.serviceName}
                  </h3>

                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    Solicitação recebida em{" "}
                    {new Date(request.createdAt).toLocaleDateString("pt-BR")}
                  </p>
                </div>

                <span
                  className={`w-fit rounded-full px-3 py-1 text-sm font-medium ${
                    request.status === "pending"
                      ? "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400"
                      : request.status === "accepted"
                      ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                      : request.status === "completed"
                      ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                      : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                  }`}
                >
                  {statusLabels[request.status]}
                </span>
              </div>

              <div className="space-y-3 text-sm text-gray-600 dark:text-gray-300">
                <div className="flex items-start gap-2">
                  <User size={18} className="mt-0.5 shrink-0" />

                  <span>
                    <strong>Cliente:</strong> {request.clientName}
                  </span>
                </div>

                <div className="flex items-start gap-2">
                  <ClipboardList size={18} className="mt-0.5 shrink-0" />

                  <div>
                    <strong>Descrição:</strong>
                    <p className="mt-1">{request.description}</p>
                  </div>
                </div>

                {request.notes && (
                  <div className="rounded-lg bg-gray-50 p-3 dark:bg-gray-800">
                    <strong>Observações:</strong>
                    <p className="mt-1">{request.notes}</p>
                  </div>
                )}

                <div className="flex items-start gap-2">
                  <MapPin size={18} className="mt-0.5 shrink-0" />

                  <span>
                    <strong>Endereço:</strong> {request.address}
                  </span>
                </div>

                <div className="flex items-start gap-2">
                  <CalendarDays size={18} className="mt-0.5 shrink-0" />

                  <span>
                    <strong>Data desejada:</strong>{" "}
                    {request.preferredDate
                      ? new Date(
                          `${request.preferredDate}T00:00:00`
                        ).toLocaleDateString("pt-BR")
                      : "Não informada"}
                  </span>
                </div>
              </div>

              {request.status === "pending" && (
                <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                  <button
                    onClick={() =>
                      updateRequestStatus(request.id, "accepted")
                    }
                    className="flex items-center justify-center gap-2 rounded-xl bg-green-600 px-4 py-3 font-medium text-white transition hover:bg-green-700"
                  >
                    <CheckCircle2 size={18} />
                    Aceitar solicitação
                  </button>

                  <button
                    onClick={() =>
                      updateRequestStatus(request.id, "rejected")
                    }
                    className="flex items-center justify-center gap-2 rounded-xl bg-red-100 px-4 py-3 font-medium text-red-700 transition hover:bg-red-200 dark:bg-red-900/30 dark:text-red-400 dark:hover:bg-red-900/50"
                  >
                    <XCircle size={18} />
                    Recusar
                  </button>
                </div>
              )}

              {request.status === "accepted" && (
                <button
                  onClick={() =>
                    updateRequestStatus(request.id, "completed")
                  }
                  className="mt-5 flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 font-medium text-white transition hover:bg-blue-700"
                >
                  <CheckCircle2 size={18} />
                  Marcar como concluída
                </button>
              )}
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

export default ProviderRequests;
