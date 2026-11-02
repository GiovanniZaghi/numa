import { fullAddress, type Event } from "@/core/domain/entities/event";

export interface NavItem {
  label: string;
  href: string;
}

/** Menu da landing: só lista as seções que esta edição realmente exibe. */
export function buildNavigation(event: Event): NavItem[] {
  const items: (NavItem | false)[] = [
    { label: "Manifesto", href: "#sobre" },
    event.highlights.length > 0 && { label: "O evento", href: "#detalhes" },
    event.schedule.length > 0 && { label: "Programação", href: "#cronograma" },
    event.partners.length > 0 && { label: "Parceiros", href: "#parceiros" },
    event.dressCode.length > 0 && { label: "Dress code", href: "#dresscode" },
    fullAddress(event.location) !== null && { label: "Local", href: "#local" },
    event.faq.length > 0 && { label: "Dúvidas", href: "#faq" },
  ];
  return items.filter((item): item is NavItem => Boolean(item));
}

export const registrationAnchor = "#inscricao";

export const instagram = {
  handle: "@numa.club__",
  username: "numa.club__",
} as const;
