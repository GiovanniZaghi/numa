import type { Event } from "@/core/domain/entities/event";
import { money } from "@/core/domain/value-objects/money";

/** Conteúdo estático do evento. Substituível por CMS/API trocando o repositório. */
export const numaExperiencia: Omit<Event, "payment" | "contact"> = {
  slug: "numa-experiencia",
  name: "Numa Experiência",
  organizer: "Numa Club",
  tagline:
    "Um encontro de movimento, bem-estar e conexões reais para mulheres que inspiram.",
  startsAt: new Date("2026-10-31T15:00:00-03:00"),
  endsAt: new Date("2026-10-31T19:00:00-03:00"),
  location: {
    venueName: "Casarão Méa",
    street: "R. Rosa Umehara Manabe, 977",
    neighborhood: "Jardim Chácara Méa",
    city: "Suzano",
    state: "SP",
    postalCode: "08696-470",
    region: "Alto Tietê",
  },
  price: money(5999),
  capacity: 25,
  cancellationWindowHours: 48,
  manifesto:
    "Acreditamos na força da união feminina, no autocuidado consciente e em vivências que nutrem a alma. O Numa Club é um ecossistema de mulheres que buscam elevar seu estilo de vida, trocar experiências genuínas e criar memórias inesquecíveis juntas.",
  pillars: [
    {
      title: "Conexão real",
      description:
        "Espaços intimistas e selecionados para conversas profundas e networking autêntico.",
    },
    {
      title: "Bem-estar & movimento",
      description:
        "Pilates, respiração e cuidado com o corpo em um ambiente pensado em cada detalhe.",
    },
    {
      title: "Experiências únicas",
      description:
        "Oficina criativa, brunch artesanal e mimos exclusivos dos nossos parceiros.",
    },
  ],
  schedule: [
    { time: "15:00", title: "Recepção" },
    { time: "15:30", title: "Momento conexão" },
    { time: "16:00", title: "Oficina de ecobag" },
    { time: "17:00", title: "Apresentação de parceiros" },
    { time: "17:30", title: "Workshop e pilates" },
    { time: "18:00", title: "Brunch" },
    { time: "18:30", title: "Encerramento e presentes" },
  ],
  inclusions: [
    "Aula de pilates guiada",
    "Oficina de ecobag com materiais",
    "Brunch completo",
    "Cobertura de foto e vídeo",
    "Ecobag com presentes de parceiros",
  ],
  partners: [
    { name: "Lirio.u", category: "Produtos de cetim", instagram: "lirio.u", logoUrl: "/partners/lirio.u.jpg" },
    { name: "An Formulações", category: "Suplementos", instagram: "anformulacoes", logoUrl: "/partners/anformulacoes.jpg" },
    { name: "Infinisea", category: "Joias em aço inox", instagram: "useinfinisea", logoUrl: "/partners/useinfinisea.jpg" },
    { name: "Ruby Motion", category: "Moda fitness", instagram: "ruby.motion", logoUrl: "/partners/ruby.motion.jpg" },
    { name: "Lore", category: "Filmmaker e social media", instagram: "lorecriative", logoUrl: "/partners/lorecriative.jpg" },
    { name: "Thai Doces", category: "Confeitaria", instagram: "thaidocess", logoUrl: "/partners/thaidocess.jpg" },
    { name: "Antônia Decor", category: "Decoração e ambientação", instagram: "antoniadecor_", logoUrl: "/partners/antoniadecor_.jpg" },
    { name: "Papelieboss", category: "Material gráfico", instagram: "papelieboss", logoUrl: "/partners/papelieboss.jpg" },
    { name: "Cristal Flores", category: "Floricultura", instagram: "cristalfloresmogi", logoUrl: "/partners/cristalfloresmogi.jpg" },
    { name: "QualiFlores", category: "Flores e plantas", instagram: "qualifloreseplantas", logoUrl: "/partners/qualifloreseplantas.jpg" },
    { name: "Ingrid Dieguez", category: "Pilates", instagram: "ingrid_dieguez_", logoUrl: "/partners/ingrid_dieguez_.jpg" },
    { name: "Muvia Cosméticos", category: "Cosméticos capilares", instagram: "muviacosmeticos", logoUrl: "/partners/muviacosmeticos.jpg" },
    { name: "Use Arimo", category: "Tapetes de yoga", instagram: "use.arimo", logoUrl: "/partners/use.arimo.jpg" },
    { name: "Padoca do Bona", category: "Padaria", instagram: "padocadobona", logoUrl: "/partners/padocadobona.jpg" },
    { name: "Sorvesan Nagai", category: "Sorvetes", instagram: "nagaisorvesan_poa", logoUrl: "/partners/nagaisorvesan_poa.jpg" },
    { name: "Aop Rotisserie", category: "Salgados", instagram: "aop_rotisserie", logoUrl: "/partners/aop_rotisserie.jpg" },
    { name: "Casarão Méa", category: "Espaço do evento", instagram: "casaraomea", logoUrl: "/partners/casaraomea.jpg" },
    { name: "Padaria Dona Augusta", category: "Padaria", instagram: "padariadonaaugusta", logoUrl: "/partners/padariadonaaugusta.jpg" },
    { name: "Voratti Arquitetura", category: "Arquitetura e interiores", instagram: "voratti.arq", logoUrl: "/partners/voratti.arq.jpg" },
    { name: "Matriz IT", category: "Tecnologia", instagram: "matrizit", logoUrl: "/partners/matrizit.jpg" },
    { name: "E.V.A & Cia", category: "Tapetes", instagram: "evaeciaoficial", logoUrl: "/partners/evaeciaoficial.jpg" },
  ],
  dressCode: [
    {
      audience: "Para as convidadas",
      title: "Fitness e Comfy",
      description:
        "Tons de rosa e/ou branco em roupas confortáveis, para aproveitar o pilates e a tarde com liberdade.",
      palette: [
        { name: "Rosa", hex: "#e86aa6" },
        { name: "Branco", hex: "#ffffff" },
      ],
    },
  ],
  faq: [
    {
      question: "O que está incluso no ingresso?",
      answer:
        "Acesso completo à Numa Experiência: aula de pilates, oficina de customização de ecobag com materiais, brunch completo, cobertura de foto e vídeo e uma ecobag com presentes de parceiros.",
    },
    {
      question: "Preciso ter experiência em pilates?",
      answer:
        "Não! As práticas são adaptadas e guiadas para que todas aproveitem, independentemente do condicionamento físico.",
    },
    {
      question: "Posso transferir minha vaga?",
      answer:
        "Sim. Transferências ou cancelamentos devem ser comunicados com até 48 horas de antecedência do início do evento.",
    },
    {
      question: "Onde será o evento?",
      answer:
        "No Casarão Méa: R. Rosa Umehara Manabe, 977 – Jardim Chácara Méa, Suzano (SP). Veja o mapa e as rotas na seção \"Local\" desta página.",
    },
    {
      question: "Como confirmo minha inscrição?",
      answer:
        "Preencha o formulário, faça o Pix e envie o comprovante pelo WhatsApp: o botão de confirmação já abre a conversa com seus dados preenchidos.",
    },
  ],
};
