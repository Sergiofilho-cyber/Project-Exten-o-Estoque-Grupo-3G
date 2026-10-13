import "server-only";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

// Cliente do Supabase usado só para o login. A sessão fica em cookie.
// Os dados do sistema não passam por aqui: vão pela conexão de banco.ts.
export async function criarClienteDeSessao() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options),
            );
          } catch {
            // Componentes de servidor não podem gravar cookies. A proteção de
            // rotas já renova o cookie da sessão a cada requisição.
          }
        },
      },
    },
  );
}
