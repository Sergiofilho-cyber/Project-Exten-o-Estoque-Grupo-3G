import type { NextConfig } from "next";

// Não expomos Access-Control-Allow-Origin: a API é consumida apenas pelo
// próprio front-end (same-origin). Se um consumidor externo aparecer no
// futuro, adicionar uma allowlist explícita de origem aqui — nunca "*".
const nextConfig: NextConfig = {
  // O backend fica em ../backend e é compilado junto com o aplicativo.
  transpilePackages: ["@estoque/backend"],
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=31536000; includeSubDomains",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
