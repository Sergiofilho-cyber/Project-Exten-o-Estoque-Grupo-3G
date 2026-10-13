import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Estoque 3G",
  description: "Sistema de catalogação e endereçamento de estoque",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

// Estrutura mínima. Identidade visual, tipografia e navegação são da frente
// de front-end (docs/04-architecture/decisions.md, ADR-13).
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
