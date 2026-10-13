import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

// Cliente do Supabase para código que roda no servidor (rotas em app/api/ e
// componentes de servidor). Usa a sessão do cookie, então o banco aplica as
// permissões do usuário logado.
export async function createSupabaseServer() {
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
            // Componentes de servidor não podem gravar cookies. O proxy.ts já
            // renova o cookie da sessão a cada requisição.
          }
        },
      },
    },
  );
}
