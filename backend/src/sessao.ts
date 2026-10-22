"use server";

import { eCargo } from "./cargos";
import { falha, sucesso, type Resultado } from "./resultado";
import { banco } from "./servidor/banco";
import { criarClienteDeSessao } from "./servidor/supabase";
import type { DadosDeCadastro, Perfil } from "./tipos";

// O Supabase devolve os erros em inglês. As mensagens que o usuário vê ficam
// aqui, em português, escolhidas pelo código do erro.
const MENSAGENS_POR_CODIGO: Record<string, string> = {
  invalid_credentials: "E-mail ou senha incorretos.",
  email_not_confirmed: "Confirme seu e-mail antes de entrar.",
  user_already_exists: "Este e-mail já está cadastrado.",
  email_address_invalid: "Este e-mail não é aceito. Use um e-mail real.",
  weak_password: "A senha é fraca demais. Use ao menos 6 caracteres, com letras e números.",
  over_email_send_rate_limit: "Muitos e-mails enviados em pouco tempo. Aguarde alguns minutos e tente de novo.",
  over_request_rate_limit: "Muitas tentativas em pouco tempo. Aguarde alguns minutos e tente de novo.",
  signup_disabled: "O cadastro está desativado. Fale com o administrador.",
};

function traduzirErro(erro: { code?: string; message: string }, padrao: string): string {
  console.error("[sessao] Erro do Supabase:", erro.code ?? "sem código", erro.message);
  return (erro.code && MENSAGENS_POR_CODIGO[erro.code]) || padrao;
}

export async function entrar(email: string, senha: string): Promise<Resultado<null>> {
  const supabase = await criarClienteDeSessao();
  const { error } = await supabase.auth.signInWithPassword({ email, password: senha });
  if (error) {
    return falha(traduzirErro(error, "Não foi possível entrar. Tente novamente."));
  }
  return sucesso(null);
}

// Cria o usuário no login do Supabase e, em seguida, o perfil com cargo
// "pendente". O perfil só é criado pelo backend: o banco não tem gatilho.
export async function cadastrar(dados: DadosDeCadastro): Promise<Resultado<null>> {
  const nome = dados.nome.trim();
  if (nome === "") {
    return falha("Informe seu nome completo.");
  }

  const supabase = await criarClienteDeSessao();
  const { data, error } = await supabase.auth.signUp({
    email: dados.email,
    password: dados.senha,
    options: { data: { nome } },
  });
  if (error) {
    return falha(traduzirErro(error, "Não foi possível criar a conta. Tente novamente."));
  }
  if (!data.user) {
    return falha("Não foi possível criar a conta. Tente novamente.");
  }

  const { error: erroPerfil } = await banco()
    .from("perfis")
    .upsert(
      { id: data.user.id, nome, email: dados.email, cargo: "pendente" },
      { onConflict: "id", ignoreDuplicates: true },
    );
  if (erroPerfil) {
    console.error("[sessao] Falha ao criar o perfil:", erroPerfil.message);
    return falha("A conta foi criada, mas o perfil não. Fale com o administrador.");
  }
  return sucesso(null);
}

export async function sair(): Promise<Resultado<null>> {
  const supabase = await criarClienteDeSessao();
  const { error } = await supabase.auth.signOut();
  if (error) {
    return falha("Não foi possível sair. Tente novamente.");
  }
  return sucesso(null);
}

// Perfil do usuário da sessão. Devolve `dados: null` quando não há sessão.
// O usuário vem do cookie validado pelo Supabase, nunca de um dado da tela.
export async function buscarPerfilAtual(): Promise<Resultado<Perfil | null>> {
  const supabase = await criarClienteDeSessao();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return sucesso(null);
  }

  const { data: perfil, error } = await banco()
    .from("perfis")
    .select("id, nome, email, cargo")
    .eq("id", user.id)
    .maybeSingle();
  if (error) {
    console.error("[sessao] Falha ao buscar o perfil:", error.message);
    return falha("Não foi possível carregar seu perfil.");
  }
  if (!perfil || !eCargo(perfil.cargo)) {
    return falha("Seu perfil não foi encontrado. Fale com o administrador.");
  }
  return sucesso({ id: perfil.id, nome: perfil.nome, email: perfil.email, cargo: perfil.cargo });
}
