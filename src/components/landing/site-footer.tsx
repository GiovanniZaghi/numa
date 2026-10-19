import { Container } from "@/components/ui/container";
import { InstagramIcon } from "@/components/ui/icons";
import { Logo } from "./logo";
import { InstagramLink } from "./instagram-link";
import { instagram, navigation } from "./navigation";

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden bg-ink pt-20 pb-28 text-white md:pb-10">
      <Container>
        <div className="flex flex-col gap-12 md:flex-row md:items-start md:justify-between">
          <div className="max-w-xs">
            <Logo className="h-16" />
            <p className="mt-4 text-sm leading-relaxed text-white/60">
              Bem-estar, lifestyle e conexões reais no Alto Tietê.
            </p>
            <InstagramLink
              username={instagram.username}
              className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-sm font-medium transition hover:border-petal hover:text-petal"
            >
              <InstagramIcon className="size-4" />
              {instagram.handle}
            </InstagramLink>
          </div>

          <nav aria-label="Rodapé">
            <ul className="grid grid-cols-2 gap-x-12 gap-y-3 text-sm text-white/70">
              {navigation.map((item) => (
                <li key={item.href}>
                  <a href={item.href} className="transition hover:text-white">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <p
          aria-hidden
          className="mt-16 text-[clamp(5rem,22vw,16rem)] leading-[0.8] font-semibold tracking-tight text-white/[0.06] select-none"
        >
          numa club
        </p>

        <div className="mt-8 border-t border-white/10 pt-6 text-xs text-white/40">
          © {new Date().getFullYear()} Numa Club. Todos os direitos reservados.
        </div>
      </Container>
    </footer>
  );
}
