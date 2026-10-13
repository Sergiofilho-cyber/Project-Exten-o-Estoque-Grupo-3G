"use server";

import { eCargo } from "./cargos";
import { falha, sucesso, type Resultado } from "./resultado";
import { banco } from "./servidor/banco";
import { criarClienteDeSessao } from "./servidor/supabase";
import type { DadosDeCadastro, Perfil } from "./tipos";

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
  const supabase = await criarClienteDeSessao();
  const { error } = await supabase.auth.signInWithPassword({ email, password: senha });
  if (error) {
    return falha(traduzirErroDeLogin(error.message, "Não foi possível entrar. Tente novamente."));
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
    return falha(traduzirErroDeLogin(error.message, "Não foi possível criar a conta. Tente novamente."));
  }
  if (!data.user) {
    return falha("Não foi possível criar a conta. Tente novamente.");
  }

  try {
    await banco()`
      insert into perfis (id, nome, email, cargo)
      values (${data.user.id}, ${nome}, ${dados.email}, 'pendente')
      on conflict (id) do nothing
    `;
  } catch (erro) {
    console.error("[sessao] Falha ao criar o perfil:", erro);
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

  try {
    const linhas = await banco()<{ id: string; nome: string; email: string; cargo: string }[]>`
      select id, nome, email, cargo from perfis where id = ${user.id}
    `;
    const perfil = linhas[0];
    if (!perfil || !eCargo(perfil.cargo)) {
      return falha("Seu perfil não foi encontrado. Fale com o administrador.");
    }
    return sucesso({ id: perfil.id, nome: perfil.nome, email: perfil.email, cargo: perfil.cargo });
  } catch (erro) {
    console.error("[sessao] Falha ao buscar o perfil:", erro);
    return falha("Não foi possível carregar seu perfil.");
  }
}
