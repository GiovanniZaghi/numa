export class DomainError extends Error {
  constructor(
    message: string,
    readonly field?: string,
  ) {
    super(message);
    this.name = "DomainError";
  }
}

export class EventNotFoundError extends DomainError {
  constructor(slug: string) {
    super(`Evento "${slug}" não encontrado.`);
    this.name = "EventNotFoundError";
  }
}

export class RegistrationNotFoundError extends DomainError {
  constructor(id: string) {
    super(`Inscrição "${id}" não encontrada.`);
    this.name = "RegistrationNotFoundError";
  }
}

export class RegistrationClosedError extends DomainError {
  constructor() {
    super("As inscrições para este evento estão encerradas.");
    this.name = "RegistrationClosedError";
  }
}
