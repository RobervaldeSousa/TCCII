
import type { ServiceRequest } from "../types/request";

const STORAGE_KEY = "pertodaki_requests";

export function getRequests(): ServiceRequest[] {
  try {
    const savedRequests = localStorage.getItem(STORAGE_KEY);

    if (!savedRequests) {
      return [];
    }

    return JSON.parse(savedRequests) as ServiceRequest[];
  } catch (error) {
    console.error("Erro ao recuperar solicitações:", error);
    return [];
  }
}

export function saveRequests(
  requests: ServiceRequest[],
): void {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(requests),
  );
}

export function addRequest(
  request: ServiceRequest,
): void {
  const requests = getRequests();

  saveRequests([...requests, request]);
}

export function updateRequestStatus(
  requestId: string,
  status: ServiceRequest["status"],
): void {
  const requests = getRequests();

  const updatedRequests = requests.map((request) =>
    request.id === requestId
      ? { ...request, status }
      : request,
  );

  saveRequests(updatedRequests);
}