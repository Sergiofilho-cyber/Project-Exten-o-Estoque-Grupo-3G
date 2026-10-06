"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabaseClient as supabase } from "@/lib/supabase-client";

interface CargoGate {
  carregando: boolean;
  permitido: boolean;
  negado: boolean;
  usuarioId: string | null;
  cargoAtual: string | null;
}

// Gate de acesso por cargo. Redireciona para /login se não houver sessão ativa
// e marca negado = true se o perfil do usuário não estiver na lista permitida.
export function useCargoGate(cargosPermitidos: string[]): CargoGate {
  const router = useRouter();
  const [carregando, setCarregando] = useState(true);
  const [permitido, setPermitido] = useState(false);
  const [negado, setNegado] = useState(false);
  const [usuarioId, setUsuarioId] = useState<string | null>(null);
  const [cargoAtual, setCargoAtual] = useState<string | null>(null);

  useEffect(() => {
    let cancelado = false;

    async function verificar() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.push("/login");
        return;
      }

      const { data: perfil } = await supabase
        .from("perfis")
        .select("cargo")
        .eq("id", user.id)
        .single();

      if (cancelado) return;

      const cargo = perfil?.cargo || "sem_cargo";
      setCargoAtual(cargo);
      setUsuarioId(user.id);

      if (!cargosPermitidos.includes(cargo)) {
        setPermitido(false);
        setNegado(true);
        setCarregando(false);
        return;
      }

      setPermitido(true);
      setNegado(false);
      setCarregando(false);
    }

    verificar();
    return () => {
      cancelado = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { carregando, permitido, negado, usuarioId, cargoAtual };
}
