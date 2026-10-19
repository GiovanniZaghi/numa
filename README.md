# Numa Club — Landing Page

Next.js 16 (App Router) + TypeScript + Tailwind CSS v4, organizado em Clean Architecture.

```bash
cp .env.example .env.local   # preencha WHATSAPP_NUMBER e PIX_KEY
npm run dev                  # http://localhost:3000
npm run build && npm start
npm run lint && npm run typecheck
```

## Painel de inscrições

Cada inscrição confirmada no formulário é gravada no PostgreSQL. Em `/dashboard` (protegido por senha) a
organização vê todas as inscrições, marca **Pago** após conferir o comprovante e exporta um **PDF com as pagas**.

```bash
# 1. Preencha no .env.local: DATABASE_URL, ADMIN_PASSWORD e SESSION_SECRET
# 2. Crie as tabelas no banco
npm run db:migrate
# 3. Acesse http://localhost:3000/login
```

Se o schema mudar (`src/core/infrastructure/database/schema.ts`): `npm run db:generate` e depois `npm run db:migrate`.

## Estrutura de Diretórios

```
src/
├── app/                              # Camada de apresentação (Next.js)
│   ├── actions/
│   │   └── registration.ts           # registerAttendeeAction (Server Action → use case)
│   ├── globals.css                   # Tokens de design (@theme) + utilitários
│   ├── icon.svg                      # Favicon
│   ├── layout.tsx                    # Root layout (fontes, Toaster, metadata)
│   └── page.tsx                      # Landing page (Server Component) + JSON-LD
├── components/
│   ├── landing/                      # Seções da LP
│   │   ├── registration/             # Formulário, chave Pix e seção de inscrição
│   │   ├── hero-section.tsx          # Hero + ingresso + countdown
│   │   ├── manifesto-section.tsx
│   │   ├── schedule-section.tsx      # Timeline da programação
│   │   ├── partners-section.tsx      # Marquee + grid de parceiros
│   │   ├── dress-code-section.tsx
│   │   ├── faq-section.tsx
│   │   ├── site-header.tsx / site-footer.tsx / mobile-cta.tsx
│   │   ├── navigation.ts             # Âncoras do menu e links sociais
│   │   └── reveal.tsx                # Animação de entrada (IntersectionObserver)
│   └── ui/                           # Design system (Button, Input, Field, Checkbox, ícones…)
├── core/                             # Regras de negócio, sem dependência de framework
│   ├── domain/                       # Entidades, value objects e erros (TS puro)
│   │   ├── entities/                 # Event, Registration (+ regras de criação)
│   │   ├── value-objects/            # Money, Phone
│   │   └── errors.ts
│   ├── application/                  # Casos de uso + portas (interfaces)
│   │   ├── dtos/                     # Validação de entrada (zod)
│   │   ├── ports/                    # EventRepository, RegistrationRepository, ConfirmationChannel
│   │   └── use-cases/                # GetEventUseCase, RegisterAttendeeUseCase
│   ├── infrastructure/               # Implementações concretas das portas
│   │   ├── channels/                 # WhatsAppConfirmationChannel
│   │   ├── config/env.ts             # Variáveis de ambiente validadas
│   │   ├── data/tarde-numa.ts        # Conteúdo do evento
│   │   └── repositories/             # StaticEventRepository, LogRegistrationRepository
│   └── container.ts                  # Composition root (injeção de dependências)
└── lib/
    ├── format.ts                     # Formatação pt-BR (moeda, datas)
    └── utils.ts                      # cn()
```

## Regra de dependência

`app/components → core/application → core/domain`. A infraestrutura implementa as portas
da aplicação e só é conhecida pelo `core/container.ts`.

Para evoluir sem tocar na UI nem nos casos de uso:

- **Conteúdo via CMS/API**: crie um `CmsEventRepository implements EventRepository` e troque no container.
- **Persistir inscrições**: crie um `PrismaRegistrationRepository` (ou similar) no lugar do `LogRegistrationRepository`.
- **Pagamento online**: troque o `WhatsAppConfirmationChannel` por um checkout (ex.: link do Mercado Pago).
- **Novos eventos**: adicione dados e uma rota `app/eventos/[slug]/page.tsx` usando `GetEventUseCase`.
