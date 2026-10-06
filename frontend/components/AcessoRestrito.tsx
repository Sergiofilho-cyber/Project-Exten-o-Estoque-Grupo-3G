"use client";

import { useRouter } from "next/navigation";
import { supabaseClient as supabase } from "@/lib/supabase-client";
import { XCircle, LogOut } from "lucide-react";

interface AcessoRestritoProps {
  cargoAtual: string | null;
}

// Tela padrão de bloqueio para qualquer página do estoque quando o cargo do
// usuário não é admin/estoque. Usada em conjunto com useCargoGate().
export function AcessoRestrito({ cargoAtual }: AcessoRestritoProps) {
  const router = useRouter();

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/login");
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center max-w-md">
        <XCircle className="text-red-500 mx-auto mb-3" size={48} />
        <h1 className="font-bold text-gray-800 text-lg">Acesso Restrito</h1>
        <p className="text-gray-600 text-sm mt-2">
          Seu perfil atual (<strong>{cargoAtual}</strong>) não possui autorização para acessar informações do
          estoque.
        </p>
        <p className="text-gray-400 text-xs mt-2">
          Apenas usuários com perfil <strong>estoque</strong> ou <strong>admin</strong> podem visualizar este
          conteúdo.
        </p>
        <div className="mt-6">
          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-indigo-600 text-white rounded-xl font-semibold text-sm hover:bg-indigo-700 transition"
          >
            <LogOut size={16} /> Sair da Conta
          </button>
        </div>
      </div>
    </div>
  );
}
