import "server-only";
import postgres from "postgres";

type Conexao = ReturnType<typeof postgres>;

// Em desenvolvimento o Next recarrega os módulos a cada alteração. Guardar a
// conexão no objeto global evita abrir uma nova a cada recarga.
const global = globalThis as typeof globalThis & { conexaoDoBanco?: Conexao };

// Conexão direta do servidor com o banco. É o único caminho até os dados.
export function banco(): Conexao {
  if (!global.conexaoDoBanco) {
    const url = process.env.DATABASE_URL;
    if (!url) {
      throw new Error("DATABASE_URL não está definida. Veja frontend/.env.example.");
    }
    // prepare: false é exigido pelo pooler do Supabase.
    global.conexaoDoBanco = postgres(url, { prepare: false });
  }
  return global.conexaoDoBanco;
}
