// Isomórfico (sem next/headers) para poder ser importado tanto pelo client
// do navegador (lib/supabase-client.ts) quanto pelo servidor
// (lib/supabase.ts, proxy.ts) com o MESMO nome de cookie. Se os dois
// lados usarem nomes diferentes, o servidor nunca acha a sessão que o
// navegador gravou.
//
// domain: NÃO hardcodear. Um Domain incompatível com o host atual faz o
// navegador descartar o cookie inteiro (silenciosamente, sem erro no console
// óbvio) — foi exatamente o que quebrou o login na VPS quando o domínio
// estava fixado em ".grupo3g.com.br" e o site real é
// "estoque.grupo3giluminacao.com.br". Por padrão (sem a env var), o cookie
// vale só para o host atual, o que funciona em qualquer domínio sem precisar
// configurar nada. Só defina NEXT_PUBLIC_AUTH_COOKIE_DOMAIN se precisar
// compartilhar a sessão entre subdomínios (ex.: SSO com outro app no mesmo
// domínio raiz).
export const AUTH_COOKIE_OPTIONS = {
  name: "sb-grupo3g-auth",
  domain: process.env.NEXT_PUBLIC_AUTH_COOKIE_DOMAIN || undefined,
  path: "/",
  sameSite: "lax" as const,
  secure: process.env.NODE_ENV === "production",
};
