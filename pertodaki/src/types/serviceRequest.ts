
export type ServiceRequestStatus =
  | "pending"
  | "accepted"
  | "completed"
  | "rejected";

export type ServiceRequest = {
  id: string;
  clientName: string;
  clientEmail: string;
  providerName: string;
  providerEmail: string;
  professionalId: number;
  serviceName: string;
  description: string;
  preferredDate: string;
  preferredTime: string;
  address: string;
  status: ServiceRequestStatus;
  createdAt: string;
};
