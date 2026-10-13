"use client";

import { useState } from "react";
import { cadastrar, entrar } from "@estoque/backend/sessao";

type Modo = "entrar" | "cadastrar";

const CAMPO = "mt-1 block w-full border px-3 py-3";

// Tela de login provisória, sem acabamento visual. A versão final é a tarefa
// T2.1 (docs/03-specifications/etapa-2-acesso.md).
export default function LoginPage() {
  const [modo, setModo] = useState<Modo>("entrar");
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [isEnviando, setIsEnviando] = useState(false);
  const [erro, setErro] = useState<string | null>(null);
  const [aviso, setAviso] = useState<string | null>(null);

  function trocarModo(novoModo: Modo) {
    setModo(novoModo);
    setErro(null);
    setAviso(null);
  }

  async function handleEntrar() {
    const resultado = await entrar(email, senha);
    if (!resultado.ok) {
      setErro(resultado.erro);
      return;
    }
    // Recarrega a página inteira para o proxy.ts ler o cookie novo da sessão.
    window.location.href = "/";
  }

  async function handleCadastrar() {
    const resultado = await cadastrar({ nome, email, senha });
    if (!resultado.ok) {
      setErro(resultado.erro);
      return;
    }
    setAviso("Conta criada. Aguarde a liberação do administrador para acessar o sistema.");
    setSenha("");
    setModo("entrar");
  }

  async function handleSubmit(evento: React.FormEvent<HTMLFormElement>) {
    evento.preventDefault();
    setIsEnviando(true);
    setErro(null);
    setAviso(null);

    if (modo === "entrar") {
      await handleEntrar();
    } else {
      await handleCadastrar();
    }
    setIsEnviando(false);
  }

  const titulo = modo === "entrar" ? "Entrar" : "Criar conta";

  return (
    <main className="mx-auto max-w-md p-4">
      <h1 className="text-xl font-bold">Estoque 3G</h1>
      <h2 className="mt-4 text-lg">{titulo}</h2>

      <form onSubmit={handleSubmit} className="mt-4 space-y-4">
        {modo === "cadastrar" && (
          <label className="block">
            Nome completo
            <input
              type="text"
              required
              autoComplete="name"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              className={CAMPO}
            />
          </label>
        )}

        <label className="block">
          E-mail
          <input
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={CAMPO}
          />
        </label>

        <label className="block">
          Senha
          <input
            type="password"
            required
            minLength={6}
            autoComplete={modo === "entrar" ? "current-password" : "new-password"}
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            className={CAMPO}
          />
        </label>

        {erro && <p role="alert" className="text-red-700">{erro}</p>}
        {aviso && <p role="status" className="text-green-700">{aviso}</p>}

        <button type="submit" disabled={isEnviando} className="w-full border px-4 py-3 font-bold">
          {isEnviando ? "Aguarde..." : titulo}
        </button>
      </form>

      <button
        type="button"
        onClick={() => trocarModo(modo === "entrar" ? "cadastrar" : "entrar")}
        className="mt-4 py-3 underline"
      >
        {modo === "entrar" ? "Não tenho conta: criar uma" : "Já tenho conta: entrar"}
      </button>
    </main>
  );
}
