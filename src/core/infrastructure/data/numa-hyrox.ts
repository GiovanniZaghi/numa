import type { Event } from "@/core/domain/entities/event";
import { money } from "@/core/domain/value-objects/money";
import { numaExperiencia } from "./numa-experiencia";

/** Edição atual da landing page. */
export const numaHyrox: Omit<Event, "payment" | "contact"> = {
  slug: "numa-hyrox",
  name: "Numa Experiência: Edição Hyrox",
  edition: "Edição Hyrox 🏋️‍♀️🔥",
  organizer: "Numa Club",
  tagline:
    "O desafio que faltava na sua rotina. Treino intenso, comunidade e muita adrenalina para fechar a manhã.",
  startsAt: new Date("2026-11-07T10:30:00-03:00"),
  endsAt: null,
  location: {
    venueName: "Arena Polux",
    street: "Rua Benjamin Constant, 1733",
    neighborhood: "Jardim Carlos Cooper",
    city: "Suzano",
    state: "SP",
    postalCode: "08674-011",
    region: "Alto Tietê",
  },
  price: money(2000),
  capacity: 50,
  ctaLabel: "Garantir minha vaga 🏃‍♂️💨",
  cancellationWindowHours: 48,
  // Manifesto é do clube, igual em todas as edições.
  manifesto: numaExperiencia.manifesto,
  manifestoNote:
    "Nesta edição o convite é para todo mundo: o aulão de Hyrox é misto, aberto para homens e mulheres. Traga quem treina com você!",
  pillars: [
    {
      title: "Hyrox",
      description: "Aulão intenso e adaptado para todos os níveis, do iniciante ao avançado.",
    },
    {
      title: "Brunch",
      description: "Depois do treino, um brunch para recarregar as energias e trocar ideia com a galera.",
    },
    {
      title: "Sorteios",
      description: "Brindes irados sorteados entre quem estiver presente no evento.",
    },
  ],
  highlights: [
    {
      emoji: "🏋️‍♀️",
      title: "Aulão de Hyrox misto",
      description: "Para homens e mulheres. Treino intenso e adaptado para todos os níveis, do iniciante ao avançado.",
    },
    {
      emoji: "📸",
      title: "Cobertura completa",
      description: "Fotos e vídeos profissionais para você garantir aquele registro incrível do treino.",
    },
    {
      emoji: "🎁",
      title: "Sorteios",
      description: "Vai rolar sorteio de brindes irados para a galera presente durante o evento!",
    },
  ],
  inclusions: [
    "Aulão de Hyrox misto, para todos os níveis",
    "Cobertura de fotos e vídeos profissionais",
    "Sorteio de brindes durante o evento",
  ],
  // Seções sem conteúdo nesta edição ficam ocultas no site.
  schedule: [],
  partners: [],
  dressCode: [],
  faq: [
    {
      question: "Preciso ter experiência prévia com Hyrox?",
      answer: "Não! O aulão é adaptado para todos os níveis, do iniciante ao avançado.",
    },
    {
      question: "O que eu devo levar?",
      answer: "Roupa de treino, tênis adequado, garrafinha de água e muita disposição.",
    },
    {
      question: "Onde será o evento?",
      answer:
        "Na Arena Polux: Rua Benjamin Constant, 1733 – Jardim Carlos Cooper, Suzano (SP). Veja o mapa e as rotas na seção \"Local\" desta página.",
    },
    {
      question: "Posso transferir minha vaga?",
      answer:
        "Sim. Transferências ou cancelamentos devem ser comunicados com até 48 horas de antecedência do início do evento.",
    },
    {
      question: "Como confirmo minha inscrição?",
      answer:
        "Preencha o formulário, faça o Pix e envie o comprovante pelo WhatsApp: o botão de confirmação já abre a conversa com seus dados preenchidos.",
    },
  ],
};
