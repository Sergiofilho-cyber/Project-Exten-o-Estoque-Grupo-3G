"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { podeConsultar } from "@estoque/backend/cargos";
import { buscarPerfilAtual, sair } from "@estoque/backend/sessao";
import type { Perfil } from "@estoque/backend/tipos";

// Página inicial provisória, sem acabamento visual. O painel com totais é a
// tarefa T6.5 (docs/03-specifications/etapa-6-consulta.md).
export default function InicioPage() {
  const router = useRouter();
  const [perfil, setPerfil] = useState<Perfil | null>(null);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    let cancelado = false;

    async function carregar() {
      const resultado = await buscarPerfilAtual();
      if (cancelado) return;

      if (!resultado.ok) {
        setErro(resultado.erro);
        return;
      }
      if (!resultado.dados) {
        router.replace("/login");
        return;
      }
      if (!podeConsultar(resultado.dados.cargo)) {
        router.replace("/pendente");
        return;
      }
      setPerfil(resultado.dados);
    }

    carregar();
    return () => {
      cancelado = true;
    };
  }, [router]);

  async function handleSair() {
    const resultado = await sair();
    if (!resultado.ok) {
      setErro(resultado.erro);
      return;
    }
    router.replace("/login");
  }

  return (
    <main className="mx-auto max-w-md p-4">
      <h1 className="text-xl font-bold">Estoque 3G</h1>

      {erro && <p role="alert" className="mt-4 text-red-700">{erro}</p>}

      {perfil ? (
        <>
          <p className="mt-4">
            {perfil.nome} ({perfil.cargo})
          </p>
          <p className="mt-2">As telas do sistema serão adicionadas a cada etapa do roteiro.</p>
        </>
      ) : (
        !erro && <p className="mt-4">Carregando...</p>
      )}

      <button type="button" onClick={handleSair} className="mt-6 border px-4 py-3">
        Sair
      </button>
    </main>
  );
}
