import { supabaseClient as supabase } from "@/lib/supabase-client";
import { eCargo, type Cargo } from "@/lib/cargos";
import { falha, sucesso, type Resultado } from "@/lib/resultado";

export interface Perfil {
  id: string;
  nome: string;
  email: string;
  cargo: Cargo;
}

export interface DadosDeCadastro {
  nome: string;
  email: string;
  senha: string;
}

// O Supabase devolve os erros de login em inglês. As mensagens que o usuário
// vê ficam aqui, em português.
const MENSAGENS_DE_LOGIN: Record<string, string> = {
  "Invalid login credentials": "E-mail ou senha incorretos.",
  "Email not confirmed": "Confirme seu e-mail antes de entrar.",
  "User already registered": "Este e-mail já está cadastrado.",
};

function traduzirErroDeLogin(mensagem: string, padrao: string): string {
  return MENSAGENS_DE_LOGIN[mensagem] ?? padrao;
}

export async function entrar(email: string, senha: string): Promise<Resultado<null>> {
  const { error } = await supabase.auth.signInWithPassword({ email, password: senha });
  if (error) {
    return falha(traduzirErroDeLogin(error.message, "Não foi possível entrar. Tente novamente."));
  }
  return sucesso(null);
}

// O perfil (cargo "pendente") é criado pelo próprio banco no cadastro, usando
// o nome enviado em options.data.
export async function cadastrar(dados: DadosDeCadastro): Promise<Resultado<null>> {
  const nome = dados.nome.trim();
  if (nome === "") {
    return falha("Informe seu nome completo.");
  }

  const { error } = await supabase.auth.signUp({
    email: dados.email,
    password: dados.senha,
    options: { data: { nome } },
  });
  if (error) {
    return falha(traduzirErroDeLogin(error.message, "Não foi possível criar a conta. Tente novamente."));
  }
  return sucesso(null);
}

export async function sair(): Promise<Resultado<null>> {
  const { error } = await supabase.auth.signOut();
  if (error) {
    return falha("Não foi possível sair. Tente novamente.");
  }
  return sucesso(null);
}

// Perfil do usuário da sessão. Devolve `dados: null` quando não há sessão.
export async function buscarPerfilAtual(): Promise<Resultado<Perfil | null>> {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return sucesso(null);
  }

  const { data, error } = await supabase
    .from("perfis")
    .select("id, nome, email, cargo")
    .eq("id", user.id)
    .maybeSingle();

  if (error) {
    console.error("[sessao] Falha ao buscar o perfil:", error.message);
    return falha("Não foi possível carregar seu perfil.");
  }
  if (!data || !eCargo(data.cargo)) {
    return falha("Seu perfil não foi encontrado. Fale com o administrador.");
  }

  return sucesso({ id: data.id, nome: data.nome, email: data.email, cargo: data.cargo });
}
