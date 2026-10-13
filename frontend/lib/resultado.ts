// Formato de retorno de todas as funções de lib/ que falam com o Supabase.
// A tela confere `ok` antes de usar `dados`; em caso de falha, mostra `erro`
// ao usuário. Uma operação só é sucesso depois de o banco confirmar.
export type Resultado<T> =
  | { ok: true; dados: T }
  | { ok: false; erro: string };

export function sucesso<T>(dados: T): Resultado<T> {
  return { ok: true, dados };
}

export function falha<T = never>(erro: string): Resultado<T> {
  return { ok: false, erro };
}
