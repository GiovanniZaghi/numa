import { LoginForm } from "@/components/auth/login-form";
import { Logo } from "@/components/landing/logo";
import { isAdmin } from "@/lib/session";
import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Entrar no painel",
  robots: { index: false, follow: false },
};

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ next?: string }> }) {
  const { next } = await searchParams;
  if (await isAdmin().catch(() => false)) redirect("/dashboard");

  return (
    <main className="relative isolate grid min-h-dvh place-items-center bg-magenta px-5 py-16">
      <div aria-hidden className="absolute inset-0 -z-10 bg-dots" />
      <div className="w-full max-w-sm">
        <div className="mb-8 flex justify-center text-white">
          <Logo priority className="h-16" />
        </div>
        <div className="rounded-[2rem] bg-cream p-8 shadow-2xl shadow-magenta-ink/30">
          <h1 className="text-2xl font-semibold">Painel de inscrições</h1>
          <p className="mt-2 mb-8 text-sm text-muted">Acesso restrito à organização.</p>
          <LoginForm next={next} />
        </div>
      </div>
    </main>
  );
}
