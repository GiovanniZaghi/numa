import type { Registration } from "@/core/domain/entities/registration";

/** paid/pending consideram só quem tem vaga; waitlist é a fila de espera. */
export type PaymentStatusFilter = "all" | "paid" | "pending" | "waitlist";

export interface RegistrationQuery {
  eventSlug: string;
  status?: PaymentStatusFilter;
  /** Busca por nome, WhatsApp ou protocolo. */
  search?: string;
}

export interface RegistrationCounts {
  /** Todas as inscrições, incluindo a fila. */
  total: number;
  /** Inscrições que ocupam vaga (pagas + pendentes). */
  confirmed: number;
  paid: number;
  pending: number;
  waitlisted: number;
}

export interface CapacityReservation {
  registration: Registration;
  /** Posição na fila (1 = próxima), ou null se conseguiu vaga. */
  waitlistPosition: number | null;
}

export interface RegistrationRepository {
  /**
   * Grava a inscrição decidindo, de forma atômica, se ela ocupa vaga ou vai para a fila
   * (evita passar da capacidade com inscrições simultâneas).
   */
  saveWithinCapacity(registration: Registration, capacity: number): Promise<CapacityReservation>;
  update(registration: Registration): Promise<void>;
  findById(id: string): Promise<Registration | null>;
  /** Ordenado da mais recente para a mais antiga. */
  list(query: RegistrationQuery): Promise<Registration[]>;
  count(eventSlug: string): Promise<RegistrationCounts>;
}
