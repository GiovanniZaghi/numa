import type { Metadata, Viewport } from "next";
import { Allura, Montserrat } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-montserrat",
  display: "swap",
});

// Substituta da Gistesy enquanto o arquivo da fonte não é adicionado ao projeto.
const scriptFallback = Allura({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-script-fallback",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: { default: "Numa Club", template: "%s | Numa Club" },
  description: "Bem-estar, lifestyle e conexões reais para mulheres no Alto Tietê.",
};

export const viewport: Viewport = {
  themeColor: "#c71585",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${montserrat.variable} ${scriptFallback.variable}`}>
      <body>
        {children}
        <Toaster position="top-center" richColors closeButton />
      </body>
    </html>
  );
}
