
export type RequestStatus =
  | "Pendente"
  | "Aceita"
  | "Em andamento"
  | "Concluída"
  | "Cancelada";

export interface ServiceRequest {
  id: string;
  professionalId: number;
  professionalName: string;
  profession: string;
  description: string;
  address: string;
  preferredDate: string;
  notes: string;
  status: RequestStatus;
  createdAt: string;
}
