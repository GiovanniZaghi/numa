import { logoutAction } from "@/app/actions/auth";
import { Logo } from "@/components/landing/logo";
import { requireAdmin } from "@/lib/session";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Painel de inscrições",
  robots: { index: false, follow: false },
};

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  await requireAdmin();

  return (
    <div className="min-h-dvh bg-cream">
      <header className="bg-magenta-ink text-white">
        <div className="mx-auto flex h-18 max-w-6xl items-center justify-between gap-4 px-5 md:px-8">
          <div className="flex items-center gap-4">
            <Logo className="h-11" />
            <span className="hidden h-8 w-px bg-white/20 sm:block" />
            <span className="hidden text-sm font-medium text-white/80 sm:block">Painel de inscrições</span>
          </div>
          <form action={logoutAction}>
            <button
              type="submit"
              className="rounded-full border border-white/25 px-4 py-2 text-sm font-medium transition hover:bg-white/10"
            >
              Sair
            </button>
          </form>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-5 py-10 md:px-8">{children}</main>
    </div>
  );
}
