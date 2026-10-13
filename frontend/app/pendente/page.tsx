"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { podeConsultar } from "@estoque/backend/cargos";
import type { Resultado } from "@estoque/backend/resultado";
import { buscarPerfilAtual, sair } from "@estoque/backend/sessao";
import type { Perfil } from "@estoque/backend/tipos";

// Tela "aguardando liberação" provisória, sem acabamento visual. A versão
// final é a tarefa T2.2 (docs/03-specifications/etapa-2-acesso.md).
export default function PendentePage() {
  const router = useRouter();
  const [perfil, setPerfil] = useState<Perfil | null>(null);
  const [erro, setErro] = useState<string | null>(null);
  const [isVerificando, setIsVerificando] = useState(true);

  const aplicarResultado = useCallback(
    (resultado: Resultado<Perfil | null>) => {
      setIsVerificando(false);

      if (!resultado.ok) {
        setErro(resultado.erro);
        return;
      }
      if (!resultado.dados) {
        router.replace("/login");
        return;
      }
      if (podeConsultar(resultado.dados.cargo)) {
        router.replace("/");
        return;
      }
      setPerfil(resultado.dados);
    },
    [router],
  );

  useEffect(() => {
    let cancelado = false;

    buscarPerfilAtual().then((resultado) => {
      if (!cancelado) aplicarResultado(resultado);
    });

    return () => {
      cancelado = true;
    };
  }, [aplicarResultado]);

  async function handleVerificar() {
    setIsVerificando(true);
    setErro(null);
    aplicarResultado(await buscarPerfilAtual());
  }

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
      <h1 className="text-xl font-bold">Aguardando liberação</h1>

      {perfil && (
        <p className="mt-4">
          {perfil.nome}, sua conta ({perfil.email}) foi criada, mas ainda não foi liberada. Peça ao
          administrador para definir o seu perfil.
        </p>
      )}

      {erro && <p role="alert" className="mt-4 text-red-700">{erro}</p>}

      <div className="mt-6 flex flex-col gap-3">
        <button
          type="button"
          onClick={handleVerificar}
          disabled={isVerificando}
          className="border px-4 py-3 font-bold"
        >
          {isVerificando ? "Verificando..." : "Verificar de novo"}
        </button>
        <button type="button" onClick={handleSair} className="border px-4 py-3">
          Sair
        </button>
      </div>
    </main>
  );
}
