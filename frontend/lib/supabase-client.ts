import { createBrowserClient } from "@supabase/ssr";

// Cliente do Supabase para o navegador. As telas não usam este cliente
// diretamente: chamam as funções de lib/ (por exemplo, lib/sessao.ts).
export const supabaseClient = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
);
