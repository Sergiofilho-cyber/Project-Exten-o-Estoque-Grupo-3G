import "server-only";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

// Em desenvolvimento o Next recarrega os módulos a cada alteração. Guardar o
// cliente no objeto global evita criar um novo a cada recarga.
const global = globalThis as typeof globalThis & { clienteDoBanco?: SupabaseClient };

// Cliente do Supabase com a chave secreta. Ela ignora a segurança por linha e
// dá acesso total aos dados, por isso só existe no servidor. É o único caminho
// do sistema até as tabelas (ADR-16).
export function banco(): SupabaseClient {
  if (!global.clienteDoBanco) {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const chave = process.env.SUPABASE_SECRET_KEY;
    if (!url || !chave) {
      throw new Error(
        "NEXT_PUBLIC_SUPABASE_URL e SUPABASE_SECRET_KEY precisam estar definidas. Veja frontend/.env.example.",
      );
    }
    global.clienteDoBanco = createClient(url, chave, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
  }
  return global.clienteDoBanco;
}
