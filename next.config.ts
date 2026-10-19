import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // No `next dev`, o Next 16 bloqueia recursos de desenvolvimento acessados por outros domínios.
  // Libera os túneis do ngrok para testar pelo celular.
  allowedDevOrigins: ["*.ngrok-free.dev", "*.ngrok-free.app", "*.ngrok.app", "*.ngrok.dev"],
  images: {
    // Next 16 só aceita qualidades listadas aqui; 90 é usado nas fotos de fundo.
    qualities: [75, 90],
  },
};

export default nextConfig;
